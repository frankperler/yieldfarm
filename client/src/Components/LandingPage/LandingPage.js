import { React, useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import farmer from '../../randymarsh.png'
import wheat from '../../wheat.png'
import Header from "./Header/Header";
const Moralis = require('moralis');
const { REACT_APP_MORALIS_APP_ID, REACT_APP_MORALIS_SERVER } = process.env;

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    minWidth: '100vh',
    backgroundImage: `url(${wheat})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundColor: "#9e9e9e",
    filter: "grayscale(100%)"
  },
  centerText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
    color: "white",
    fontSize: "2rem",
  },
  colorText: {
    color: "#e53935"
  }
}))

export default function LandingPage({ userAddr, setUserAddr, setIsAuth }) {
  const classes = useStyles();
  useEffect(async () => {
    if (userAddr) setIsAuth(true)
    console.log("user addr", userAddr)
    // setIsAuth(true)
  }, [userAddr])

  console.log(REACT_APP_MORALIS_APP_ID)
  useEffect(async () => {
    await Moralis.initialize(REACT_APP_MORALIS_APP_ID);
    Moralis.serverURL = REACT_APP_MORALIS_SERVER;
  }, [])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <div className={classes.centerText}>
        <h1>Let's get farming!</h1>
        <Button
          variant="outlined"
          size="large"
          className={classes.colorText}
          onClick={async () => {
            Moralis.Web3.authenticate().then(function (user) {
              console.log("on click", user.get('ethAddress'))
              setUserAddr(user.get('ethAddress'));
            })
          }
          }
        >
          App
        </Button>
      </div>
    </div>
  );
}