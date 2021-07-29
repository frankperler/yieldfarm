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
        withdrawEarningYield={props.withdrawEarningYield}
        // setStakingBalance={props.setStakingBalance}
        // setEarnedBalance={props.setEarnedBalance}
        // daiTokenBalance={props.daiTokenBalance}
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