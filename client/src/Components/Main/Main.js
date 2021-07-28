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
      tegTokenBalance={props.tegTokenBalance} 
      tegBalance={props.tegBalance}
      />

      <ExchangeBoard
        unstakeTokens={props.unstakeTokens}
        stakeTokens={props.stakeTokens}
        withdrawYield={props.withdrawYield}
        setStakingBalance={props.setStakingBalance}
        setTegBalance={props.setTegBalance}
        daiTokenBalance={props.daiTokenBalance}
        />
    </div>
  );
}

export default Main;
