import { React, useState, useEffect } from 'react'
import Web3 from 'web3'
import Navigationbar from './Components/Navbar/Navbar'
import Main from './Components/Main/Main'
import DaiToken from './abis/DaiToken.json'
import TegToken from './abis/TegToken.json'
import TokenFarm from './abis/TokenFarm.json'
import './App.css';

function App() {

  const [account, setAccount] = useState(null);
  const [daiToken, setDaiToken] = useState({})
  const [tegToken, setTegToken] = useState({})
  const [tokenFarm, setTokenFarm] = useState({})
  const [daiTokenBalance, setDaiTokenBalance] = useState('0');
  const [tegTokenBalance, setTegTokenBalance] = useState('0');
  const [stakingBalance, setStakingBalance] = useState('0');
  const [tegBalance, setTegBalance] = useState('0');
  // const [loading, setLoading] = useState(true);

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
      // daiToken.events.Transfer({}, (error, data) => {
      //   if (error) {
      //     console.log(error)
      //   } else {
      //     console.log(data)
      //     // setDaiTokenBalance(daiToken.methods.balanceOf(data.returnValues._to).call())
      //   }
      // })
    } else {
      window.alert('Dai Token contract not deployed to detected network')
    }

    //load tegToken
    const tegTokenData = TegToken.networks[networkId]
    if (tegTokenData) {
      const tegToken = new web3.eth.Contract(TegToken.abi, tegTokenData.address)
      setTegToken(tegToken)
      let tegTokenBalance = await tegToken.methods.balanceOf(myAccount).call()
      setTegTokenBalance(tegTokenBalance.toString())
      // tegToken.events.Transfer({}, (error, data) => {
      //   if (error) {
      //     console.log(error)
      //   } else {
      //     console.log(data)
      //     // setTegTokenBalance(tegToken.methods.balanceOf(data.returnValues._to).call())
      //   }
      // })
    } else {
      window.alert('Teg Token contract not deployed to detected network')
    }

    //load tokenFarm
    const tokenFarmData = TokenFarm.networks[networkId]
    if (tokenFarmData) {
      const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address)
      setTokenFarm(tokenFarm)
      let stakingBalance = await tokenFarm.methods.stakingBalance(myAccount).call()
      setStakingBalance(stakingBalance.toString())
      let tegBalance = await tokenFarm.methods.tegBalance(myAccount).call()
      setTegBalance(tegBalance.toString())
      // start event listeners
      tokenFarm.events.Stake({}, (error, data) => {
        if (error) {
          console.log(error)
        } else {
          setStakingBalance(data.returnValues.stakingBal)
          setTegBalance(data.returnValues.intBal)
          setTegTokenBalance(data.returnValues.tegBal)
          setDaiTokenBalance(data.returnValues.daiBal)
        }
      })
    
      tokenFarm.events.Unstake({}, (error, data) => {
        if (error) {
          console.log(error)
        } else {
          setStakingBalance(data.returnValues.stakingBal)
          setTegBalance(data.returnValues.intBal)
          setTegTokenBalance(data.returnValues.tegBal)
          setDaiTokenBalance(data.returnValues.daiBal)
        }
      })
    
      tokenFarm.events.YieldWithdraw({}, (error, data) => {
        if (error) {
          console.log(error)
        } else {
          setStakingBalance(data.returnValues.stakingBal)
          setTegBalance(data.returnValues.intBal)
          setTegTokenBalance(data.returnValues.tegBal)
          setDaiTokenBalance(data.returnValues.daiBal)
        }
      })

    } else {
      window.alert('TokenFarm contract not deployed to detected network')
    }



    setAccount(myAccount)
  }

  //load web3
  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert('Non-Ethereum browser detected. You should consider using Metamask!')
    }
  }



  const stakeTokens = (amount) => {
    daiToken.methods.approve(tokenFarm._address, amount).send({ from: account }).on('transactionHash', (hash) => {
      tokenFarm.methods.stakeTokens(amount).send({ from: account })
    })
  }

  const unstakeTokens = (amount) => {
    tokenFarm.methods.unstakeTokens(amount).send({ from: account })
  }

  const withdrawYield = () => {
    tokenFarm.methods.withdrawYield().send({ from: account })
    
  }

  // const calculateYieldTotal = (user) => {
  //   tokenFarm.methods.calculateYieldTotal(user).call().on('transactionHash', (hash) => {
  //   })
  // }

  return (account ? <div className="body">
    <Navigationbar account={account} />
    <Main
      daiTokenBalance={daiTokenBalance}
      tegTokenBalance={tegTokenBalance}
      stakingBalance={stakingBalance}
      tegBalance={tegBalance}
      setStakingBalance={setStakingBalance}
      setTegBalance={setTegBalance}
      stakeTokens={stakeTokens}
      unstakeTokens={unstakeTokens}
      withdrawYield={withdrawYield}
    />
  </div> : <p>Loading...</p>);

}

export default App;
