import { React } from 'react'
import './ExchangeBoard.css';
import LendBoard from '../LendBoard/LendBoard'
import BorrowBoard from '../BorrowBoard/BorrowBoard'

function ExchangeBoard(props) {

  return (

    <div className="card mb-4">
      <LendBoard
        unstakeTokens={props.unstakeTokens}
        stakeTokens={props.stakeTokens}
        withdrawYield={props.withdrawYield}

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