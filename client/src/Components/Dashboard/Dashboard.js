import { React } from 'react'
import './Dashboard.css';
import dai from '../../dai.png'
import eth from '../../eth-logo.png'
import usdt from '../../tether.png'
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
    <Typography component="h2" variant="h5" color="primary" gutterBottom align="left">Dashboard</Typography>
      <Table size="medium">
        <colgroup>
          <col width="16.6%" />
          <col width="16.6%" />
          <col width="16.6%%" />
          <col width="16.6%%" />
          <col width="16.6%%" />
          <col width="16.6%%" />
        </colgroup>
        <TableHead color="secondary">
          <TableRow className={classes.titleColor}>
            <TableCell>Asset</TableCell>
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
            <TableCell>{web3.utils.fromWei(props.daiStakingBalance, 'Ether')} DAI</TableCell>
            <TableCell>{web3.utils.fromWei(props.daiBorrowedBalance, 'Ether')} DAI</TableCell>
            <TableCell>{web3.utils.fromWei(props.daiTokenBalance, 'Ether')} DAI</TableCell>
            <TableCell>{web3.utils.fromWei(props.daiEarnedBalance, 'Ether')} TEG</TableCell>
            <TableCell>{web3.utils.fromWei(props.daiLossBalance, 'Ether')} TEG</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>{<img alt="" src={eth}></img>}</TableCell>
            <TableCell>{web3.utils.fromWei(props.ethStakingBalance, 'Ether')} ETH</TableCell>
            <TableCell>{web3.utils.fromWei(props.ethBorrowedBalance, 'Ether')} ETH</TableCell>
            <TableCell>{web3.utils.fromWei(props.ethTokenBalance, 'Ether')} ETH</TableCell>
            <TableCell>{web3.utils.fromWei(props.ethEarnedBalance, 'Ether')} TEG</TableCell>
            <TableCell>{web3.utils.fromWei(props.ethLossBalance, 'Ether')} TEG</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>{<img alt="" src={usdt}></img>}</TableCell>
            <TableCell>{web3.utils.fromWei(props.daiStakingBalance, 'Ether')} USDT</TableCell>
            <TableCell>{web3.utils.fromWei(props.daiBorrowedBalance, 'Ether')} USDT</TableCell>
            <TableCell>{web3.utils.fromWei(props.daiTokenBalance, 'Ether')} USDT</TableCell>
            <TableCell>{web3.utils.fromWei(props.daiEarnedBalance, 'Ether')} TEG</TableCell>
            <TableCell>{web3.utils.fromWei(props.daiLossBalance, 'Ether')} TEG</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );

  // return (
  //   <div className="dashboard">
  //     <table className="table table-borderless text-muted text-center">
  //       <thead>
  //         <tr>
  //           <th scope="col">Asset</th>
  //           <th scope="col">Staked Balance</th>
  //           <th scope="col">Borrowed Balance</th>
  //           <th scope="col">Wallet Balance</th>
  //           <th scope="col">Realized TEG Gains</th>
  //           <th scope="col">Realized TEG Losses</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         <tr>
  //           <td><img alt ="" src={dai}></img></td>
  //           <td>{web3.utils.fromWei(props.daiStakingBalance, 'Ether')} DAI</td>
  //           <td>{web3.utils.fromWei(props.daiBorrowedBalance, 'Ether')} DAI</td>
  //           <td>{web3.utils.fromWei(props.daiTokenBalance, 'Ether')} DAI</td>
  //           <td>{web3.utils.fromWei(props.daiEarnedBalance, 'Ether')} TEG</td>
  //           <td>{web3.utils.fromWei(props.daiLossBalance, 'Ether')} TEG</td>
  //         </tr>
  //         <tr>
  //           <td><img alt="" src={eth}></img></td>
  //           <td>{web3.utils.fromWei(props.ethStakingBalance, 'Ether')} ETH</td>
  //           <td>{web3.utils.fromWei(props.ethBorrowedBalance, 'Ether')} ETH</td>
  //           <td>{web3.utils.fromWei(props.ethTokenBalance, 'Ether')} ETH</td>
  //           <td>{web3.utils.fromWei(props.ethEarnedBalance, 'Ether')} TEG</td>
  //           <td>{web3.utils.fromWei(props.ethLossBalance, 'Ether')} TEG</td>
  //         </tr>
  //         <tr>
  //           <td><img alt="" src={usdt}></img></td>
  //           <td>{web3.utils.fromWei(props.usdtStakingBalance, 'Ether')} USDT</td>
  //           <td>{web3.utils.fromWei(props.usdtBorrowedBalance, 'Ether')} USDT</td>
  //           <td>{web3.utils.fromWei(props.usdtTokenBalance, 'Ether')} USDT</td>
  //           <td>{web3.utils.fromWei(props.usdtEarnedBalance, 'Ether')} TEG</td>
  //           <td>{web3.utils.fromWei(props.usdtLossBalance, 'Ether')} TEG</td>
  //         </tr>
  //       </tbody>
  //     </table>

  //     <table className="table table-borderless text-muted text-center">
  //       <thead>
  //         <tr>
  //           <th scope="col">TEG Account Balance</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         <tr>
  //           <td>{web3.utils.fromWei(props.tegTokenBalance, 'Ether')} TEG</td>
  //         </tr>
  //       </tbody>
  //     </table>
  //   </div>
  // );
}

export default Dashboard;

