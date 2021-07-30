import { React, useState } from 'react'
import './BorrowItem.css';
import dai from '../../dai.png'
import eth from '../../eth-logo.png'
import usdt from '../../tether.png'
import web3 from 'web3';

function BorrowItem(props) {

  const [borrowedAmount, setBorrowedAmount] = useState('0');

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
            value={borrowedAmount}
            onChange={handleChange(setBorrowedAmount)}
            className="form-control form-control-lg"
            placeholder="0"
            required />
          <button type="submit" className="btn btn-primary btn-block btn-lg"
            onClick={async (event) => {
              event.preventDefault()
              let amount;
              amount = web3.utils.toWei(borrowedAmount.toString(), 'Ether')
              await props.borrowTokens(amount)
            }}>
            Borrow
          </button>
          <button
            type="submit"
            className="btn btn-danger btn-block btn-lg"
            onClick={async (event) => {
              event.preventDefault()
              let amount;
              amount = web3.utils.toWei(borrowedAmount.toString(), 'Ether')
              console.log(amount)
              await props.repayTokens(amount)
            }}>
            Repay
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
          APY/Accrued 110%
          </div>
          <input
            type="text"
            value={borrowedAmount}
            onChange={handleChange(setBorrowedAmount)}
            className="form-control form-control-lg"
            placeholder="0"
            required />
          <button type="submit" className="btn btn-primary btn-block btn-lg"
            onClick={async (event) => {
              event.preventDefault()
              let amount;
              amount = web3.utils.toWei(borrowedAmount.toString(), 'Ether')
              await props.borrowTokens(amount)
            }}>
            Borrow
          </button>
          <button
            type="submit"
            className="btn btn-danger btn-block btn-lg"
            onClick={async (event) => {
              event.preventDefault()
              let amount;
              amount = web3.utils.toWei(borrowedAmount.toString(), 'Ether')
              console.log(amount)
              await props.repayTokens(amount)
            }}>
            Repay
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
          APY/Accrued 110%
          </div>
          <input
            type="text"
            value={borrowedAmount}
            onChange={handleChange(setBorrowedAmount)}
            className="form-control form-control-lg"
            placeholder="0"
            required />
          <button type="submit" className="btn btn-primary btn-block btn-lg"
            onClick={async (event) => {
              event.preventDefault()
              let amount;
              amount = web3.utils.toWei(borrowedAmount.toString(), 'Ether')
              await props.borrowTokens(amount)
            }}>
            Borrow
          </button>
          <button
            type="submit"
            className="btn btn-danger btn-block btn-lg"
            onClick={async (event) => {
              event.preventDefault()
              let amount;
              amount = web3.utils.toWei(borrowedAmount.toString(), 'Ether')
              console.log(amount)
              await props.repayTokens(amount)
            }}>
            Repay
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

export default BorrowItem;