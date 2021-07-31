import { React, useState } from 'react'
import Dashboard from '../Dashboard/Dashboard'
import ExchangeBoard from '../ExchangeBoard/ExchangeBoard'
import './Main.css';
import web3 from 'web3'



function Main(props) {

  return (
    <div id="content" className="mt-3">

      <Dashboard
      daiTokenBalance={props.daiTokenBalance}
      ethTokenBalance={props.ethTokenBalance}
      usdtTokenBalance={props.usdtTokenBalance}
      tegTokenBalance={props.tegTokenBalance}

      daiStakingBalance={props.daiStakingBalance}
      ethStakingBalance={props.ethStakingBalance}
      usdtStakingBalance={props.usdtStakingBalance}

      daiBorrowedBalance={props.daiBorrowedBalance}
      ethBorrowedBalance={props.ethBorrowedBalance}
      usdtBorrowedBalance={props.usdtBorrowedBalance}

      daiEarnedBalance={props.daiEarnedBalance}
      ethEarnedBalance={props.ethEarnedBalance}
      usdtEarnedBalance={props.usdtEarnedBalance}

      daiLossBalance={props.daiLossBalance}
      ethLossBalance={props.ethLossBalance}
      usdtLossBalance={props.usdtLossBalance}

      />

      <ExchangeBoard
        unstakeTokens={props.unstakeTokens}
        stakeTokens={props.stakeTokens}
        withdrawYield={props.withdrawYield}
        borrowTokens={props.borrowTokens}
        repayTokens={props.repayTokens}
      />
    </div>
  );
}

export default Main;
