import { React, useState, useEffect } from 'react'
import Web3 from 'web3'
import { loadWeb3 } from './Service/Web3Service'
import Navigationbar from './Components/Navbar/Navbar'
import Main from './Components/Main/Main'
import DaiToken from './abis/DaiToken.json'
import EthToken from './abis/EthToken.json'
import UsdtToken from './abis/UsdtToken.json'
import TegToken from './abis/TegToken.json'
import TokenFarm from './abis/TokenFarm.json'

import './App.css';

function App() {

  const [account, setAccount] = useState(null);

  const [daiToken, setDaiToken] = useState({})
  const [daiTokenBalance, setDaiTokenBalance] = useState('0');
  const [daiStakingBalance, setDaiStakingBalance] = useState('0');
  const [daiEarnedBalance, setDaiEarnedBalance] = useState('0');
  const [daiBorrowedBalance, setDaiBorrowedBalance] = useState('0');
  const [daiLossBalance, setDaiLossBalance] = useState('0');

  const [ethToken, setEthToken] = useState({})
  const [ethTokenBalance, setEthTokenBalance] = useState('0');
  const [ethStakingBalance, setEthStakingBalance] = useState('0');
  const [ethEarnedBalance, setEthEarnedBalance] = useState('0');
  const [ethBorrowedBalance, setEthBorrowedBalance] = useState('0');
  const [ethLossBalance, setEthLossBalance] = useState('0');

  const [usdtToken, setUsdtToken] = useState({})
  const [usdtTokenBalance, setUsdtTokenBalance] = useState('0');
  const [usdtStakingBalance, setUsdtStakingBalance] = useState('0');
  const [usdtEarnedBalance, setUsdtEarnedBalance] = useState('0');
  const [usdtBorrowedBalance, setUsdtBorrowedBalance] = useState('0');
  const [usdtLossBalance, setUsdtLossBalance] = useState('0');

  const [tegToken, setTegToken] = useState({})
  const [tegTokenBalance, setTegTokenBalance] = useState('0');

  const [tokenFarm, setTokenFarm] = useState({})



  useEffect(() => {
    loadWeb3()
    loadBlockchainData()
  }, [])

  const loadBlockchainData = async () => {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    const myAccount = accounts[0];

    const networkId = await web3.eth.net.getId()

    //load DaiToken
    const daiTokenData = DaiToken.networks[networkId]
    if (daiTokenData) {
      const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address)
      setDaiToken(daiToken)
      let daiTokenBalance = await daiToken.methods.balanceOf(myAccount).call()
      setDaiTokenBalance(daiTokenBalance.toString())
    } else {
      window.alert('Dai Token contract not deployed to detected network')
    }

    //load EthToken
    const ethTokenData = EthToken.networks[networkId]
    if (ethTokenData) {
      const ethToken = new web3.eth.Contract(EthToken.abi, ethTokenData.address)
      setEthToken(ethToken)
      let ethTokenBalance = await ethToken.methods.balanceOf(myAccount).call()
      setEthTokenBalance(ethTokenBalance.toString())
    } else {
      window.alert('Eth Token contract not deployed to detected network')
    }

    //load UsdtToken
    const usdtTokenData = UsdtToken.networks[networkId]
    if (usdtTokenData) {
      const usdtToken = new web3.eth.Contract(UsdtToken.abi, usdtTokenData.address)
      setUsdtToken(usdtToken)
      let usdtTokenBalance = await usdtToken.methods.balanceOf(myAccount).call()
      setUsdtTokenBalance(usdtTokenBalance.toString())
    } else {
      window.alert('Usdt Token contract not deployed to detected network')
    }

    //load tegToken
    const tegTokenData = TegToken.networks[networkId]
    if (tegTokenData) {
      const tegToken = new web3.eth.Contract(TegToken.abi, tegTokenData.address)
      setTegToken(tegToken)
      let tegTokenBalance = await tegToken.methods.balanceOf(myAccount).call()
      setTegTokenBalance(tegTokenBalance.toString())
    } else {
      window.alert('Teg Token contract not deployed to detected network')
    }

    //load tokenFarm
    const tokenFarmData = TokenFarm.networks[networkId]
    if (tokenFarmData) {
      const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address)
      setTokenFarm(tokenFarm)
      //set staking balances
      let daiStakingBalance = await tokenFarm.methods.stakingBalance(myAccount, "dai").call()
      let ethStakingBalance = await tokenFarm.methods.stakingBalance(myAccount, "eth").call()
      let usdtStakingBalance = await tokenFarm.methods.stakingBalance(myAccount, "usdt").call()
      setDaiStakingBalance(daiStakingBalance.toString())
      setEthStakingBalance(ethStakingBalance.toString())
      setUsdtStakingBalance(usdtStakingBalance.toString())
      //set earned balances
      let daiEarnedBalance = await tokenFarm.methods.earnedBalance(myAccount, "dai").call()
      let ethEarnedBalance = await tokenFarm.methods.earnedBalance(myAccount, "eth").call()
      let usdtEarnedBalance = await tokenFarm.methods.earnedBalance(myAccount, "usdt").call()
      setDaiEarnedBalance(daiEarnedBalance.toString())
      setEthEarnedBalance(ethEarnedBalance.toString())
      setUsdtEarnedBalance(usdtEarnedBalance.toString())
      //set borrowed balances
      let daiBorrowedBalance = await tokenFarm.methods.borrowedBalance(myAccount, "dai").call()
      let ethBorrowedBalance = await tokenFarm.methods.borrowedBalance(myAccount, "eth").call()
      let usdtBorrowedBalance = await tokenFarm.methods.borrowedBalance(myAccount, "usdt").call()
      setDaiBorrowedBalance(daiBorrowedBalance.toString())
      setEthBorrowedBalance(ethBorrowedBalance.toString())
      setUsdtBorrowedBalance(usdtBorrowedBalance.toString())
      //set borrowed balances
      let daiLossBalance = await tokenFarm.methods.LossBalance(myAccount, "dai").call()
      let ethLossBalance = await tokenFarm.methods.LossBalance(myAccount, "eth").call()
      let usdtLossBalance = await tokenFarm.methods.LossBalance(myAccount, "usdt").call()
      setDaiLossBalance(daiLossBalance.toString())
      setEthLossBalance(ethLossBalance.toString())
      setUsdtLossBalance(usdtLossBalance.toString())

      // start event listeners

      tokenFarm.events.Stake({}, (error, data) => {
        if (error) {
          console.log(error)
        } else {
          setStakingBalance(data.returnValues.stakingBal)
          setEarnedBalance(data.returnValues.intBal)
          setTegTokenBalance(data.returnValues.tegBal)
          setDaiTokenBalance(data.returnValues.daiBal)
        }
      })

      tokenFarm.events.Unstake({}, (error, data) => {
        if (error) {
          console.log(error)
        } else {
          setStakingBalance(data.returnValues.stakingBal)
          setEarnedBalance(data.returnValues.intBal)
          setTegTokenBalance(data.returnValues.tegBal)
          setDaiTokenBalance(data.returnValues.daiBal)
        }
      })

      tokenFarm.events.YieldWithdraw({}, (error, data) => {
        if (error) {
          console.log(error)
        } else {
          setStakingBalance(data.returnValues.stakingBal)
          setEarnedBalance(data.returnValues.intBal)
          setBorrowedBalance(data.returnValues.borrowBal)
          setLossBalance(data.returnValues.lossBal)
          setTegTokenBalance(data.returnValues.tegBal)
          setDaiTokenBalance(data.returnValues.daiBal)
        }
      })

      tokenFarm.events.Borrow({}, (error, data) => {
        if (error) {
          console.log(error)
        } else {
          setBorrowedBalance(data.returnValues.borrowBal)
          setLossBalance(data.returnValues.lossBal)
          setTegTokenBalance(data.returnValues.tegBal)
          setDaiTokenBalance(data.returnValues.daiBal)
        }
      })

      tokenFarm.events.Repay({}, (error, data) => {
        if (error) {
          console.log(error)
        } else {
          setBorrowedBalance(data.returnValues.borrowBal)
          setLossBalance(data.returnValues.lossBal)
          setTegTokenBalance(data.returnValues.tegBal)
          setDaiTokenBalance(data.returnValues.daiBal)
        }
      })

    } else {
      window.alert('TokenFarm contract not deployed to detected network')
    }

    setAccount(myAccount)
  }

  const stakeTokens = (amount, token) => {
    if (token === 'dai') {
      daiToken.methods.approve(tokenFarm._address, amount).send({ from: account }).on('transactionHash', (hash) => {
        tokenFarm.methods.stakeTokens(amount, token).send({ from: account })
      })
    }
  }

  const unstakeTokens = (amount) => {
    tokenFarm.methods.unstakeTokens(amount).send({ from: account })
  }

  const withdrawYield = () => {
    tokenFarm.methods.withdrawYield().send({ from: account })
  }

  const borrowTokens = (amount) => {
    tokenFarm.methods.borrowTokens(amount).send({ from: account })
  }

  const repayTokens = (amount) => {
    daiToken.methods.approve(tokenFarm._address, amount).send({ from: account }).on('transactionHash', (hash) => {
      tokenFarm.methods.repayTokens(amount).send({ from: account })
    })
  }

  return (account ? <div className="body">
    <Navigationbar account={account} />
    <Main
      daiTokenBalance={daiTokenBalance}
      tegTokenBalance={tegTokenBalance}
      stakingBalance={stakingBalance}
      earnedBalance={earnedBalance}
      borrowedBalance={borrowedBalance}
      lossBalance={lossBalance}

      withdrawYield={withdrawYield}
      stakeTokens={stakeTokens}
      unstakeTokens={unstakeTokens}
      borrowTokens={borrowTokens}
      repayTokens={repayTokens}
    />
  </div> : <p>Loading...</p>);

}

export default App;
