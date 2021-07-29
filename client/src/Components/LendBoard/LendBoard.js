import { React } from 'react'
import './LendBoard.css';
import LendItem from '../LendItem/LendItem'
import web3 from 'web3';

function LendBoard(props) {

  return (
    <div className="card-body">
      <LendItem
        unstakeTokens={props.unstakeTokens}
        stakeTokens={props.stakeTokens}
        withdrawYield={props.withdrawYield}
        // setStakingBalance={props.setStakingBalance}
        // setEarnedBalance={props.setEarnedBalance}
        // daiTokenBalance={props.daiTokenBalance}
      />
    </div>
  )
}

export default LendBoard;