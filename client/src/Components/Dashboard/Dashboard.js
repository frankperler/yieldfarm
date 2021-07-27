import { React } from 'react'
import './Dashboard.css';
import web3 from 'web3';

function Dashboard (props) {
  return (

    <table className="table table-borderless text-muted text-center">
      <thead>
        <tr>
          <th scope="col">Staking Balance</th>
          <th scope="col">Reward Balance</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{web3.utils.fromWei(props.stakingBalance, 'Ether')} mDAI</td>
          <td>{web3.utils.fromWei(props.tegTokenBalance, 'Ether')} TEG</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Dashboard;