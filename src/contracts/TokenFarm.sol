// "SPDX-License-Identifier: UNLICENSED"
pragma solidity ^0.8.6;

import "./DaiToken.sol";
import "./TegToken.sol";

contract TokenFarm {

    string public name = "Tegrity Token Farm";

    address public owner;
    TegToken public tegToken;
    DaiToken public daiToken;

    address[] public stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor (TegToken _tegToken, DaiToken _daiToken) {
        tegToken = _tegToken;
        daiToken = _daiToken;
        owner = msg.sender;
    }

    //1. Stake Tokens (deposit)
    function stakeTokens(uint256 _amount) public {
      //Amount staked cannot be smaller than 0
      require(_amount > 0, 'amount cannot be 0');
      // Transfer Mock Dai to this contract for staking
      daiToken.transferFrom(msg.sender, address(this), _amount);
      //update staking balance
      stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount; 
      // add user to stakers array "only" if they have not yet staked
      if(!hasStaked[msg.sender]) {
        stakers.push(msg.sender);
      }
      //update staking status
      isStaking[msg.sender] = true;
      hasStaked[msg.sender] = true;
    }

    //2. Unstaking Tokens (withdraw)
    function unstakeTokens() public {
      //fetch staking balance
      uint balance = stakingBalance[msg.sender];
      //require amounnt > 0
      require(balance>0, 'staking balance cannot be 0 or lower');
      //unstake dai tokens from farm to investor
      daiToken.transfer(msg.sender, balance);
      //reset staking balance
      stakingBalance[msg.sender] = 0;
      //update staking status
      isStaking[msg.sender] = false;
    }

    //3. Issuing Teg Tokens to investor on a regular basis
    function issueTokens() public {
      require(msg.sender==owner, 'only owner can call this function');
      for (uint i=0; i<stakers.length; i++) {
        address recipient = stakers[i];
        uint balance = stakingBalance[recipient];
        if (balance > 0) {
          tegToken.transfer(recipient, balance); // send exactly the same amount of tegToken than dai Token deposited
        }
      }
    }
}
