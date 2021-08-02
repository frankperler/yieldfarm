const initialState = {
  account: 0,
  daiToken: {},
  daiTokenBalance: '0',
  daiStakingBalance: '0',
  daiEarnedBalance: '0',
  daiBorrowedBalance: '0',
  daiLossBalance: '0',
  ethToken: {},
  ethTokenBalance: '0',
  ethStakingBalance: '0',
  ethEarnedBalance: '0',
  ethBorrowedBalance: '0',
  ethLossBalance: '0',
  usdtToken: {},
  usdtTokenBalance: '0',
  usdtStakingBalance: '0',
  usdtEarnedBalance: '0',
  usdtBorrowedBalance: '0',
  usdtLossBalance: '0',
  tegToken: {},
  tegTokenBalance: '0',
  tokenFarm: '0'
}

function reducers(state, action) {
  switch (action.type) {
    case 'update-dai':
      return {...state}
  }
}