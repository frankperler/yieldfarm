import { React } from 'react'
import './ExchangeBoard.css';
import LendBoard from '../LendBoard/LendBoard'
import BorrowBoard from '../BorrowBoard/BorrowBoard'
import web3 from 'web3';

function ExchangeBoard (props) {

  return (
    
    <div className="card mb-4">
      <LendBoard
        unstakeTokens={props.unstakeTokens}
        stakeTokens={props.stakeTokens}
        withdrawYield={props.withdrawYield}
        daiTokenBalance={props.daiTokenBalance}
       />
       <BorrowBoard
        unstakeTokens={props.unstakeTokens}
        stakeTokens={props.stakeTokens}
        daiTokenBalance={props.daiTokenBalance}
       />
    </div>

  )
}

export default ExchangeBoard;