import { React, useEffect, useState } from 'react'
import './Dashboard.css';
import web3 from 'web3';

function Dashboard (props) {

  return (

    <table className="table table-borderless text-muted text-center">
      <thead>
        <tr>
          <th scope="col">Staked Balance</th>
          <th scope="col">Net Realized TEG Earnings</th>
          <th scope="col">Withdrawn TEG Balance</th>
          <th scope="col">Borrowed Balance</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{web3.utils.fromWei(props.stakingBalance, 'Ether')} DAI</td>
          <td>{web3.utils.fromWei(props.tegBalance, 'Ether')} TEG</td>
          <td>{web3.utils.fromWei(props.tegTokenBalance, 'Ether')} TEG</td>
          <td>0 DAI</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Dashboard;