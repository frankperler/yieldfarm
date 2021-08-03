import { React, useState, useEffect, useReducer, createContext } from 'react'
import { ThemeProvider, createTheme } from '@material-ui/core'
import { loadWeb3 } from '../../Service/Web3Service'
import { reducers, initialState } from '../../Reducers'
import Navigationbar from '../Navbar/Navbar'
import Main from '../Main/Main'

import DaiToken from '../../abis/DaiToken.json'
import EthToken from '../../abis/EthToken.json'
import UsdtToken from '../../abis/UsdtToken.json'
import TegToken from '../../abis/TegToken.json'
import TokenFarm from '../../abis/TokenFarm.json'

import './MarketPage.css';

export const MarketPageContext = createContext(initialState);

function MarketPage(props) {

  const [account, setAccount] = useState(null);

  const [daiToken, setDaiToken] = useState({})
  const [ethToken, setEthToken] = useState({})
  const [usdtToken, setUsdtToken] = useState({})
  const [tegToken, setTegToken] = useState({})
  const [tokenFarm, setTokenFarm] = useState({})

  const [tegTokenBalance, setTegTokenBalance] = useState('0');

  const [state, dispatch] = useReducer(reducers, initialState)

  useEffect(() => {
    loadWeb3()
    loadBlockchainData()
  }, [])

  const loadBlockchainData = async () => {
    const web3 = window.web3
    let myAccount = props.userAddr

    const networkId = await web3.eth.net.getId()
    //load Tokens and TokenFarm
    const daiTokenData = DaiToken.networks[networkId]
    const ethTokenData = EthToken.networks[networkId]
    const usdtTokenData = UsdtToken.networks[networkId]
    const tegTokenData = TegToken.networks[networkId]

    if (daiTokenData && ethTokenData && usdtTokenData && tegTokenData) {
      const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address)
      setDaiToken(daiToken)
      let daiTokenBalance = await daiToken.methods.balanceOf(myAccount).call()

      const ethToken = new web3.eth.Contract(EthToken.abi, ethTokenData.address)
      setEthToken(ethToken)
      let ethTokenBalance = await ethToken.methods.balanceOf(myAccount).call()

      const usdtToken = new web3.eth.Contract(UsdtToken.abi, usdtTokenData.address)
      setUsdtToken(usdtToken)
      let usdtTokenBalance = await usdtToken.methods.balanceOf(myAccount).call()

      const tegToken = new web3.eth.Contract(TegToken.abi, tegTokenData.address)
      setTegToken(tegToken)
      let tegTokenBalance = await tegToken.methods.balanceOf(myAccount).call()
      setTegTokenBalance(tegTokenBalance.toString())

      const tokenFarmData = TokenFarm.networks[networkId]
      const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address)
      setTokenFarm(tokenFarm)
      //set staking balances
      let daiStakingBalance = await tokenFarm.methods.stakingBalance(myAccount, "dai").call()
      let ethStakingBalance = await tokenFarm.methods.stakingBalance(myAccount, "eth").call()
      let usdtStakingBalance = await tokenFarm.methods.stakingBalance(myAccount, "usdt").call()

      //set earned balances
      let daiEarnedBalance = await tokenFarm.methods.earnedBalance(myAccount, "dai").call()
      let ethEarnedBalance = await tokenFarm.methods.earnedBalance(myAccount, "eth").call()
      let usdtEarnedBalance = await tokenFarm.methods.earnedBalance(myAccount, "usdt").call()

      //set borrowed balances
      let daiBorrowedBalance = await tokenFarm.methods.borrowedBalance(myAccount, "dai").call()
      let ethBorrowedBalance = await tokenFarm.methods.borrowedBalance(myAccount, "eth").call()
      let usdtBorrowedBalance = await tokenFarm.methods.borrowedBalance(myAccount, "usdt").call()

      //set borrowed balances
      let daiLossBalance = await tokenFarm.methods.lossBalance(myAccount, "dai").call()
      let ethLossBalance = await tokenFarm.methods.lossBalance(myAccount, "eth").call()
      let usdtLossBalance = await tokenFarm.methods.lossBalance(myAccount, "usdt").call()


      tokenFarm.events.Stake({}, (error, data) => {
        if (error) {
          console.log(error)
        } else {
          if (data.returnValues.tok === "dai") {
            setTegTokenBalance(data.returnValues.tegBal)
            dispatch({ type: 'stake-dai', data })
          } else if (data.returnValues.tok === "eth") {
            setTegTokenBalance(data.returnValues.tegBal)
            dispatch({ type: 'stake-eth', data })
          } else {
            setTegTokenBalance(data.returnValues.tegBal)
            dispatch({ type: 'stake-usdt', data })
          }
        }
      })

      tokenFarm.events.Unstake({}, (error, data) => {
        if (error) {
          console.log(error)
        } else {
          if (data.returnValues.tok === "dai") {
            setTegTokenBalance(data.returnValues.tegBal)
            dispatch({ type: 'stake-dai', data })
          } else if (data.returnValues.tok === "eth") {
            setTegTokenBalance(data.returnValues.tegBal)
            dispatch({ type: 'stake-eth', data })
          } else {
            setTegTokenBalance(data.returnValues.tegBal)
            dispatch({ type: 'stake-usdt', data })
          }
        }
      })

      tokenFarm.events.YieldWithdraw({}, (error, data) => {
        if (error) {
          console.log(error)
        } else {
          if (data.returnValues.tok === "dai") {
            setTegTokenBalance(data.returnValues.tegBal)
            dispatch({ type: 'withdraw-dai', data })
          } else if (data.returnValues.tok === "eth") {
            setTegTokenBalance(data.returnValues.tegBal)
            dispatch({ type: 'withdraw-eth', data })
          } else {
            setTegTokenBalance(data.returnValues.tegBal)
            dispatch({ type: 'withdraw-usdt', data })
          }
        }
      })

      tokenFarm.events.Borrow({}, (error, data) => {
        if (error) {
          console.log(error)
        } else {
          if (data.returnValues.tok === "dai") {
            setTegTokenBalance(data.returnValues.tegBal)
            dispatch({ type: 'borrow-dai', data })
          } else if (data.returnValues.tok === "eth") {
            setTegTokenBalance(data.returnValues.tegBal)
            dispatch({ type: 'borrow-eth', data })
          } else {
            setTegTokenBalance(data.returnValues.tegBal)
            dispatch({ type: 'borrow-usdt', data })
          }
        }
      })

      tokenFarm.events.Repay({}, (error, data) => {
        if (error) {
          console.log(error)
        } else {
          if (data.returnValues.tok === "dai") {
            setTegTokenBalance(data.returnValues.tegBal)
            dispatch({ type: 'borrow-dai', data })
          } else if (data.returnValues.tok === "eth") {
            setTegTokenBalance(data.returnValues.tegBal)
            dispatch({ type: 'borrow-eth', data })
          } else {
            setTegTokenBalance(data.returnValues.tegBal)
            dispatch({ type: 'borrow-usdt', data })
          }
        }
      })

      dispatch({
        type: 'update-all',
        daiTokenBalance,
        daiStakingBalance,
        daiEarnedBalance,
        daiBorrowedBalance,
        daiLossBalance,
        ethTokenBalance,
        ethStakingBalance,
        ethEarnedBalance,
        ethBorrowedBalance,
        ethLossBalance,
        usdtTokenBalance,
        usdtStakingBalance,
        usdtEarnedBalance,
        usdtBorrowedBalance,
        usdtLossBalance
      })
      setAccount(myAccount)
    } else {
      window.alert('DaiToken, EthToken, UsdtToken and TokenFarm contracts not deployed to detected network')
    }
  }

  const stakeTokens = (amount, token) => {
    if (token === 'dai') {
      daiToken.methods.approve(tokenFarm._address, amount).send({ from: account }).on('transactionHash', (hash) => {
        tokenFarm.methods.stakeTokens(amount, token).send({ from: account })
      })
    } else if (token === 'eth') {
      ethToken.methods.approve(tokenFarm._address, amount).send({ from: account }).on('transactionHash', (hash) => {
        tokenFarm.methods.stakeTokens(amount, token).send({ from: account })
      })
    } else {
      usdtToken.methods.approve(tokenFarm._address, amount).send({ from: account }).on('transactionHash', (hash) => {
        tokenFarm.methods.stakeTokens(amount, token).send({ from: account })
      })
    }
  }

  const unstakeTokens = (amount, token) => {
    tokenFarm.methods.unstakeTokens(amount, token).send({ from: account })
  }

  const withdrawYield = (token) => {
    tokenFarm.methods.withdrawYield(token).send({ from: account })
  }

  const borrowTokens = (amount, token) => {
    tokenFarm.methods.borrowTokens(amount, token).send({ from: account })
  }

  const repayTokens = (amount, token) => {
    if (token === 'dai') {
      daiToken.methods.approve(tokenFarm._address, amount).send({ from: account }).on('transactionHash', (hash) => {
        tokenFarm.methods.repayTokens(amount, token).send({ from: account })
      })
    } else if (token === 'eth') {
      ethToken.methods.approve(tokenFarm._address, amount).send({ from: account }).on('transactionHash', (hash) => {
        tokenFarm.methods.repayTokens(amount, token).send({ from: account })
      })
    } else {
      usdtToken.methods.approve(tokenFarm._address, amount).send({ from: account }).on('transactionHash', (hash) => {
        tokenFarm.methods.repayTokens(amount, token).send({ from: account })
      })
    }
  }

  const theme = createTheme({
    palette: {
      type: "dark",
      primary: {
        light: '#cfcfcf',
        main: '#9e9e9e',
        dark: '#707070',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff6f60',
        main: '#e53935',
        dark: '#ab000d',
        contrastText: '#000',
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      {props.userAddr && (
        <div className="body">
          <Navigationbar account={account} />
          <MarketPageContext.Provider value={{ state: state, dispatch: dispatch }}>
            <Main
              tegTokenBalance={tegTokenBalance}

              withdrawYield={withdrawYield}
              stakeTokens={stakeTokens}
              unstakeTokens={unstakeTokens}
              borrowTokens={borrowTokens}
              repayTokens={repayTokens}
            />
          </MarketPageContext.Provider>
        </div>
      )}
    </ThemeProvider>
  );
}

export default MarketPage;
