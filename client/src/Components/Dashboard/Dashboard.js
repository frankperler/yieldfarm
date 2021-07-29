import { React, useEffect, useState } from 'react'
import './Dashboard.css';
import web3 from 'web3';

function Dashboard (props) {

  return (

    <table className="table table-borderless text-muted text-center">
      <thead>
        <tr>
          <th scope="col">Staked Balance</th>
          <th scope="col">Realized TEG Gains</th>
          <th scope="col">DAI Account Balance</th>
          <th scope="col">TEG Account Balance</th>
          <th scope="col">Realized TEG Losses</th>
          <th scope="col">Borrowed Balance</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{web3.utils.fromWei(props.stakingBalance, 'Ether')} DAI</td>
          <td>{web3.utils.fromWei(props.earnedBalance, 'Ether')} TEG</td>
          <td>{web3.utils.fromWei(props.daiTokenBalance, 'Ether')} DAI</td>
          <td>{web3.utils.fromWei(props.tegTokenBalance, 'Ether')} TEG</td>
          <td>{web3.utils.fromWei(props.lossBalance, 'Ether')} TEG</td>
          <td>{web3.utils.fromWei(props.borrowedBalance, 'Ether')} DAI</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Dashboard;