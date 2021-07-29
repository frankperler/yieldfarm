import { React } from 'react'
import './ExchangeBoard.css';
import LendBoard from '../LendBoard/LendBoard'
import BorrowBoard from '../BorrowBoard/BorrowBoard'
import web3 from 'web3';

function ExchangeBoard(props) {

  return (

    <div className="card mb-4">
      <LendBoard
        unstakeTokens={props.unstakeTokens}
        stakeTokens={props.stakeTokens}
        withdrawYield={props.withdrawYield}

      // setStakingBalance={props.setStakingBalance}
      // setEarnedBalance={props.setEarnedBalance}
      // daiTokenBalance={props.daiTokenBalance}
      />
      <BorrowBoard
        borrowTokens={props.borrowTokens}
        repayTokens={props.repayTokens}
        withdrawYield={props.withdrawYield}
      />
    </div>

  )
}

export default ExchangeBoard;