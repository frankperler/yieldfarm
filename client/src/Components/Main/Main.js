import { React } from 'react'
import Dashboard from '../Dashboard/Dashboard'
import TegBox from '../TegBox/TegBox'
import { makeStyles } from '@material-ui/core/styles';
import ExchangeBoard from '../ExchangeBoard/ExchangeBoard'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import './Main.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow:1
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
  },
}));

function Main(props) {
  const classes = useStyles();

  return (
    <div id="content" className={classes.root}>
      <Container maxWidth="xl" className={classes.container}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Dashboard
                daiTokenBalance={props.daiTokenBalance}
                ethTokenBalance={props.ethTokenBalance}
                usdtTokenBalance={props.usdtTokenBalance}
                daiStakingBalance={props.daiStakingBalance}
                ethStakingBalance={props.ethStakingBalance}
                usdtStakingBalance={props.usdtStakingBalance}
                daiBorrowedBalance={props.daiBorrowedBalance}
                ethBorrowedBalance={props.ethBorrowedBalance}
                usdtBorrowedBalance={props.usdtBorrowedBalance}
                daiEarnedBalance={props.daiEarnedBalance}
                ethEarnedBalance={props.ethEarnedBalance}
                usdtEarnedBalance={props.usdtEarnedBalance}
                daiLossBalance={props.daiLossBalance}
                ethLossBalance={props.ethLossBalance}
                usdtLossBalance={props.usdtLossBalance}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8} lg={9}>
            <Paper className={classes.paper}>
              <ExchangeBoard
                unstakeTokens={props.unstakeTokens}
                stakeTokens={props.stakeTokens}
                withdrawYield={props.withdrawYield}
                borrowTokens={props.borrowTokens}
                repayTokens={props.repayTokens}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper className={classes.paper}>
              <TegBox tegTokenBalance={props.tegTokenBalance} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="100%" className={classes.containerDisplay}>



      </Container>



    </div>
  );
}

export default Main;
