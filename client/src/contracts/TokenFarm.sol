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
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;
    mapping(address => uint256) public startTime;
    mapping(address => uint256) public tegBalance;

    event Stake(address indexed from, uint256 amount);
    event Unstake(address indexed from, uint256 amount);
    event YieldWithdraw(address indexed to, uint256 amount);

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
            uint256 toTransfer = calculateYieldTotal(msg.sender);
            tegBalance[msg.sender] += toTransfer;
        }
        // Transfer Mock Dai to this contract for staking
        daiToken.transferFrom(msg.sender, address(this), _amount);
        //update start time
        startTime[msg.sender] = block.timestamp;
        //update staking balance
        stakingBalance[msg.sender] += _amount;
        // add user to stakers array "only" if they have not yet staked
        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }
        //update staking status
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
        emit Stake(msg.sender, _amount);
        return stakingBalance[msg.sender];
    }

    //2. Unstaking Tokens (withdraw)
    function unstakeTokens(uint256 _amount) public returns (uint256 balance) {
        //require amounnt > 0
        require(
            stakingBalance[msg.sender] >= _amount &&
            isStaking[msg.sender] == true,
            "Staking balance cannot be 0 or lower"
        );

        //fetch staking balance
        // uint256 balance = stakingBalance[msg.sender];

        uint256 yieldTransfer = calculateYieldTotal(msg.sender);
        startTime[msg.sender] = block.timestamp;
        uint256 balanceTransfer = _amount;
        _amount = 0;
        //decrease staking balance by amount
        stakingBalance[msg.sender] -= balanceTransfer;
        //unstake dai tokens from farm to investor
        daiToken.transfer(msg.sender, balanceTransfer);

        tegBalance[msg.sender] += yieldTransfer;
        // is he still staking?
        //update staking status
        if(stakingBalance[msg.sender] == 0){
            isStaking[msg.sender] = false;
        }
        emit Unstake(msg.sender, _amount);
        return stakingBalance[msg.sender];
    }

    // //3. Issuing Teg Tokens to investor on a regular basis
    // function issueTokens() public {
    //     require(msg.sender == owner, "only owner can call this function");
    //     for (uint256 i = 0; i < stakers.length; i++) {
    //         address recipient = stakers[i];
    //         uint256 balance = stakingBalance[recipient];
    //         if (balance > 0) {
    //             tegToken.transfer(recipient, balance); // send exactly the same amount of tegToken than dai Token deposited
    //         }
    //     }
    // }

    function withdrawYield() public returns (uint256 balance) {
        uint256 toTransfer = calculateYieldTotal(msg.sender);

        require(
            toTransfer > 0 ||
            tegBalance[msg.sender] > 0,
            "Nothing to withdraw"
            );
            
        if(tegBalance[msg.sender] != 0){
            uint256 oldBalance = tegBalance[msg.sender];
            tegBalance[msg.sender] = 0;
            toTransfer += oldBalance;
        }

        startTime[msg.sender] = block.timestamp;
        tegToken.transfer(msg.sender, toTransfer);
        emit YieldWithdraw(msg.sender, toTransfer);
        return tegBalance[msg.sender];
    }

    function calculateYieldTime(address user) public view returns(uint256){
        uint256 end = block.timestamp;
        uint256 totalTime = end - startTime[user];
        return totalTime;
    }

    function calculateYieldTotal(address user) public view returns(uint256) {
        uint256 time = calculateYieldTime(user) * 10**18;
        uint256 rate = 86400;
        uint256 timeRate = time / rate;
        uint256 rawYield = (stakingBalance[user] * timeRate) / 10**18;
        return rawYield;
    }
}
