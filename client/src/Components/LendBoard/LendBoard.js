import { React } from 'react'
import './LendBoard.css';
import LendItem from '../LendItem/LendItem'

function LendBoard(props) {

  return (
    <div className="card-body">
      <LendItem
        unstakeTokens={props.unstakeTokens}
        stakeTokens={props.stakeTokens}
        withdrawYield={props.withdrawYield}
      />
    </div>
  )
}

export default LendBoard;