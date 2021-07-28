import { React } from 'react'
import './BorrowBoard.css';
import BorrowItem from '../BorrowItem/BorrowItem'
import web3 from 'web3';

function BorrowBoard(props) {

  return (
    <div className="card-body">
      <BorrowItem
        unstakeTokens={props.unstakeTokens}
        stakeTokens={props.stakeTokens}
        daiTokenBalance={props.daiTokenBalance}
      />
    </div>
  )
}

export default BorrowBoard;