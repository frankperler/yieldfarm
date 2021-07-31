import { React } from 'react'
import './BorrowBoard.css';
import BorrowItem from '../BorrowItem/BorrowItem'

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