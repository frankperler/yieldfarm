import { React, useState } from 'react'
import './ExchangeItems.css';
import dai from '../../dai.png'
import eth from '../../eth-logo.png'
import usdt from '../../tether.png'
import web3 from 'web3';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

function ExchangeItems(props) {

  const [daiLendAmount, setDaiLendAmount] = useState('0');
  const [ethLendAmount, setEthLendAmount] = useState('0');
  const [usdtLendAmount, setUsdtLendAmount] = useState('0');
  const [daiBorrowAmount, setDaiBorrowAmount] = useState('0');
  const [ethBorrowAmount, setEthBorrowAmount] = useState('0');
  const [usdtBorrowAmount, setUsdtBorrowAmount] = useState('0');

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(2),
      },
      margin: {
        margin: theme.spacing(3),
      }
    }
  }));

  const classes = useStyles();

  return (

    <div className="exchangeBoard">
      <div className="daiForm">

        <div className="daiLend">

          <FormControl className={classes.margin}>
            <InputLabel htmlFor="input-with-icon-adornment">DAI</InputLabel>
            <Input
              id="dai-input-with-icon-adornment"
              value={daiLendAmount}
              onChange={handleChange(setDaiLendAmount)}
              startAdornment={
                <InputAdornment position="start">
                  <img src={dai} height='20' alt="" />
                </InputAdornment>
              }
            />
          </FormControl>

          <ButtonGroup
            orientation="vertical"
            color="primary"
            aria-label="vertical contained primary button group"
            variant="text"
          >
            <Button
              onClick={async (event) => {
                event.preventDefault()
                let amount;
                amount = web3.utils.toWei(daiLendAmount.toString(), 'Ether')
                await props.stakeTokens(amount, "dai")
              }}
            >
              Lend
            </Button>
            <Button
              onClick={async (event) => {
                event.preventDefault()
                let amount;
                amount = web3.utils.toWei(daiLendAmount.toString(), 'Ether')
                await props.unstakeTokens(amount, "dai")
              }}
            >
              Unstake
            </Button>
          </ButtonGroup>
        </div>

        <div className="daiBorrow">

          <FormControl className={classes.margin}>
            <InputLabel htmlFor="input-with-icon-adornment">DAI</InputLabel>
            <Input
              id="dai-input-with-icon-adornment"
              value={daiBorrowAmount}
              onChange={handleChange(setDaiBorrowAmount)}
              startAdornment={
                <InputAdornment position="start">
                  <img src={dai} height='20' alt="" />
                </InputAdornment>
              }
            />
          </FormControl>

          <ButtonGroup
            orientation="vertical"
            color="primary"
            aria-label="vertical contained primary button group"
            variant="text"
          >
            <Button
              onClick={async (event) => {
                event.preventDefault()
                let amount;
                amount = web3.utils.toWei(daiBorrowAmount.toString(), 'Ether')
                await props.borrowTokens(amount, "dai")
              }}
            >
              Borrow
            </Button>
            <Button
              onClick={async (event) => {
                event.preventDefault()
                let amount;
                amount = web3.utils.toWei(daiBorrowAmount.toString(), 'Ether')
                await props.repayTokens(amount, "dai")
              }}
            >
              Repay
            </Button>
          </ButtonGroup>
        </div>

        <div className="daiWithdraw">
          <Button
            variant="outlined"
            size="medium"
            color="secondary"
            className={classes.margin}
            type="submit"
            onClick={async (event) => {
              event.preventDefault()
              await props.withdrawYield("dai")
            }}
          >
            Withdraw
          </Button>
        </div>

      </div>

      <div className="ethForm">

        <div className="ethLend">

          <FormControl className={classes.margin}>
            <InputLabel htmlFor="input-with-icon-adornment">ETH</InputLabel>
            <Input
              id="eth-input-with-icon-adornment"
              value={ethLendAmount}
              onChange={handleChange(setEthLendAmount)}
              startAdornment={
                <InputAdornment position="start">
                  <img src={eth} height='20' alt="" />
                </InputAdornment>
              }
            />
          </FormControl>

          <ButtonGroup
            orientation="vertical"
            color="primary"
            aria-label="vertical contained primary button group"
            variant="text"
          >
            <Button
              onClick={async (event) => {
                event.preventDefault()
                let amount;
                amount = web3.utils.toWei(ethLendAmount.toString(), 'Ether')
                await props.stakeTokens(amount, "eth")
              }}
            >
              Lend
            </Button>
            <Button
              onClick={async (event) => {
                event.preventDefault()
                let amount;
                amount = web3.utils.toWei(ethLendAmount.toString(), 'Ether')
                await props.unstakeTokens(amount, "eth")
              }}
            >
              Unstake
            </Button>
          </ButtonGroup>
        </div>

        <div className="ethBorrow">

          <FormControl className={classes.margin}>
            <InputLabel htmlFor="input-with-icon-adornment">ETH</InputLabel>
            <Input
              id="eth-input-with-icon-adornment"
              value={ethBorrowAmount}
              onChange={handleChange(setEthBorrowAmount)}
              startAdornment={
                <InputAdornment position="start">
                  <img src={eth} height='20' alt="" />
                </InputAdornment>
              }
            />
          </FormControl>

          <ButtonGroup
            orientation="vertical"
            color="primary"
            aria-label="vertical contained primary button group"
            variant="text"
          >
            <Button
              onClick={async (event) => {
                event.preventDefault()
                let amount;
                amount = web3.utils.toWei(ethBorrowAmount.toString(), 'Ether')
                await props.borrowTokens(amount, "eth")
              }}
            >
              Borrow
            </Button>
            <Button
              onClick={async (event) => {
                event.preventDefault()
                let amount;
                amount = web3.utils.toWei(ethBorrowAmount.toString(), 'Ether')
                await props.repayTokens(amount, "eth")
              }}
            >
              Repay
            </Button>
          </ButtonGroup>
        </div>

        <div className="ethWithdraw">
          <Button
            variant="outlined"
            size="medium"
            color="secondary"
            className={classes.margin}
            type="submit"
            onClick={async (event) => {
              event.preventDefault()
              await props.withdrawYield("eth")
            }}
          >
            Withdraw
          </Button>
        </div>
      </div>

      <div className="usdtForm">

        <div className="usdtLend">

          <FormControl className={classes.margin}>
            <InputLabel htmlFor="input-with-icon-adornment">USDT</InputLabel>
            <Input
              id="usdt-input-with-icon-adornment"
              value={usdtLendAmount}
              onChange={handleChange(setUsdtLendAmount)}
              startAdornment={
                <InputAdornment position="start">
                  <img src={usdt} height='20' alt="" />
                </InputAdornment>
              }
            />
          </FormControl>

          <ButtonGroup
            orientation="vertical"
            color="primary"
            aria-label="vertical contained primary button group"
            variant="text"
          >
            <Button
              onClick={async (event) => {
                event.preventDefault()
                let amount;
                amount = web3.utils.toWei(usdtLendAmount.toString(), 'Ether')
                await props.stakeTokens(amount, "usdt")
              }}
            >
              Lend
            </Button>
            <Button
              onClick={async (event) => {
                event.preventDefault()
                let amount;
                amount = web3.utils.toWei(usdtLendAmount.toString(), 'Ether')
                await props.unstakeTokens(amount, "usdt")
              }}
            >
              Unstake
            </Button>
          </ButtonGroup>
        </div>

        <div className="usdtBorrow">

          <FormControl className={classes.margin}>
            <InputLabel htmlFor="input-with-icon-adornment">USDT</InputLabel>
            <Input
              id="usdt-input-with-icon-adornment"
              value={usdtBorrowAmount}
              onChange={handleChange(setUsdtBorrowAmount)}
              startAdornment={
                <InputAdornment position="start">
                  <img src={usdt} height='20' alt="" />
                </InputAdornment>
              }
            />
          </FormControl>

          <ButtonGroup
            orientation="vertical"
            color="primary"
            aria-label="vertical contained primary button group"
            variant="text"
          >
            <Button
              onClick={async (event) => {
                event.preventDefault()
                let amount;
                amount = web3.utils.toWei(usdtBorrowAmount.toString(), 'Ether')
                await props.borrowTokens(amount, "usdt")
              }}
            >
              Borrow
            </Button>
            <Button
              onClick={async (event) => {
                event.preventDefault()
                let amount;
                amount = web3.utils.toWei(usdtBorrowAmount.toString(), 'Ether')
                await props.repayTokens(amount, "usdt")
              }}
            >
              Repay
            </Button>
          </ButtonGroup>
        </div>

        <div className="usdtWithdraw">
          <Button
            variant="outlined"
            size="medium"
            color="secondary"
            className={classes.margin}
            type="submit"
            onClick={async (event) => {
              event.preventDefault()
              await props.withdrawYield("usdt")
            }}
          >
            Withdraw
          </Button>
        </div>
      </div>

    </div>

  )
}

export default ExchangeItems;