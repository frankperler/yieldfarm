import { React, useState } from 'react'
import './BorrowItem.css';
import dai from '../../dai.png'
import web3 from 'web3';

function BorrowItem(props) {

  const [stakedAmount, setStakedAmount] = useState('0');

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  }

  return (
    <div className="form">
      <form className="mb-3" onSubmit={(event) => {
        event.preventDefault()
        // let amount;
        // amount = web3.utils.toWei(stakedAmount.toString(), 'Ether')
        // props.stakeTokens(amount)
      }}>
        <div className="input-group-text">
          <img src={dai} height='32' alt="" />
          &nbsp;&nbsp;&nbsp; DAI
        </div>
        <div className="text-muted">
          APY/Accrued 110%
        </div>
        <input
          type="text"
          value={stakedAmount}
          onChange={handleChange(setStakedAmount)}
          className="form-control form-control-lg"
          placeholder="0"
          required />
        <button type="submit" className="btn btn-primary btn-block btn-lg">Borrow</button>
        <button
          type="submit"
          className="btn btn-secondary btn-block btn-lg"
          onClick={(event) => {
            event.preventDefault()
            // props.unstakeTokens()
          }}>
          Repay
        </button>
      </form>
    </div>


  )
}

export default BorrowItem;