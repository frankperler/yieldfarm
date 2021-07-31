import { React, useState } from 'react'
import './BorrowItem.css';
import dai from '../../dai.png'
import eth from '../../eth-logo.png'
import usdt from '../../tether.png'
import web3 from 'web3';

function BorrowItem(props) {

  const [daiBorrowedAmount, setDaiBorrowedAmount] = useState('0');
  const [ethBorrowedAmount, setEthBorrowedAmount] = useState('0');
  const [usdtBorrowedAmount, setUsdtBorrowedAmount] = useState('0');

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  }

  return (

      <div className="form">
        <form className="mb-3">
            <img src={dai} height='32' alt="" />
          <div className="text-muted">
          APY/Accrued 110%
          </div>
          <input
            type="text"
            value={daiBorrowedAmount}
            onChange={handleChange(setDaiBorrowedAmount)}
            className="form-control form-control-lg"
            placeholder="0"
            required />
          <button type="submit" className="btn btn-primary btn-block btn-lg"
            onClick={async (event) => {
              event.preventDefault()
              let amount;
              amount = web3.utils.toWei(daiBorrowedAmount.toString(), 'Ether')
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
              amount = web3.utils.toWei(daiBorrowedAmount.toString(), 'Ether')
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
          <div className="text-muted">
          APY/Accrued 110%
          </div>
          <input
            type="text"
            value={ethBorrowedAmount}
            onChange={handleChange(setEthBorrowedAmount)}
            className="form-control form-control-lg"
            placeholder="0"
            required />
          <button type="submit" className="btn btn-primary btn-block btn-lg"
            onClick={async (event) => {
              event.preventDefault()
              let amount;
              amount = web3.utils.toWei(ethBorrowedAmount.toString(), 'Ether')
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
              amount = web3.utils.toWei(ethBorrowedAmount.toString(), 'Ether')
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
          <div className="text-muted">
          APY/Accrued 110%
          </div>
          <input
            type="text"
            value={usdtBorrowedAmount}
            onChange={handleChange(setUsdtBorrowedAmount)}
            className="form-control form-control-lg"
            placeholder="0"
            required />
          <button type="submit" className="btn btn-primary btn-block btn-lg"
            onClick={async (event) => {
              event.preventDefault()
              let amount;
              amount = web3.utils.toWei(usdtBorrowedAmount.toString(), 'Ether')
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
              amount = web3.utils.toWei(usdtBorrowedAmount.toString(), 'Ether')
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

export default BorrowItem;