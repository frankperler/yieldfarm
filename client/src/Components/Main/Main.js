import { React, useState } from 'react'
import Dashboard from '../Dashboard/Dashboard'
import ExchangeBoard from '../ExchangeBoard/ExchangeBoard'
import './Main.css';
import web3 from 'web3'



function Main(props) {

  return (
    <div id="content" className="mt-3">

      <Dashboard
        stakingBalance={props.stakingBalance}
        daiTokenBalance={props.daiTokenBalance}
        tegTokenBalance={props.tegTokenBalance}
        earnedBalance={props.earnedBalance}
        borrowedBalance={props.borrowedBalance}
        lossBalance={props.lossBalance}
      />

      <ExchangeBoard
        unstakeTokens={props.unstakeTokens}
        stakeTokens={props.stakeTokens}
        withdrawEarningYield={props.withdrawEarningYield}
        borrowTokens={props.borrowTokens}
        repayTokens={props.repayTokens}
        withdrawLossYield={props.withdrawLossYield}
        // setStakingBalance={props.setStakingBalance}
        // setEarnedBalance={props.setEarnedBalance}
      />
    </div>
  );
}

export default Main;
