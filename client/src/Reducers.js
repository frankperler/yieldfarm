const initialState = {
  daiTokenBalance: '0',
  daiStakingBalance: '0',
  daiEarnedBalance: '0',
  daiBorrowedBalance: '0',
  daiLossBalance: '0',
  ethTokenBalance: '0',
  ethStakingBalance: '0',
  ethEarnedBalance: '0',
  ethBorrowedBalance: '0',
  ethLossBalance: '0',
  usdtTokenBalance: '0',
  usdtStakingBalance: '0',
  usdtEarnedBalance: '0',
  usdtBorrowedBalance: '0',
  usdtLossBalance: '0',
}

function reducers(state, action) {
  switch (action.type) {
    case 'stake-dai':
      return {
        ...state,
        daiStakingBalance: action.data.returnValues.stakingBal,
        daiEarnedBalance: action.data.returnValues.intBal,
        daiTokenBalance: action.data.returnValues.daiBal,
        tegTokenBalance: action.data.returnValues.tegBal
      }
    case 'stake-eth':
      return {
        ...state,
        ethStakingBalance: action.data.returnValues.stakingBal,
        ethEarnedBalance: action.data.returnValues.intBal,
        ethTokenBalance: action.data.returnValues.ethBal,
        tegTokenBalance: action.data.returnValues.tegBal
      }
    case 'stake-usdt':
      return {
        ...state,
        usdtStakingBalance: action.data.returnValues.stakingBal,
        usdtEarnedBalance: action.data.returnValues.intBal,
        usdtTokenBalance: action.data.returnValues.usdtBal,
        tegTokenBalance: action.data.returnValues.tegBal
      }
    case 'withdraw-dai':
      return {
        ...state,
        daiStakingBalance: action.data.returnValues.stakingBal,
        daiEarnedBalance: action.data.returnValues.intBal,
        daiBorrowedBalance: action.data.returnValues.borrowBal,
        daiLossBalance: action.data.returnValues.lossBal,
        daiTokenBalance: action.data.returnValues.daiBal,
        tegTokenBalance: action.data.returnValues.tegBal
      }
    case 'withdraw-eth':
      return {
        ...state,
        ethStakingBalance: action.data.returnValues.stakingBal,
        ethEarnedBalance: action.data.returnValues.intBal,
        ethBorrowedBalance: action.data.returnValues.borrowBal,
        ethLossBalance: action.data.returnValues.lossBal,
        ethTokenBalance: action.data.returnValues.ethBal,
        tegTokenBalance: action.data.returnValues.tegBal
      }
    case 'withdraw-usdt':
      return {
        ...state,
        usdtStakingBalance: action.data.returnValues.stakingBal,
        usdtEarnedBalance: action.data.returnValues.intBal,
        usdtBorrowedBalance: action.data.returnValues.borrowBal,
        usdtLossBalance: action.data.returnValues.lossBal,
        usdtTokenBalance: action.data.returnValues.usdtBal,
        tegTokenBalance: action.data.returnValues.tegBal
      }
    case 'borrow-dai':
      return {
        ...state,
        daiLossBalance: action.data.returnValues.lossBal,
        daiBorrowedBalance: action.data.returnValues.borrowBal,
        daiTokenBalance: action.data.returnValues.daiBal,
        tegTokenBalance: action.data.returnValues.tegBal
      }
    case 'borrow-eth':
      return {
        ...state,
        ethLossBalance: action.data.returnValues.lossBal,
        ethBorrowedBalance: action.data.returnValues.borrowBal,
        ethTokenBalance: action.data.returnValues.ethBal,
        tegTokenBalance: action.data.returnValues.tegBal
      }
    case 'borrow-usdt':
      return {
        ...state,
        usdtLossBalance: action.data.returnValues.lossBal,
        usdtBorrowedBalance: action.data.returnValues.borrowBal,
        usdtTokenBalance: action.data.returnValues.usdtBal,
        tegTokenBalance: action.data.returnValues.tegBal
      }
    case 'update-all':
      return {
        ...state,
        daiTokenBalance: action.daiTokenBalance.toString(),
        daiStakingBalance: action.daiStakingBalance.toString(),
        daiEarnedBalance: action.daiEarnedBalance.toString(),
        daiBorrowedBalance: action.daiBorrowedBalance.toString(),
        daiLossBalance: action.daiLossBalance.toString(),
        ethTokenBalance: action.ethTokenBalance.toString(),
        ethStakingBalance: action.ethStakingBalance.toString(),
        ethEarnedBalance: action.ethEarnedBalance.toString(),
        ethBorrowedBalance: action.ethBorrowedBalance.toString(),
        ethLossBalance: action.ethLossBalance.toString(),
        usdtTokenBalance: action.ethTokenBalance.toString(),
        usdtStakingBalance: action.usdtStakingBalance.toString(),
        usdtEarnedBalance: action.usdtEarnedBalance.toString(),
        usdtBorrowedBalance: action.usdtBorrowedBalance.toString(),
        usdtLossBalance: action.usdtLossBalance.toString(),
      }
    default:
      return state;
  }
}

export { initialState, reducers }