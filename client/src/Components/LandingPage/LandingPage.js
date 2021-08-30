import { React, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import farmer from '../../assets/randymarsh.png'
import Header from "./Header/Header";
const Moralis = require('moralis');
const { REACT_APP_MORALIS_APP_ID, REACT_APP_MORALIS_SERVER } = process.env;

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    minWidth: '100vh',
    backgroundImage: `url(${farmer})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundColor: "#9e9e9e"
  },
  centerText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "70vh",
    color: "white",
    fontSize: "2rem",
  },
  colorText: {
    color: "#e53935",
    marginTop: "3rem",
    marginBottom: "1rem"
  },
}))

export default function LandingPage({ userAddr, setUserAddr, setIsAuth }) {
  const classes = useStyles();

  useEffect(() => {
    if (userAddr) setIsAuth(true)
  }, [userAddr])

  useEffect(() => {
    (async function connectDb() {
      await Moralis.initialize(REACT_APP_MORALIS_APP_ID);
      Moralis.serverURL = REACT_APP_MORALIS_SERVER;
    })();
  }, [])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <div className={classes.centerText}>
        <Typography variant="h5" align="center">
          <span className={classes.colorText}>Tegridy Farm </span>
          is a DeFi Yield Farming App running
          on the Ethereum Blockchain. <br></br>
          Lend and borrow your ERC-20 tokens and
          get your <span className={classes.colorText}>Tegridy Tokens NOW!</span>
        </Typography>
        <Button
          variant="outlined"
          size="large"
          className={classes.colorText}
          onClick={async () => {
            Moralis.Web3.authenticate().then(function (user) {
              setUserAddr(user.get('ethAddress'));
            })
          }
          }
        >
          App
        </Button>
        <h1>Let's get farming!</h1>

      </div>
    </div>
  );
}