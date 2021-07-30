//"SPDX-License-Identifier: UNLICENSED"
pragma solidity ^0.8.6;

import "./DaiToken.sol";
import "./EthToken.sol";
import "./UsdtToken.sol";
import "./TegToken.sol";

import "./stringUtils.sol";
import "./Helpers.sol";

contract TokenFarm {
    string public name = "Tegridy Token Farm";

    address public owner;
    TegToken public tegToken;
    DaiToken public daiToken;
    EthToken public ethToken;
    UsdtToken public usdtToken;

    mapping(address => mapping(string => uint256)) public stakingBalance;
    mapping(address => mapping(string => uint256)) public lossBalance;
    mapping(address => mapping(string => uint256)) public earnedBalance;
    mapping(address => mapping(string => uint256)) public borrowedBalance;
    mapping(address => mapping(string => bool)) public isStaking;
    mapping(address => mapping(string => bool)) public isBorrowing;
    mapping(address => mapping(string => uint256)) public earnedTime;
    mapping(address => mapping(string => uint256)) public borrowedTime;

    // //eth
    // mapping(address => uint256) public ethStakingBalance;
    // mapping(address => uint256) public ethLossBalance;
    // mapping(address => uint256) public ethEarnedBalance;
    // mapping(address => uint256) public ethBorrowedBalance;
    // mapping(address => bool) public isStakingEth;
    // mapping(address => bool) public isBorrowingEth;
    // mapping(address => uint256) public earnedTimeEth;
    // mapping(address => uint256) public borrowedTimeEth;

    // //usdt
    // mapping(address => uint256) public usdtStakingBalance;
    // mapping(address => uint256) public usdtLossBalance;
    // mapping(address => uint256) public usdtEarnedBalance;
    // mapping(address => uint256) public usdtBorrowedBalance;
    // mapping(address => bool) public isStakingUsdt;
    // mapping(address => bool) public isBorrowingUsdt;
    // mapping(address => uint256) public earnedTimeUsdt;
    // mapping(address => uint256) public borrowedTimeUsdt;

    event Stake(
        address indexed from,
        uint256 amount,
        uint256 stakingBal,
        uint256 intBal,
        uint256 tegBal,
        uint256 daiBal,
        uint256 ethBal,
        uint256 usdtBal
    );
    event Unstake(
        address indexed from,
        uint256 amount,
        uint256 stakingBal,
        uint256 intBal,
        uint256 tegBal,
        uint256 daiBal,
        uint256 ethBal,
        uint256 usdtBal
    );

    event YieldWithdraw(
        address indexed to,
        uint256 amountEarned,
        uint256 amountLost,
        uint256 stakingBal,
        uint256 intBal,
        uint256 borrowBal,
        uint256 lossBal,
        uint256 tegBal,
        uint256 daiBal,
        uint256 ethBal,
        uint256 usdtBal
    );

    event Borrow(
        address indexed from,
        uint256 amount,
        uint256 borrowBal,
        uint256 lossBal,
        uint256 tegBal,
        uint256 daiBal,
        uint256 ethBal,
        uint256 usdtBal
    );

    event Repay(
        address indexed from,
        uint256 amount,
        uint256 borrowBal,
        uint256 lossBal,
        uint256 tegBal,
        uint256 daiBal,
        uint256 ethBal,
        uint256 usdtBal
    );

    constructor(
        TegToken _tegToken,
        DaiToken _daiToken,
        EthToken _ethToken,
        UsdtToken _usdtToken
    ) {
        tegToken = _tegToken;
        daiToken = _daiToken;
        ethToken = _ethToken;
        usdtToken = _usdtToken;
        owner = msg.sender;
    }

    //1. Stake Tokens (deposit)
    function stakeTokens(uint256 _amount, string memory _tok) public {
        //Amount staked cannot be smaller than 0
        require(_amount > 0);

        if (isStaking[msg.sender][_tok] == true) {
            uint256 toTransfer = Helpers.calculateEarningYield(
                earnedTime[msg.sender][_tok],
                earnedBalance[msg.sender][_tok]
            );
            earnedBalance[msg.sender][_tok] += toTransfer;
        }
        // Transfer to contract for staking
        if (StringUtils.equal(_tok, "dai")) {
            require(daiToken.balanceOf(msg.sender) > 0);
            daiToken.transferFrom(msg.sender, address(this), _amount);
        } else if (StringUtils.equal(_tok, "eth")) {
            require(ethToken.balanceOf(msg.sender) > 0);
            ethToken.transferFrom(msg.sender, address(this), _amount);
        } else {
            require(usdtToken.balanceOf(msg.sender) > 0);
            usdtToken.transferFrom(msg.sender, address(this), _amount);
        }

        //update start time
        earnedTime[msg.sender][_tok] = block.timestamp;
        //update staking balance
        stakingBalance[msg.sender][_tok] += _amount;
        //update staking status
        isStaking[msg.sender][_tok] = true;
        emit Stake(
            msg.sender,
            _amount,
            stakingBalance[msg.sender][_tok],
            earnedBalance[msg.sender][_tok],
            tegToken.balanceOf(msg.sender),
            daiToken.balanceOf(msg.sender),
            ethToken.balanceOf(msg.sender),
            usdtToken.balanceOf(msg.sender)
        );
    }

    //2. Unstaking Tokens (withdraw)
    function unstakeTokens(uint256 _amount, string memory _tok) public {
        //require amount > 0
        require(
            stakingBalance[msg.sender][_tok] >= _amount &&
                isStaking[msg.sender][_tok] == true &&
                borrowedBalance[msg.sender][_tok] <=
                (stakingBalance[msg.sender][_tok] - _amount)
        );

        uint256 yieldTransfer = Helpers.calculateEarningYield(
            earnedTime[msg.sender][_tok],
            earnedBalance[msg.sender][_tok]
        );
        earnedTime[msg.sender][_tok] = block.timestamp;
        uint256 balanceTransfer = _amount;
        _amount = 0;
        //decrease staking balance by amount
        stakingBalance[msg.sender][_tok] -= balanceTransfer;
        //unstake dai tokens from farm to investor
        // Transfer to contract for staking
        if (StringUtils.equal(_tok, "dai")) {
            daiToken.transfer(msg.sender, balanceTransfer);
        } else if (StringUtils.equal(_tok, "eth")) {
            ethToken.transfer(msg.sender, balanceTransfer);
        } else {
            usdtToken.transfer(msg.sender, balanceTransfer);
        }

        earnedBalance[msg.sender][_tok] += yieldTransfer;
        // is he still staking?
        //update staking status
        if (stakingBalance[msg.sender][_tok] == 0) {
            isStaking[msg.sender][_tok] = false;
        }
        emit Unstake(
            msg.sender,
            _amount,
            stakingBalance[msg.sender][_tok],
            earnedBalance[msg.sender][_tok],
            tegToken.balanceOf(msg.sender),
            daiToken.balanceOf(msg.sender),
            ethToken.balanceOf(msg.sender),
            usdtToken.balanceOf(msg.sender)
        );
    }

    //3. Borrow Tokens
    function borrowTokens(uint256 _amount, string memory _tok) public {
        //Amount staked cannot be smaller than 0,
        //Borrower should be staking
        //His staking balance should always be larger than borrowed amount (overcollateralized)
        //Balance of TEG tokens should not be 0 or lower
        require(
            _amount > 0 &&
                isStaking[msg.sender][_tok] == true &&
                stakingBalance[msg.sender][_tok] >= _amount
        );

        if (isBorrowing[msg.sender][_tok] == true) {
            uint256 toTransfer = Helpers.calculateLossYield(
                borrowedTime[msg.sender][_tok],
                borrowedBalance[msg.sender][_tok]
            );
            lossBalance[msg.sender][_tok] += toTransfer;
        }
        // Transfer Mock Dai to borrower
        // daiToken.approve(address(this), _amount);
        if (StringUtils.equal(_tok, "dai")) {
            daiToken.transfer(msg.sender, _amount);
        } else if (StringUtils.equal(_tok, "eth")) {
            ethToken.transfer(msg.sender, _amount);
        } else {
            usdtToken.transfer(msg.sender, _amount);
        }
        //update start time
        borrowedTime[msg.sender][_tok] = block.timestamp;
        //update borrowed balance
        borrowedBalance[msg.sender][_tok] += _amount;
        //update borrowing status
        isBorrowing[msg.sender][_tok] = true;
        emit Borrow(
            msg.sender,
            _amount,
            borrowedBalance[msg.sender][_tok],
            lossBalance[msg.sender][_tok],
            tegToken.balanceOf(msg.sender),
            daiToken.balanceOf(msg.sender),
            ethToken.balanceOf(msg.sender),
            usdtToken.balanceOf(msg.sender)
        );
    }

    //4. Repay Tokens
    function repayTokens(uint256 _amount, string memory _tok) public {
        require(
            borrowedBalance[msg.sender][_tok] >= _amount &&
                isBorrowing[msg.sender][_tok] == true
        );

        uint256 yieldTransfer = Helpers.calculateLossYield(
            borrowedTime[msg.sender][_tok],
            borrowedBalance[msg.sender][_tok]
        );
        borrowedTime[msg.sender][_tok] = block.timestamp;
        uint256 balanceTransfer = _amount;
        _amount = 0;
        //decrease borrowed balance by amount
        borrowedBalance[msg.sender][_tok] -= balanceTransfer;
        //repay dai tokens to farm
        if (StringUtils.equal(_tok, "dai")) {
            require(daiToken.balanceOf(msg.sender) > 0);
            daiToken.transferFrom(msg.sender, address(this), balanceTransfer);
        } else if (StringUtils.equal(_tok, "eth")) {
            require(ethToken.balanceOf(msg.sender) > 0);
            ethToken.transferFrom(msg.sender, address(this), balanceTransfer);
        } else {
            require(usdtToken.balanceOf(msg.sender) > 0);
            usdtToken.transferFrom(msg.sender, address(this), balanceTransfer);
        }

        lossBalance[msg.sender][_tok] += yieldTransfer;
        // is he still staking?
        //update staking status
        if (borrowedBalance[msg.sender][_tok] == 0) {
            isBorrowing[msg.sender][_tok] = false;
        }
        emit Repay(
            msg.sender,
            _amount,
            borrowedBalance[msg.sender][_tok],
            lossBalance[msg.sender][_tok],
            tegToken.balanceOf(msg.sender),
            daiToken.balanceOf(msg.sender),
            ethToken.balanceOf(msg.sender),
            usdtToken.balanceOf(msg.sender)
        );
    }

    //5. withdraw earned yield
    function withdrawYield(string memory _tok) public {
        uint256 toTransferEarned;
        uint256 toTransferLost;

        toTransferEarned = Helpers.calculateEarningYield(
            earnedTime[msg.sender][_tok],
            earnedBalance[msg.sender][_tok]
        );
        toTransferLost = Helpers.calculateLossYield(
            borrowedTime[msg.sender][_tok],
            borrowedBalance[msg.sender][_tok]
        );

        require(
            toTransferEarned > 0 ||
                earnedBalance[msg.sender][_tok] > 0 ||
                toTransferLost > 0 ||
                lossBalance[msg.sender][_tok] > 0
        );

        if (earnedBalance[msg.sender][_tok] != 0) {
            uint256 oldBalanceEarned = earnedBalance[msg.sender][_tok];
            earnedBalance[msg.sender][_tok] = 0;
            toTransferEarned += oldBalanceEarned;
        }

        if (lossBalance[msg.sender][_tok] != 0) {
            uint256 oldBalanceLost = lossBalance[msg.sender][_tok];
            lossBalance[msg.sender][_tok] = 0;
            toTransferLost += oldBalanceLost;
        }

        earnedTime[msg.sender][_tok] = block.timestamp;
        borrowedTime[msg.sender][_tok] = block.timestamp;

        tegToken.transfer(msg.sender, toTransferEarned - toTransferLost);
        emit YieldWithdraw(
            msg.sender,
            toTransferEarned,
            toTransferLost,
            stakingBalance[msg.sender][_tok],
            earnedBalance[msg.sender][_tok],
            borrowedBalance[msg.sender][_tok],
            lossBalance[msg.sender][_tok],
            tegToken.balanceOf(msg.sender),
            daiToken.balanceOf(msg.sender),
            ethToken.balanceOf(msg.sender),
            usdtToken.balanceOf(msg.sender)
        );
    }
}
