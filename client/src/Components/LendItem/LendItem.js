import { React, useState } from 'react'
import './LendItem.css';
import dai from '../../dai.png'
import eth from '../../eth-logo.png'
import usdt from '../../tether.png'
import web3 from 'web3';

function LendItem(props) {

  const [daiLendAmount, setDaiLendAmount] = useState('0');
  const [ethLendAmount, setEthLendAmount] = useState('0');
  const [usdtLendAmount, setUsdtLendAmount] = useState('0');

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
          value={daiLendAmount}
          onChange={handleChange(setDaiLendAmount)}
          className="form-control form-control-lg"
          placeholder="0"
          required />
        <button type="submit" className="btn btn-primary btn-block btn-lg"
          onClick={async (event) => {
            event.preventDefault()
            let amount;
            amount = web3.utils.toWei(daiLendAmount.toString(), 'Ether')
            await props.stakeTokens(amount, "dai")
          }}>
          Lend
        </button>
        <button
          type="submit"
          className="btn btn-danger btn-block btn-lg"
          onClick={async (event) => {
            event.preventDefault()
            let amount;
            amount = web3.utils.toWei(daiLendAmount.toString(), 'Ether')
            await props.unstakeTokens(amount, "dai")
          }}>
          Unstake
        </button>
        <button
          type="submit"
          className="btn btn-secondary btn-block btn-lg"
          onClick={async (event) => {
            event.preventDefault()
            await props.withdrawYield("dai")
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
          value={ethLendAmount}
          onChange={handleChange(setEthLendAmount)}
          className="form-control form-control-lg"
          placeholder="0"
          required />
        <button type="submit" className="btn btn-primary btn-block btn-lg"
          onClick={async (event) => {
            event.preventDefault()
            let amount;
            amount = web3.utils.toWei(ethLendAmount.toString(), 'Ether')
            await props.stakeTokens(amount, "eth")
          }}>
          Lend
        </button>
        <button
          type="submit"
          className="btn btn-danger btn-block btn-lg"
          onClick={async (event) => {
            event.preventDefault()
            let amount;
            amount = web3.utils.toWei(ethLendAmount.toString(), 'Ether')
            await props.unstakeTokens(amount, "eth")
          }}>
          Unstake
        </button>
        <button
          type="submit"
          className="btn btn-secondary btn-block btn-lg"
          onClick={async (event) => {
            event.preventDefault()
            await props.withdrawYield("eth")
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
          value={usdtLendAmount}
          onChange={handleChange(setUsdtLendAmount)}
          className="form-control form-control-lg"
          placeholder="0"
          required />
        <button type="submit" className="btn btn-primary btn-block btn-lg"
          onClick={async (event) => {
            event.preventDefault()
            let amount;
            amount = web3.utils.toWei(usdtLendAmount.toString(), 'Ether')
            await props.stakeTokens(amount, "usdt")
          }}>
          Lend
        </button>
        <button
          type="submit"
          className="btn btn-danger btn-block btn-lg"
          onClick={async (event) => {
            event.preventDefault()
            let amount;
            amount = web3.utils.toWei(usdtLendAmount.toString(), 'Ether')
            await props.unstakeTokens(amount, "usdt")
          }}>
          Unstake
        </button>
        <button
          type="submit"
          className="btn btn-secondary btn-block btn-lg"
          onClick={async (event) => {
            event.preventDefault()
            await props.withdrawYield("usdt")
          }}>
          Withdraw
        </button>
      </form>

    </div>

  )
}

export default LendItem;