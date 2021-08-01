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
      <Box>
        <Typography>TEG Wallet Balance</Typography>
        <Typography component="p" variant="h4">
          {web3.utils.fromWei(props.tegTokenBalance, 'Ether')} TEG
        </Typography>
      </Box>
    </>
  );
}