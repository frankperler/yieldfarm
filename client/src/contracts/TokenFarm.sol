//"SPDX-License-Identifier: UNLICENSED"
pragma solidity ^0.8.6;

import "./DaiToken.sol";
import "./TegToken.sol";

contract TokenFarm {
    string public name = "Tegridy Token Farm";

    address public owner;
    TegToken public tegToken;
    DaiToken public daiToken;

    address[] public stakers;
    mapping(address => uint256) public stakingBalance;
    mapping(address => uint256) public earnedBalance;
    mapping(address => bool) public isStaking;
    // mapping(address => bool) public hasStaked;
    mapping(address => uint256) public earnedTime;

    mapping(address => uint256) public borrowedBalance;
    mapping(address => uint256) public lossBalance;
    mapping(address => bool) public isBorrowing;
    mapping(address => uint256) public borrowedTime;

    event Stake(address indexed from, uint256 amount, uint256 stakingBal, uint256 intBal, uint256 tegBal, uint256 daiBal);
    event Unstake(address indexed from, uint256 amount, uint256 stakingBal, uint256 intBal, uint256 tegBal, uint256 daiBal);
    event YieldEarnedWithdraw(address indexed to, uint256 amount, uint256 stakingBal, uint256 intBal, uint256 tegBal, uint256 daiBal);

    event Borrow(address indexed from, uint256 amount, uint256 borrowBal, uint256 lossBal, uint256 tegBal, uint256 daiBal);
    event Repay(address indexed from, uint256 amount, uint256 borrowBal, uint256 lossBal, uint256 tegBal, uint256 daiBal);
    event YieldLossWithdraw(address indexed to, uint256 amount, uint256 borrowBal, uint256 lossBal, uint256 tegBal, uint256 daiBal);

    constructor(TegToken _tegToken, DaiToken _daiToken) {
        tegToken = _tegToken;
        daiToken = _daiToken;
        owner = msg.sender;
    }

    //1. Stake Tokens (deposit)
    function stakeTokens(uint256 _amount) public returns (uint256 balance) {
        //Amount staked cannot be smaller than 0
        require(
            _amount > 0 && daiToken.balanceOf(msg.sender) >= _amount,
            "You cannot stake zero tokens"
        );

        if (isStaking[msg.sender] == true) {
            uint256 toTransfer = calculateEarningYield(msg.sender);
            earnedBalance[msg.sender] += toTransfer;
        }
        // Transfer Mock Dai to this contract for staking
        daiToken.transferFrom(msg.sender, address(this), _amount);
        //update start time
        earnedTime[msg.sender] = block.timestamp;
        //update staking balance
        stakingBalance[msg.sender] += _amount;
        // add user to stakers array "only" if they have not yet staked
        // if (!hasStaked[msg.sender]) {
        //     stakers.push(msg.sender);
        // }
        //update staking status
        isStaking[msg.sender] = true;
        // hasStaked[msg.sender] = true;
        emit Stake(msg.sender, _amount, stakingBalance[msg.sender], earnedBalance[msg.sender], tegToken.balanceOf(msg.sender), daiToken.balanceOf(msg.sender));
        return stakingBalance[msg.sender];
    }

    //2. Unstaking Tokens (withdraw)
    function unstakeTokens(uint256 _amount) public returns (uint256 balance) {
        //require amounnt > 0
        require(
            stakingBalance[msg.sender] >= _amount &&
            isStaking[msg.sender] == true,
            "Staking balance must be larger than amount"
        );

        //fetch staking balance
        // uint256 balance = stakingBalance[msg.sender];

        uint256 yieldTransfer = calculateEarningYield(msg.sender);
        earnedTime[msg.sender] = block.timestamp;
        uint256 balanceTransfer = _amount;
        _amount = 0;
        //decrease staking balance by amount
        stakingBalance[msg.sender] -= balanceTransfer;
        //unstake dai tokens from farm to investor
        daiToken.transfer(msg.sender, balanceTransfer);

        earnedBalance[msg.sender] += yieldTransfer;
        // is he still staking?
        //update staking status
        if(stakingBalance[msg.sender] == 0){
            isStaking[msg.sender] = false;
        }
        emit Unstake(msg.sender, _amount, stakingBalance[msg.sender], earnedBalance[msg.sender], tegToken.balanceOf(msg.sender), daiToken.balanceOf(msg.sender));
        return stakingBalance[msg.sender];
    }

     //3. withdraw earned yield
    function withdrawEarningYield() public {
        uint256 toTransfer = calculateEarningYield(msg.sender);

        require(
            toTransfer > 0 ||
            earnedBalance[msg.sender] > 0,
            "Nothing to withdraw"
        );
            
        if(earnedBalance[msg.sender] != 0){
            uint256 oldBalance = earnedBalance[msg.sender];
            earnedBalance[msg.sender] = 0;
            toTransfer += oldBalance;
        }

        earnedTime[msg.sender] = block.timestamp;
        tegToken.transfer(msg.sender, toTransfer);
        emit YieldEarnedWithdraw(msg.sender, toTransfer, stakingBalance[msg.sender], earnedBalance[msg.sender], tegToken.balanceOf(msg.sender), daiToken.balanceOf(msg.sender));
    }

    function calculateEarningTime(address user) public view returns(uint256){
        uint256 end = block.timestamp;
        uint256 totalTime = end - earnedTime[user];
        return totalTime;
    }

    function calculateEarningYield(address user) public view returns(uint256) {
        uint256 time = calculateEarningTime(user) * 10**18;
        uint256 rate = 31536000; // 100%
        uint256 timeRate = time / rate;
        uint256 rawYield = (stakingBalance[user] * timeRate) / 10**18;
        return rawYield;
    }

    //4. Borrow Tokens
    function borrowTokens(uint256 _amount) public returns (uint256 balance) {
        //Amount staked cannot be smaller than 0,
        //Borrower should be staking
        //His staking balance should always be larger than borrowed amount (overcollateralized)
        //Balance of TEG tokens should not be 0 or lower
        require(
            _amount > 0 &&
            isStaking[msg.sender] == true &&
            stakingBalance[msg.sender] >= _amount &&
            tegToken.balanceOf(msg.sender) >= 0,
            "You cannot borrow zero tokens"
        );

        uint256 toTransfer = calculateLossYield(msg.sender);
        lossBalance[msg.sender] -= toTransfer;
        // Transfer Mock Dai to borrower
        daiToken.transferFrom(address(this), msg.sender, _amount);
        //update start time
        borrowedTime[msg.sender] = block.timestamp;
        //update borrowed balance
        borrowedBalance[msg.sender] += _amount;
        //update borrowing status
        isBorrowing[msg.sender] = true;
        emit Borrow(msg.sender, _amount, borrowedBalance[msg.sender], lossBalance[msg.sender], tegToken.balanceOf(msg.sender), daiToken.balanceOf(msg.sender));
        return borrowedBalance[msg.sender];
    }

    //5. Repay Tokens
    function repayTokens(uint256 _amount) public returns (uint256 balance) {
        //require amount > 0
        require(
            borrowedBalance[msg.sender] >= _amount &&
            isBorrowing[msg.sender] == true,
            "Borrowed balance must be larger than amount"
        );

        uint256 yieldTransfer = calculateLossYield(msg.sender);
        borrowedTime[msg.sender] = block.timestamp;
        uint256 balanceTransfer = _amount;
        _amount = 0;
        //decrease staking balance by amount
        borrowedBalance[msg.sender] -= balanceTransfer;
        //unstake dai tokens from farm to investor
        daiToken.transfer(address(this), balanceTransfer);

        lossBalance[msg.sender] -= yieldTransfer;
        // is he still staking?
        //update staking status
        if(borrowedBalance[msg.sender] == 0){
            isBorrowing[msg.sender] = false;
        }
        emit Repay(msg.sender, _amount, borrowedBalance[msg.sender], lossBalance[msg.sender], tegToken.balanceOf(msg.sender), daiToken.balanceOf(msg.sender));
        return borrowedBalance[msg.sender];
    }

         //3. withdraw loss yield
    function withdrawLossYield() public {
        uint256 toTransfer = calculateLossYield(msg.sender);

        require(
            toTransfer > 0 ||
            lossBalance[msg.sender] > 0,
            "Nothing to withdraw"
        );
            
        if(lossBalance[msg.sender] != 0){
            uint256 oldBalance = lossBalance[msg.sender];
            lossBalance[msg.sender] = 0;
            toTransfer += oldBalance;
        }

        borrowedTime[msg.sender] = block.timestamp;
        tegToken.transfer(msg.sender, toTransfer);
        emit YieldLossWithdraw(msg.sender, toTransfer, borrowedBalance[msg.sender], lossBalance[msg.sender], tegToken.balanceOf(msg.sender), daiToken.balanceOf(msg.sender));
    }

    function calculateBorrowTime(address user) public view returns(uint256){
        uint256 end = block.timestamp;
        uint256 totalTime = end - borrowedTime[user];
        return totalTime;
    }

    function calculateLossYield (address user) public view returns(uint256) {
        uint256 time = calculateBorrowTime(user) * 10**18;
        uint256 rate = 28669090; // 110%
        uint256 timeRate = time / rate;
        uint256 rawYield = (stakingBalance[user] * timeRate) / 10**18;
        return rawYield;
    }

    
}
