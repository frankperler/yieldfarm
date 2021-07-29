import { React } from 'react'
import './BorrowBoard.css';
import BorrowItem from '../BorrowItem/BorrowItem'
import web3 from 'web3';

function BorrowBoard(props) {

  return (
    <div className="card-body">
      <BorrowItem
        borrowTokens={props.borrowTokens}
        repayTokens={props.repayTokens}
        withdrawYield={props.withdrawYield}
      />
    </div>
  )
}

export default BorrowBoard;