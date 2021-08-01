import { React, useState } from 'react'
import './ExchangeItems.css';
import dai from '../../dai.png'
import eth from '../../eth-logo.png'
import usdt from '../../tether.png'
import web3 from 'web3';

function ExchangeItems(props) {

  const [daiAmount, setDaiAmount] = useState('0');
  const [ethAmount, setEthAmount] = useState('0');
  const [usdtAmount, setUsdtAmount] = useState('0');

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  }

  return (
    <div className="form">

      <form>
        <img src={dai} height='32' alt="" />
        <input
          type="text"
          value={daiAmount}
          onChange={handleChange(setDaiAmount)}
          className="form-control form-control-lg"
          placeholder="0"
          required />
        <button type="submit" className="btn btn-primary btn-block btn-lg"
          onClick={async (event) => {
            event.preventDefault()
            let amount;
            amount = web3.utils.toWei(daiAmount.toString(), 'Ether')
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
            amount = web3.utils.toWei(daiAmount.toString(), 'Ether')
            await props.unstakeTokens(amount, "dai")
          }}>
          Unstake
        </button>
        <button type="submit" className="btn btn-primary btn-block btn-lg"
            onClick={async (event) => {
              event.preventDefault()
              let amount;
              amount = web3.utils.toWei(daiAmount.toString(), 'Ether')
              await props.borrowTokens(amount, "dai")
            }}>
            Borrow
          </button>
          <button
            type="submit"
            className="btn btn-danger btn-block btn-lg"
            onClick={async (event) => {
              event.preventDefault()
              let amount;
              amount = web3.utils.toWei(daiAmount.toString(), 'Ether')
              await props.repayTokens(amount, "dai")
            }}>
            Repay
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
        <input
          type="text"
          value={ethAmount}
          onChange={handleChange(setEthAmount)}
          className="form-control form-control-lg"
          placeholder="0"
          required />
        <button type="submit" className="btn btn-primary btn-block btn-lg"
          onClick={async (event) => {
            event.preventDefault()
            let amount;
            amount = web3.utils.toWei(ethAmount.toString(), 'Ether')
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
            amount = web3.utils.toWei(ethAmount.toString(), 'Ether')
            await props.unstakeTokens(amount, "eth")
          }}>
          Unstake
        </button>
        <button type="submit" className="btn btn-primary btn-block btn-lg"
            onClick={async (event) => {
              event.preventDefault()
              let amount;
              amount = web3.utils.toWei(ethAmount.toString(), 'Ether')
              await props.borrowTokens(amount, "eth")
            }}>
            Borrow
          </button>
          <button
            type="submit"
            className="btn btn-danger btn-block btn-lg"
            onClick={async (event) => {
              event.preventDefault()
              let amount;
              amount = web3.utils.toWei(ethAmount.toString(), 'Ether')
              await props.repayTokens(amount, "eth")
            }}>
            Repay
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
        <input
          type="text"
          value={usdtAmount}
          onChange={handleChange(setUsdtAmount)}
          className="form-control form-control-lg"
          placeholder="0"
          required />
        <button type="submit" className="btn btn-primary btn-block btn-lg"
          onClick={async (event) => {
            event.preventDefault()
            let amount;
            amount = web3.utils.toWei(usdtAmount.toString(), 'Ether')
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
            amount = web3.utils.toWei(usdtAmount.toString(), 'Ether')
            await props.unstakeTokens(amount, "usdt")
          }}>
          Unstake
        </button>
        <button type="submit" className="btn btn-primary btn-block btn-lg"
            onClick={async (event) => {
              event.preventDefault()
              let amount;
              amount = web3.utils.toWei(usdtAmount.toString(), 'Ether')
              await props.borrowTokens(amount, "usdt")
            }}>
            Borrow
          </button>
          <button
            type="submit"
            className="btn btn-danger btn-block btn-lg"
            onClick={async (event) => {
              event.preventDefault()
              let amount;
              amount = web3.utils.toWei(usdtAmount.toString(), 'Ether')
              await props.repayTokens(amount, "usdt")
            }}>
            Repay
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

export default ExchangeItems;