import { React, useState } from 'react';
import Link from '@material-ui/core/Link';
import web3 from 'web3';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
    },
}));

export default function TegBox(props) {
  const classes = useStyles();

  return (
    <>
    <Typography component="h2" variant="h5" color="secondary" gutterBottom align="left">Exchange Board</Typography>
      <Typography component="h2" variant="h5" color="secondary" gutterBottom align="left" classes={classes.root}> TEG Wallet</Typography>
      <Typography component="p" variant="h6" color="primary">
        {web3.utils.fromWei(props.tegTokenBalance, 'Ether')} TEG
      </Typography>
    </>
  );
}