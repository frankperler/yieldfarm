import { React, useState } from 'react';
import Link from '@material-ui/core/Link';
import web3 from 'web3';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function TegBox(props) {
  const classes = useStyles();

  return (
    <>
      <Typography component="h2" variant="h5" color="primary" gutterBottom align="left">TEG Wallet</Typography>
      <Typography component="p" variant="h4" color="secondary">
        {web3.utils.fromWei(props.tegTokenBalance, 'Ether')} TEG
      </Typography>
    </>
  );
}