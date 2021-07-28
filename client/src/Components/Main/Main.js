import { React, useState } from 'react'
import Dashboard from '../Dashboard/Dashboard'
import ExchangeBoard from '../ExchangeBoard/ExchangeBoard'
import './Main.css';
import web3 from 'web3'



function Main(props) {



  return (
    <div id="content" className="mt-3">

      <Dashboard stakingBalance={props.stakingBalance} tegTokenBalance={props.tegTokenBalance} tegBalance={props.tegBalance} />

      {/* <div className="card mb-4">

      <div className="card-body">

        <form className="mb-3" onSubmit={(event) => {
            event.preventDefault()
            let amount;
            amount = web3.utils.toWei(stakedAmount.toString(), 'Ether')
            props.stakeTokens(amount)
          }}>
          <div>
            <label className="float-left"><b></b></label>
            <span className="float-right text-muted">
              Balance: {web3.utils.fromWei(props.daiTokenBalance, 'Ether')}
            </span>
          </div>
          <div className="input-group mb-4">
            <input
              type="text"
              value={stakedAmount}
              onChange={handleChange(setStakedAmount)} // to check
              className="form-control form-control-lg"
              placeholder="0"
              required />
            <div className="input-group-append">
              <div className="input-group-text">
                <img src={dai} height='32' alt=""/>
                &nbsp;&nbsp;&nbsp; mDAI
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block btn-lg">Stake</button>
        </form>
        <button
          type="submit"
          className="btn btn-secondary btn-block btn-lg"
          onClick={(event) => {
            event.preventDefault()
            props.unstakeTokens()
          }}>
            Unstake
        </button>
      </div>
    </div> */}

      <ExchangeBoard
        unstakeTokens={props.unstakeTokens}
        stakeTokens={props.stakeTokens}
        withdrawYield={props.withdrawYield}
        daiTokenBalance={props.daiTokenBalance}
        />
    </div>
  );
}

export default Main;
