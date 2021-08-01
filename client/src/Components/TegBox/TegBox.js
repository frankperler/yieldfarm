import { React, useState } from 'react';
import web3 from 'web3';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
    },
}));

export default function TegBox(props) {
  const classes = useStyles();

  return (
    <>
      <Typography component="h2" variant="h5" color="secondary" gutterBottom align="left" classes={classes.root}> TEG Wallet Balance</Typography>
      <Typography component="p" variant="h6" color="primary">
        {web3.utils.fromWei(props.tegTokenBalance, 'Ether')} TEG
      </Typography>
    </>
  );
}