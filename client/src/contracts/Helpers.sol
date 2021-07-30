//"SPDX-License-Identifier: UNLICENSED"
pragma solidity ^0.8.6;

library Helpers {
    function calculateTime(uint256 _startTime) public view returns (uint256) {
        uint256 end = block.timestamp;
        uint256 totalTime = end - _startTime; // borrowedTimeDai[user];
        return totalTime;
    }

    function calculateLossYield(uint256 _startTime, uint256 _borrowedBalance)
        public
        view
        returns (uint256)
    {
        uint256 time = calculateTime(_startTime) * 10**18;
        uint256 rawYield = ((_borrowedBalance * time) / 28669090) / 10**18;
        return rawYield;
    }

    function calculateEarningYield(uint256 _startTime, uint256 _earnedBalance)
        public
        view
        returns (uint256)
    {
        uint256 time = calculateTime(_startTime) * 10**18;
        uint256 rawYield = ((_earnedBalance * time) / 31536000) / 10**18;
        return rawYield;
    }

}
