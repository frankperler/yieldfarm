import { React, useContext } from 'react'
import './Dashboard.css';
import dai from '../../assets/dai.png'
import eth from '../../assets/eth-logo.png'
import usdt from '../../assets/tether.png'
import web3 from 'web3';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    shape: {borderRadius: 4}
  },
  titleColor: {
    backgroundColor: theme.palette.primary.dark,
  },
  rowColor: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.dark
  }
}));

function Dashboard(props) {
  const classes = useStyles();

  return (
    <>
    <Typography component="h2" variant="h5" color="secondary" gutterBottom align="left">Dashboard</Typography>
      <Table size="medium">
        <colgroup>
          <col width="10%" />
          <col width="10%" />
          <col width="10%" />
          <col width="14%" />
          <col width="14%" />
          <col width="14%" />
          <col width="14%" />
          <col width="14%" />
        </colgroup>
        <TableHead color="secondary">
          <TableRow className={classes.titleColor}>
            <TableCell>Asset</TableCell>
            <TableCell>APY / Earned</TableCell>
            <TableCell>APY / Accrued</TableCell>
            <TableCell>Staked Balance</TableCell>
            <TableCell>Borrowed Balance</TableCell>
            <TableCell>Wallet Balance</TableCell>
            <TableCell>Realized TEG Gains</TableCell>
            <TableCell>Realized TEG Losses</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.rowColor}>
          <TableRow key="1">
            <TableCell>{<img alt="" src={dai}></img>}</TableCell>
            <TableCell>100%</TableCell>
            <TableCell>110%</TableCell>
            <TableCell>{web3.utils.fromWei(props.daiStakingBalance, 'Ether')} DAI</TableCell>
            <TableCell>{web3.utils.fromWei(props.daiBorrowedBalance, 'Ether')} DAI</TableCell>
            <TableCell>{web3.utils.fromWei(props.daiTokenBalance, 'Ether')} DAI</TableCell>
            <TableCell>{web3.utils.fromWei(props.daiEarnedBalance, 'Ether')} TEG</TableCell>
            <TableCell>{web3.utils.fromWei(props.daiLossBalance, 'Ether')} TEG</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>{<img alt="" src={eth}></img>}</TableCell>
            <TableCell>100%</TableCell>
            <TableCell>110%</TableCell>
            <TableCell>{web3.utils.fromWei(props.ethStakingBalance, 'Ether')} ETH</TableCell>
            <TableCell>{web3.utils.fromWei(props.ethBorrowedBalance, 'Ether')} ETH</TableCell>
            <TableCell>{web3.utils.fromWei(props.ethTokenBalance, 'Ether')} ETH</TableCell>
            <TableCell>{web3.utils.fromWei(props.ethEarnedBalance, 'Ether')} TEG</TableCell>
            <TableCell>{web3.utils.fromWei(props.ethLossBalance, 'Ether')} TEG</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>{<img alt="" src={usdt}></img>}</TableCell>
            <TableCell>100%</TableCell>
            <TableCell>110%</TableCell>
            <TableCell>{web3.utils.fromWei(props.usdtStakingBalance, 'Ether')} USDT</TableCell>
            <TableCell>{web3.utils.fromWei(props.usdtBorrowedBalance, 'Ether')} USDT</TableCell>
            <TableCell>{web3.utils.fromWei(props.usdtTokenBalance, 'Ether')} USDT</TableCell>
            <TableCell>{web3.utils.fromWei(props.usdtEarnedBalance, 'Ether')} TEG</TableCell>
            <TableCell>{web3.utils.fromWei(props.usdtLossBalance, 'Ether')} TEG</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}

export default Dashboard;

