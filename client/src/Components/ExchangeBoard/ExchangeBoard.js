import { React } from 'react'
import './ExchangeBoard.css';
import ExchangeItems from '../ExchangeItems/ExchangeItems'
import Typography from '@material-ui/core/Typography';

function ExchangeBoard(props) {

  return (

    <div>
      <Typography component="h2" variant="h5" color="primary" gutterBottom align="left">Exchange Board</Typography>
      <ExchangeItems
        unstakeTokens={props.unstakeTokens}
        stakeTokens={props.stakeTokens}
        borrowTokens={props.borrowTokens}
        repayTokens={props.repayTokens}
        withdrawYield={props.withdrawYield} />
    </div>

  )
}

export default ExchangeBoard;