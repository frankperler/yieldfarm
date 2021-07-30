import { React, useEffect, useState } from 'react'
import './Dashboard.css';
import dai from '../../dai.png'
import eth from '../../eth-logo.png'
import usdt from '../../tether.png'
import web3 from 'web3';
import farmer from '../../randymarsh.png'

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
            <td><img src={dai}></img></td>
            <td>{web3.utils.fromWei(props.stakingBalance, 'Ether')} DAI</td>
            <td>{web3.utils.fromWei(props.borrowedBalance, 'Ether')} DAI</td>
            <td>{web3.utils.fromWei(props.daiTokenBalance, 'Ether')} DAI</td>
            <td>{web3.utils.fromWei(props.earnedBalance, 'Ether')} TEG</td>
            <td>{web3.utils.fromWei(props.lossBalance, 'Ether')} TEG</td>
          </tr>
          <tr>
            <td><img src={eth}></img></td>
            <td>{web3.utils.fromWei(props.stakingBalance, 'Ether')} ETH</td>
            <td>{web3.utils.fromWei(props.borrowedBalance, 'Ether')} ETH</td>
            <td>{web3.utils.fromWei(props.daiTokenBalance, 'Ether')} ETH</td>
            <td>{web3.utils.fromWei(props.earnedBalance, 'Ether')} TEG</td>
            <td>{web3.utils.fromWei(props.lossBalance, 'Ether')} TEG</td>
          </tr>
          <tr>
            <td><img src={usdt}></img></td>
            <td>{web3.utils.fromWei(props.stakingBalance, 'Ether')} USDT</td>
            <td>{web3.utils.fromWei(props.borrowedBalance, 'Ether')} USDT</td>
            <td>{web3.utils.fromWei(props.daiTokenBalance, 'Ether')} USDT</td>
            <td>{web3.utils.fromWei(props.earnedBalance, 'Ether')} TEG</td>
            <td>{web3.utils.fromWei(props.lossBalance, 'Ether')} TEG</td>
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