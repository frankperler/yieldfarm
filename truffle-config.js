require('babel-register');
require('babel-polyfill');

module.exports = {
  networks: {
    development: {
      gas: 6721975,
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
  },
  plugins: ["truffle-contract-size"],
  contracts_directory: './client/src/contracts',
  contracts_build_directory: './client/src/abis/',
  compilers: {
    solc: {
      version: "^0.8.6",
      optimizer: {
        enabled: true,
        runs: 1
      },
      evmVersion: "petersburg"
    }
  }
}

