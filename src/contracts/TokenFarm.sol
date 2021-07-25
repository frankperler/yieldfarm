// "SPDX-License-Identifier: UNLICENSED" 
pragma solidity ^0.8.6;

import "./DaiToken.sol";
import "./TegToken.sol";

contract TokenFarm {

  string public name = "Tegrity Token Farm";
  TegToken public tegToken;
  DaiToken public daiToken;

  constructor (TegToken _tegToken, DaiToken _daiToken) {
    tegToken = _tegToken;
    daiToken = _daiToken;
  }

  

}