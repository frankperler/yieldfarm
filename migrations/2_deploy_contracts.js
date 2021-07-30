const DaiToken = artifacts.require('DaiToken')
const EthToken = artifacts.require('EthToken')
const UsdtToken = artifacts.require('UsdtToken')
const TegToken = artifacts.require('TegToken')
const TokenFarm = artifacts.require('TokenFarm')

module.exports = async function (deployer, network, accounts) {

  //deploy Dai
  await deployer.deploy(DaiToken);
  const daiToken = await DaiToken.deployed();

  //deploy Eth
  await deployer.deploy(EthToken);
  const ethToken = await EthToken.deployed();

  //deploy Eth
  await deployer.deploy(UsdtToken);
  const usdtToken = await UsdtToken.deployed();

  //deploy Teg 
  await deployer.deploy(TegToken);
  const tegToken = await TegToken.deployed();

  // deploy TokenFarm
  await deployer.deploy(TokenFarm, tegToken.address, daiToken.address, ethToken.address, usdtToken.address);
  const tokenFarm = await TokenFarm.deployed();

  //assign Teg tokens to farm so that user can earn them from farm
  await tegToken.transfer(tokenFarm.address, "1000000000000000000000000");

  // transfer 100 fake dai to account 1 on Ganache 
  await daiToken.transfer(accounts[1], "100000000000000000000")
  await ethToken.transfer(accounts[1], "100000000000000000000")
  await usdtToken.transfer(accounts[1], "100000000000000000000")

  // transfer 10000 fake dai to farm so that it can lend
  await daiToken.transfer(tokenFarm.address, "10000000000000000000000")
  await ethToken.transfer(tokenFarm.address, "10000000000000000000000")
  await usdtToken.transfer(tokenFarm.address, "10000000000000000000000")

};