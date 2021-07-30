//"SPDX-License-Identifier: UNLICENSED"
pragma solidity ^0.8.6;

import "./DaiToken.sol";
import "./EthToken.sol";
import "./UsdtToken.sol";
import "./TegToken.sol";

import "./stringUtils.sol";

contract TokenFarm {
    string public name = "Tegridy Token Farm";

    address public owner;
    TegToken public tegToken;
    DaiToken public daiToken;
    EthToken public ethToken;
    UsdtToken public usdtToken;

    //dai
    mapping(address => uint256) public daiStakingBalance;
    mapping(address => uint256) public daiLossBalance;
    mapping(address => uint256) public daiEarnedBalance;
    mapping(address => uint256) public daiBorrowedBalance;
    mapping(address => bool) public isStakingDai;
    mapping(address => bool) public isBorrowingDai;
    mapping(address => uint256) public earnedTimeDai;
    mapping(address => uint256) public borrowedTimeDai;

    //eth
    mapping(address => uint256) public ethStakingBalance;
    mapping(address => uint256) public ethLossBalance;
    mapping(address => uint256) public ethEarnedBalance;
    mapping(address => uint256) public ethBorrowedBalance;
    mapping(address => bool) public isStakingEth;
    mapping(address => bool) public isBorrowingEth;
    mapping(address => uint256) public earnedTimeEth;
    mapping(address => uint256) public borrowedTimeEth;

    //usdt
    mapping(address => uint256) public usdtStakingBalance;
    mapping(address => uint256) public usdtLossBalance;
    mapping(address => uint256) public usdtEarnedBalance;
    mapping(address => uint256) public usdtBorrowedBalance;
    mapping(address => bool) public isStakingUsdt;
    mapping(address => bool) public isBorrowingUsdt;
    mapping(address => uint256) public earnedTimeUsdt;
    mapping(address => uint256) public borrowedTimeUsdt;

    event Stake(
        address indexed from,
        uint256 amount,
        uint256 stakingBal,
        uint256 intBal,
        uint256 tegBal,
        uint256 tokenBal
    );
    event Unstake(
        address indexed from,
        uint256 amount,
        uint256 stakingBal,
        uint256 intBal,
        uint256 tegBal,
        uint256 tokenBal
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
        uint256 tokenBal
    );

    event Borrow(
        address indexed from,
        uint256 amount,
        uint256 borrowBal,
        uint256 lossBal,
        uint256 tegBal,
        uint256 tokenBal
    );

    event Repay(
        address indexed from,
        uint256 amount,
        uint256 borrowBal,
        uint256 lossBal,
        uint256 tegBal,
        uint256 tokenBal
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
    function stakeTokens(uint256 _amount, string memory _tok)
        public
        returns (uint256 balance)
    {
        if (StringUtils.equal(_tok, "dai")) {
            //Amount staked cannot be smaller than 0
            require(
                _amount > 0 && daiToken.balanceOf(msg.sender) >= _amount,
                "You cannot stake zero tokens"
            );

            if (isStakingDai[msg.sender] == true) {
                uint256 toTransfer = calculateEarningYield(msg.sender, _tok);
                daiEarnedBalance[msg.sender] += toTransfer;
            }
            // Transfer Mock Dai to this contract for staking
            daiToken.transferFrom(msg.sender, address(this), _amount);
            //update start time
            earnedTimeDai[msg.sender] = block.timestamp;
            //update staking balance
            daiStakingBalance[msg.sender] += _amount;
            // add user to stakers array "only" if they have not yet staked
            // if (!hasStaked[msg.sender]) {
            //     stakers.push(msg.sender);
            // }
            //update staking status
            isStakingDai[msg.sender] = true;
            // hasStaked[msg.sender] = true;
            emit Stake(
                msg.sender,
                _amount,
                daiStakingBalance[msg.sender],
                daiEarnedBalance[msg.sender],
                tegToken.balanceOf(msg.sender),
                daiToken.balanceOf(msg.sender)
            );
            return daiStakingBalance[msg.sender];
        } else if (StringUtils.equal(_tok, "eth")) {
            //Amount staked cannot be smaller than 0
            require(
                _amount > 0 && ethToken.balanceOf(msg.sender) >= _amount,
                "You cannot stake zero tokens"
            );

            if (isStakingEth[msg.sender] == true) {
                uint256 toTransfer = calculateEarningYield(msg.sender, _tok);
                ethEarnedBalance[msg.sender] += toTransfer;
            }
            // Transfer Mock eth to this contract for staking
            ethToken.transferFrom(msg.sender, address(this), _amount);
            //update start time
            earnedTimeEth[msg.sender] = block.timestamp;
            //update staking balance
            ethStakingBalance[msg.sender] += _amount;
            // add user to stakers array "only" if they have not yet staked
            // if (!hasStaked[msg.sender]) {
            //     stakers.push(msg.sender);
            // }
            //update staking status
            isStakingEth[msg.sender] = true;
            // hasStaked[msg.sender] = true;
            emit Stake(
                msg.sender,
                _amount,
                ethStakingBalance[msg.sender],
                ethEarnedBalance[msg.sender],
                tegToken.balanceOf(msg.sender),
                ethToken.balanceOf(msg.sender)
            );
            return ethStakingBalance[msg.sender];
        } else {
            //Amount staked cannot be smaller than 0
            require(
                _amount > 0 && usdtToken.balanceOf(msg.sender) >= _amount,
                "You cannot stake zero tokens"
            );

            if (isStakingUsdt[msg.sender] == true) {
                uint256 toTransfer = calculateEarningYield(msg.sender, _tok);
                usdtEarnedBalance[msg.sender] += toTransfer;
            }
            // Transfer Mock usdt to this contract for staking
            usdtToken.transferFrom(msg.sender, address(this), _amount);
            //update start time
            earnedTimeUsdt[msg.sender] = block.timestamp;
            //update staking balance
            usdtStakingBalance[msg.sender] += _amount;
            // add user to stakers array "only" if they have not yet staked
            // if (!hasStaked[msg.sender]) {
            //     stakers.push(msg.sender);
            // }
            //update staking status
            isStakingUsdt[msg.sender] = true;
            // hasStaked[msg.sender] = true;
            emit Stake(
                msg.sender,
                _amount,
                usdtStakingBalance[msg.sender],
                usdtEarnedBalance[msg.sender],
                tegToken.balanceOf(msg.sender),
                usdtToken.balanceOf(msg.sender)
            );
            return usdtStakingBalance[msg.sender];
        }
    }

    //2. Unstaking Tokens (withdraw)
    function unstakeTokens(uint256 _amount, string memory _tok)
        public
        returns (uint256 balance)
    {
        if (StringUtils.equal(_tok, "dai")) {
            //require amount > 0
            require(
                daiStakingBalance[msg.sender] >= _amount &&
                    isStakingDai[msg.sender] == true &&
                    daiBorrowedBalance[msg.sender] <=
                    (daiStakingBalance[msg.sender] - _amount),
                "Staking balance must be larger than amount and you should not be staking less than borrowed amounts"
            );

            uint256 yieldTransfer = calculateEarningYield(msg.sender, _tok);
            earnedTimeDai[msg.sender] = block.timestamp;
            uint256 balanceTransfer = _amount;
            _amount = 0;
            //decrease staking balance by amount
            daiStakingBalance[msg.sender] -= balanceTransfer;
            //unstake dai tokens from farm to investor
            daiToken.transfer(msg.sender, balanceTransfer);

            daiEarnedBalance[msg.sender] += yieldTransfer;
            // is he still staking?
            //update staking status
            if (daiStakingBalance[msg.sender] == 0) {
                isStakingDai[msg.sender] = false;
            }
            emit Unstake(
                msg.sender,
                _amount,
                daiStakingBalance[msg.sender],
                daiEarnedBalance[msg.sender],
                tegToken.balanceOf(msg.sender),
                daiToken.balanceOf(msg.sender)
            );
            return daiStakingBalance[msg.sender];
        } else if (StringUtils.equal(_tok, "eth")) {
            //require amount > 0
            require(
                ethStakingBalance[msg.sender] >= _amount &&
                    isStakingEth[msg.sender] == true &&
                    ethBorrowedBalance[msg.sender] <=
                    (ethStakingBalance[msg.sender] - _amount),
                "Staking balance must be larger than amount and you should not be staking less than borrowed amounts"
            );

            uint256 yieldTransfer = calculateEarningYield(msg.sender, _tok);
            earnedTimeEth[msg.sender] = block.timestamp;
            uint256 balanceTransfer = _amount;
            _amount = 0;
            //decrease staking balance by amount
            ethStakingBalance[msg.sender] -= balanceTransfer;
            //unstake eth tokens from farm to investor
            ethToken.transfer(msg.sender, balanceTransfer);

            ethEarnedBalance[msg.sender] += yieldTransfer;
            // is he still staking?
            //update staking status
            if (ethStakingBalance[msg.sender] == 0) {
                isStakingEth[msg.sender] = false;
            }
            emit Unstake(
                msg.sender,
                _amount,
                ethStakingBalance[msg.sender],
                ethEarnedBalance[msg.sender],
                tegToken.balanceOf(msg.sender),
                ethToken.balanceOf(msg.sender)
            );
            return ethStakingBalance[msg.sender];
        } else {
            //require amount > 0
            require(
                usdtStakingBalance[msg.sender] >= _amount &&
                    isStakingUsdt[msg.sender] == true &&
                    usdtBorrowedBalance[msg.sender] <=
                    (usdtStakingBalance[msg.sender] - _amount),
                "Staking balance must be larger than amount and you should not be staking less than borrowed amounts"
            );

            uint256 yieldTransfer = calculateEarningYield(msg.sender, _tok);
            earnedTimeUsdt[msg.sender] = block.timestamp;
            uint256 balanceTransfer = _amount;
            _amount = 0;
            //decrease staking balance by amount
            usdtStakingBalance[msg.sender] -= balanceTransfer;
            //unstake usdt tokens from farm to investor
            usdtToken.transfer(msg.sender, balanceTransfer);

            usdtEarnedBalance[msg.sender] += yieldTransfer;
            // is he still staking?
            //update staking status
            if (usdtStakingBalance[msg.sender] == 0) {
                isStakingUsdt[msg.sender] = false;
            }
            emit Unstake(
                msg.sender,
                _amount,
                usdtStakingBalance[msg.sender],
                usdtEarnedBalance[msg.sender],
                tegToken.balanceOf(msg.sender),
                usdtToken.balanceOf(msg.sender)
            );
            return usdtStakingBalance[msg.sender];
        }
    }

    //3. Borrow Tokens
    function borrowTokens(uint256 _amount, string memory _tok)
        public
        returns (uint256 balance)
    {
        if (StringUtils.equal(_tok, "dai")) {
            //Amount staked cannot be smaller than 0,
            //Borrower should be staking
            //His staking balance should always be larger than borrowed amount (overcollateralized)
            //Balance of TEG tokens should not be 0 or lower
            require(
                _amount > 0 &&
                    isStakingDai[msg.sender] == true &&
                    daiStakingBalance[msg.sender] >= _amount,
                // tegToken.balanceOf(msg.sender) >= 0,
                "You cannot borrow zero tokens"
            );

            if (isBorrowingDai[msg.sender] == true) {
                uint256 toTransfer = calculateLossYield(msg.sender, _tok);
                daiLossBalance[msg.sender] += toTransfer;
            }
            // Transfer Mock Dai to borrower
            // daiToken.approve(address(this), _amount);
            daiToken.transfer(msg.sender, _amount);
            //update start time
            borrowedTimeDai[msg.sender] = block.timestamp;
            //update borrowed balance
            daiBorrowedBalance[msg.sender] += _amount;
            //update borrowing status
            isBorrowingDai[msg.sender] = true;
            emit Borrow(
                msg.sender,
                _amount,
                daiBorrowedBalance[msg.sender],
                daiLossBalance[msg.sender],
                tegToken.balanceOf(msg.sender),
                daiToken.balanceOf(msg.sender)
            );
            return daiBorrowedBalance[msg.sender];
        } else if (StringUtils.equal(_tok, "eth")) {
            //Amount staked cannot be smaller than 0,
            //Borrower should be staking
            //His staking balance should always be larger than borrowed amount (overcollateralized)
            //Balance of TEG tokens should not be 0 or lower
            require(
                _amount > 0 &&
                    isStakingEth[msg.sender] == true &&
                    ethStakingBalance[msg.sender] >= _amount,
                // tegToken.balanceOf(msg.sender) >= 0,
                "You cannot borrow zero tokens"
            );

            if (isBorrowingEth[msg.sender] == true) {
                uint256 toTransfer = calculateLossYield(msg.sender, _tok);
                ethLossBalance[msg.sender] += toTransfer;
            }
            // Transfer Mock eth to borrower
            // ethToken.approve(address(this), _amount);
            ethToken.transfer(msg.sender, _amount);
            //update start time
            borrowedTimeEth[msg.sender] = block.timestamp;
            //update borrowed balance
            ethBorrowedBalance[msg.sender] += _amount;
            //update borrowing status
            isBorrowingEth[msg.sender] = true;
            emit Borrow(
                msg.sender,
                _amount,
                ethBorrowedBalance[msg.sender],
                ethLossBalance[msg.sender],
                tegToken.balanceOf(msg.sender),
                ethToken.balanceOf(msg.sender)
            );
            return ethBorrowedBalance[msg.sender];
        } else {
            //Amount staked cannot be smaller than 0,
            //Borrower should be staking
            //His staking balance should always be larger than borrowed amount (overcollateralized)
            //Balance of TEG tokens should not be 0 or lower
            require(
                _amount > 0 &&
                    isStakingUsdt[msg.sender] == true &&
                    usdtStakingBalance[msg.sender] >= _amount,
                // tegToken.balanceOf(msg.sender) >= 0,
                "You cannot borrow zero tokens"
            );

            if (isBorrowingUsdt[msg.sender] == true) {
                uint256 toTransfer = calculateLossYield(msg.sender, _tok);
                usdtLossBalance[msg.sender] += toTransfer;
            }
            // Transfer Mock usdt to borrower
            // usdtToken.approve(address(this), _amount);
            usdtToken.transfer(msg.sender, _amount);
            //update start time
            borrowedTimeUsdt[msg.sender] = block.timestamp;
            //update borrowed balance
            usdtBorrowedBalance[msg.sender] += _amount;
            //update borrowing status
            isBorrowingUsdt[msg.sender] = true;
            emit Borrow(
                msg.sender,
                _amount,
                usdtBorrowedBalance[msg.sender],
                usdtLossBalance[msg.sender],
                tegToken.balanceOf(msg.sender),
                usdtToken.balanceOf(msg.sender)
            );
            return usdtBorrowedBalance[msg.sender];
        }
    }

    //4. Repay Tokens
    function repayTokens(uint256 _amount, string memory _tok)
        public
        returns (uint256 balance)
    {
        if (StringUtils.equal(_tok, "dai")) {
            require(
                daiBorrowedBalance[msg.sender] >= _amount &&
                    isBorrowingDai[msg.sender] == true,
                "Borrowed balance must be larger than amount"
            );

            uint256 yieldTransfer = calculateLossYield(msg.sender, _tok);
            borrowedTimeDai[msg.sender] = block.timestamp;
            uint256 balanceTransfer = _amount;
            _amount = 0;
            //decrease borrowed balance by amount
            daiBorrowedBalance[msg.sender] -= balanceTransfer;
            //repay dai tokens to farm
            daiToken.transferFrom(msg.sender, address(this), balanceTransfer);

            daiLossBalance[msg.sender] += yieldTransfer;
            // is he still staking?
            //update staking status
            if (daiBorrowedBalance[msg.sender] == 0) {
                isBorrowingDai[msg.sender] = false;
            }
            emit Repay(
                msg.sender,
                _amount,
                daiBorrowedBalance[msg.sender],
                daiLossBalance[msg.sender],
                tegToken.balanceOf(msg.sender),
                daiToken.balanceOf(msg.sender)
            );
            return daiBorrowedBalance[msg.sender];
        } else if (StringUtils.equal(_tok, "eth")) {
            require(
                ethBorrowedBalance[msg.sender] >= _amount &&
                    isBorrowingEth[msg.sender] == true,
                "Borrowed balance must be larger than amount"
            );

            uint256 yieldTransfer = calculateLossYield(msg.sender, _tok);
            borrowedTimeEth[msg.sender] = block.timestamp;
            uint256 balanceTransfer = _amount;
            _amount = 0;
            //decrease borrowed balance by amount
            ethBorrowedBalance[msg.sender] -= balanceTransfer;
            //repay eth tokens to farm
            ethToken.transferFrom(msg.sender, address(this), balanceTransfer);

            ethLossBalance[msg.sender] += yieldTransfer;
            // is he still staking?
            //update staking status
            if (ethBorrowedBalance[msg.sender] == 0) {
                isBorrowingEth[msg.sender] = false;
            }
            emit Repay(
                msg.sender,
                _amount,
                ethBorrowedBalance[msg.sender],
                ethLossBalance[msg.sender],
                tegToken.balanceOf(msg.sender),
                ethToken.balanceOf(msg.sender)
            );
            return ethBorrowedBalance[msg.sender];
        } else {
            require(
                usdtBorrowedBalance[msg.sender] >= _amount &&
                    isBorrowingUsdt[msg.sender] == true,
                "Borrowed balance must be larger than amount"
            );

            uint256 yieldTransfer = calculateLossYield(msg.sender, _tok);
            borrowedTimeUsdt[msg.sender] = block.timestamp;
            uint256 balanceTransfer = _amount;
            _amount = 0;
            //decrease borrowed balance by amount
            usdtBorrowedBalance[msg.sender] -= balanceTransfer;
            //repay usdt tokens to farm
            usdtToken.transferFrom(msg.sender, address(this), balanceTransfer);

            usdtLossBalance[msg.sender] += yieldTransfer;
            // is he still staking?
            //update staking status
            if (usdtBorrowedBalance[msg.sender] == 0) {
                isBorrowingUsdt[msg.sender] = false;
            }
            emit Repay(
                msg.sender,
                _amount,
                usdtBorrowedBalance[msg.sender],
                usdtLossBalance[msg.sender],
                tegToken.balanceOf(msg.sender),
                usdtToken.balanceOf(msg.sender)
            );
            return usdtBorrowedBalance[msg.sender];
        }
    }

    //5. withdraw earned yield
    function withdrawYield(string memory _tok) public {
        uint256 toTransferEarned = calculateEarningYield(msg.sender, _tok);
        uint256 toTransferLost = calculateLossYield(msg.sender, _tok);

        if (StringUtils.equal(_tok, "dai")) {
            require(
                toTransferEarned > 0 ||
                    daiEarnedBalance[msg.sender] > 0 ||
                    toTransferLost > 0 ||
                    daiLossBalance[msg.sender] > 0,
                "Nothing to withdraw"
            );

            if (daiEarnedBalance[msg.sender] != 0) {
                uint256 oldBalanceEarned = daiEarnedBalance[msg.sender];
                daiEarnedBalance[msg.sender] = 0;
                toTransferEarned += oldBalanceEarned;
            }

            if (daiLossBalance[msg.sender] != 0) {
                uint256 oldBalanceLost = daiLossBalance[msg.sender];
                daiLossBalance[msg.sender] = 0;
                toTransferLost += oldBalanceLost;
            }

            earnedTimeDai[msg.sender] = block.timestamp;
            borrowedTimeDai[msg.sender] = block.timestamp;

            tegToken.transfer(msg.sender, toTransferEarned - toTransferLost);
            emit YieldWithdraw(
                msg.sender,
                toTransferEarned,
                toTransferLost,
                daiStakingBalance[msg.sender],
                daiEarnedBalance[msg.sender],
                daiBorrowedBalance[msg.sender],
                daiLossBalance[msg.sender],
                tegToken.balanceOf(msg.sender),
                daiToken.balanceOf(msg.sender)
            );
        } else if (StringUtils.equal(_tok, "dai")) {
            require(
                toTransferEarned > 0 ||
                    ethEarnedBalance[msg.sender] > 0 ||
                    toTransferLost > 0 ||
                    ethLossBalance[msg.sender] > 0,
                "Nothing to withdraw"
            );

            if (ethEarnedBalance[msg.sender] != 0) {
                uint256 oldBalanceEarned = ethEarnedBalance[msg.sender];
                ethEarnedBalance[msg.sender] = 0;
                toTransferEarned += oldBalanceEarned;
            }

            if (ethLossBalance[msg.sender] != 0) {
                uint256 oldBalanceLost = ethLossBalance[msg.sender];
                ethLossBalance[msg.sender] = 0;
                toTransferLost += oldBalanceLost;
            }

            earnedTimeEth[msg.sender] = block.timestamp;
            borrowedTimeEth[msg.sender] = block.timestamp;

            tegToken.transfer(msg.sender, toTransferEarned - toTransferLost);
            emit YieldWithdraw(
                msg.sender,
                toTransferEarned,
                toTransferLost,
                ethStakingBalance[msg.sender],
                ethEarnedBalance[msg.sender],
                ethBorrowedBalance[msg.sender],
                ethLossBalance[msg.sender],
                tegToken.balanceOf(msg.sender),
                ethToken.balanceOf(msg.sender)
            );
        } else {
            require(
                toTransferEarned > 0 ||
                    usdtEarnedBalance[msg.sender] > 0 ||
                    toTransferLost > 0 ||
                    usdtLossBalance[msg.sender] > 0,
                "Nothing to withdraw"
            );

            if (usdtEarnedBalance[msg.sender] != 0) {
                uint256 oldBalanceEarned = usdtEarnedBalance[msg.sender];
                usdtEarnedBalance[msg.sender] = 0;
                toTransferEarned += oldBalanceEarned;
            }

            if (usdtLossBalance[msg.sender] != 0) {
                uint256 oldBalanceLost = usdtLossBalance[msg.sender];
                usdtLossBalance[msg.sender] = 0;
                toTransferLost += oldBalanceLost;
            }

            earnedTimeUsdt[msg.sender] = block.timestamp;
            borrowedTimeUsdt[msg.sender] = block.timestamp;

            tegToken.transfer(msg.sender, toTransferEarned - toTransferLost);
            emit YieldWithdraw(
                msg.sender,
                toTransferEarned,
                toTransferLost,
                usdtStakingBalance[msg.sender],
                usdtEarnedBalance[msg.sender],
                usdtBorrowedBalance[msg.sender],
                usdtLossBalance[msg.sender],
                tegToken.balanceOf(msg.sender),
                usdtToken.balanceOf(msg.sender)
            );
        }
    }

    //time functions

    function calculateEarningTime(address user, string memory _tok)
        public
        view
        returns (uint256)
    {
        if (StringUtils.equal(_tok, "dai")) {
            uint256 end = block.timestamp;
            uint256 totalTime = end - earnedTimeDai[user];
            return totalTime;
        } else if (StringUtils.equal(_tok, "eth")) {
            uint256 end = block.timestamp;
            uint256 totalTime = end - earnedTimeEth[user];
            return totalTime;
        } else {
            uint256 end = block.timestamp;
            uint256 totalTime = end - earnedTimeUsdt[user];
            return totalTime;
        }
    }

    function calculateEarningYield(address user, string memory _tok)
        public
        view
        returns (uint256)
    {
        if (StringUtils.equal(_tok, "dai")) {
            uint256 time = calculateEarningTime(user, "dai") * 10**18;
            uint256 rate = 31536000; // 100%
            uint256 timeRate = time / rate;
            uint256 rawYield = (daiStakingBalance[user] * timeRate) / 10**18;
            return rawYield;
        } else if (StringUtils.equal(_tok, "eth")) {
            uint256 time = calculateEarningTime(user, "eth") * 10**18;
            uint256 rate = 31536000;
            uint256 timeRate = time / rate;
            uint256 rawYield = (ethStakingBalance[user] * timeRate) / 10**18;
            return rawYield;
        } else {
            uint256 time = calculateEarningTime(user, "usdt") * 10**18;
            uint256 rate = 31536000; // 100%
            uint256 timeRate = time / rate;
            uint256 rawYield = (usdtStakingBalance[user] * timeRate) / 10**18;
            return rawYield;
        }
    }

    function calculateBorrowTime(address user, string memory _tok)
        public
        view
        returns (uint256)
    {
        if (StringUtils.equal(_tok, "dai")) {
            uint256 end = block.timestamp;
            uint256 totalTime = end - borrowedTimeDai[user];
            return totalTime;
        } else if (StringUtils.equal(_tok, "eth")) {
            uint256 end = block.timestamp;
            uint256 totalTime = end - borrowedTimeEth[user];
            return totalTime;
        } else {
            uint256 end = block.timestamp;
            uint256 totalTime = end - borrowedTimeUsdt[user];
            return totalTime;
        }
    }

    function calculateLossYield(address user, string memory _tok)
        public
        view
        returns (uint256)
    {
        if (StringUtils.equal(_tok, "dai")) {
            uint256 time = calculateBorrowTime(user, "dai") * 10**18;
            uint256 rate = 28669090; // 110%
            uint256 timeRate = time / rate;
            uint256 rawYield = (daiBorrowedBalance[user] * timeRate) / 10**18;
            return rawYield;
        } else if (StringUtils.equal(_tok, "eth")) {
            uint256 time = calculateBorrowTime(user, "eth") * 10**18;
            uint256 rate = 28669090; // 110%
            uint256 timeRate = time / rate;
            uint256 rawYield = (ethBorrowedBalance[user] * timeRate) / 10**18;
            return rawYield;
        } else {
            uint256 time = calculateBorrowTime(user, "usdt") * 10**18;
            uint256 rate = 28669090; // 110%
            uint256 timeRate = time / rate;
            uint256 rawYield = (usdtBorrowedBalance[user] * timeRate) / 10**18;
            return rawYield;
        }
    }
}
