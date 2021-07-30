import { React, useState } from 'react'
import './LendItem.css';
import dai from '../../dai.png'
import eth from '../../eth-logo.png'
import usdt from '../../tether.png'
import web3 from 'web3';

function LendItem(props) {

  const [stakedAmount, setStakedAmount] = useState('0');

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  }

  return (
    <div className="form">

      <form className="mb-3">
        <img src={dai} height='32' alt="" />
        <div className="text-muted">
          APY/Earned 100%
        </div>
        <input
          type="text"
          value={stakedAmount}
          onChange={handleChange(setStakedAmount)}
          className="form-control form-control-lg"
          placeholder="0"
          required />
        <button type="submit" className="btn btn-primary btn-block btn-lg"
          onClick={async (event) => {
            event.preventDefault()
            let amount;
            amount = web3.utils.toWei(stakedAmount.toString(), 'Ether')
            await props.stakeTokens(amount)
          }}>
          Lend
        </button>
        <button
          type="submit"
          className="btn btn-danger btn-block btn-lg"
          onClick={async (event) => {
            event.preventDefault()
            let amount;
            amount = web3.utils.toWei(stakedAmount.toString(), 'Ether')
            await props.unstakeTokens(amount)
          }}>
          Unstake
        </button>
        <button
          type="submit"
          className="btn btn-secondary btn-block btn-lg"
          onClick={async (event) => {
            event.preventDefault()
            await props.withdrawYield()
          }}>
          Withdraw
        </button>
      </form>

      <form className="mb-3">
        <img src={eth} height='32' alt="" />
        <div className="text-muted">
          APY/Earned 100%
        </div>
        <input
          type="text"
          value={stakedAmount}
          onChange={handleChange(setStakedAmount)}
          className="form-control form-control-lg"
          placeholder="0"
          required />
        <button type="submit" className="btn btn-primary btn-block btn-lg"
          onClick={async (event) => {
            event.preventDefault()
            let amount;
            amount = web3.utils.toWei(stakedAmount.toString(), 'Ether')
            await props.stakeTokens(amount)
          }}>
          Lend
        </button>
        <button
          type="submit"
          className="btn btn-danger btn-block btn-lg"
          onClick={async (event) => {
            event.preventDefault()
            let amount;
            amount = web3.utils.toWei(stakedAmount.toString(), 'Ether')
            await props.unstakeTokens(amount)
          }}>
          Unstake
        </button>
        <button
          type="submit"
          className="btn btn-secondary btn-block btn-lg"
          onClick={async (event) => {
            event.preventDefault()
            await props.withdrawYield()
          }}>
          Withdraw
        </button>
      </form>

      <form className="mb-3">
        <img src={usdt} height='32' alt="" />
        <div className="text-muted">
          APY/Earned 100%
        </div>
        <input
          type="text"
          value={stakedAmount}
          onChange={handleChange(setStakedAmount)}
          className="form-control form-control-lg"
          placeholder="0"
          required />
        <button type="submit" className="btn btn-primary btn-block btn-lg"
          onClick={async (event) => {
            event.preventDefault()
            let amount;
            amount = web3.utils.toWei(stakedAmount.toString(), 'Ether')
            await props.stakeTokens(amount)
          }}>
          Lend
        </button>
        <button
          type="submit"
          className="btn btn-danger btn-block btn-lg"
          onClick={async (event) => {
            event.preventDefault()
            let amount;
            amount = web3.utils.toWei(stakedAmount.toString(), 'Ether')
            await props.unstakeTokens(amount)
          }}>
          Unstake
        </button>
        <button
          type="submit"
          className="btn btn-secondary btn-block btn-lg"
          onClick={async (event) => {
            event.preventDefault()
            await props.withdrawYield()
          }}>
          Withdraw
        </button>
      </form>

    </div>

  )
}

export default LendItem;