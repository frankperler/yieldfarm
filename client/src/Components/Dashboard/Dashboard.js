import { React } from 'react'
import './Dashboard.css';
import dai from '../../dai.png'
import eth from '../../eth-logo.png'
import usdt from '../../tether.png'
import web3 from 'web3';

function Dashboard(props) {

  return (
    <div className="dashboard">
      <table className="table table-borderless text-muted text-center">
        <thead>
          <tr>
            <th scope="col">Asset</th>
            <th scope="col">Staked Balance</th>
            <th scope="col">Borrowed Balance</th>
            <th scope="col">Wallet Balance</th>
            <th scope="col">Realized TEG Gains</th>
            <th scope="col">Realized TEG Losses</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><img alt ="" src={dai}></img></td>
            <td>{web3.utils.fromWei(props.daiStakingBalance, 'Ether')} DAI</td>
            <td>{web3.utils.fromWei(props.daiBorrowedBalance, 'Ether')} DAI</td>
            <td>{web3.utils.fromWei(props.daiTokenBalance, 'Ether')} DAI</td>
            <td>{web3.utils.fromWei(props.daiEarnedBalance, 'Ether')} TEG</td>
            <td>{web3.utils.fromWei(props.daiLossBalance, 'Ether')} TEG</td>
          </tr>
          <tr>
            <td><img alt="" src={eth}></img></td>
            <td>{web3.utils.fromWei(props.ethStakingBalance, 'Ether')} ETH</td>
            <td>{web3.utils.fromWei(props.ethBorrowedBalance, 'Ether')} ETH</td>
            <td>{web3.utils.fromWei(props.ethTokenBalance, 'Ether')} ETH</td>
            <td>{web3.utils.fromWei(props.ethEarnedBalance, 'Ether')} TEG</td>
            <td>{web3.utils.fromWei(props.ethLossBalance, 'Ether')} TEG</td>
          </tr>
          <tr>
            <td><img alt="" src={usdt}></img></td>
            <td>{web3.utils.fromWei(props.usdtStakingBalance, 'Ether')} USDT</td>
            <td>{web3.utils.fromWei(props.usdtBorrowedBalance, 'Ether')} USDT</td>
            <td>{web3.utils.fromWei(props.usdtTokenBalance, 'Ether')} USDT</td>
            <td>{web3.utils.fromWei(props.usdtEarnedBalance, 'Ether')} TEG</td>
            <td>{web3.utils.fromWei(props.usdtLossBalance, 'Ether')} TEG</td>
          </tr>
        </tbody>
      </table>

      <table className="table table-borderless text-muted text-center">
        <thead>
          <tr>
            <th scope="col">TEG Account Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{web3.utils.fromWei(props.tegTokenBalance, 'Ether')} TEG</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;