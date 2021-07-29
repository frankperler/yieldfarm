const DaiToken = artifacts.require('DaiToken')
const TegToken = artifacts.require('TegToken')
const TokenFarm = artifacts.require('TokenFarm')

module.exports = async function(deployer, network, accounts) {

  //deploy Dai
  await deployer.deploy(DaiToken);
  const daiToken = await DaiToken.deployed();

  //deploy Teg 
  await deployer.deploy(TegToken);
  const tegToken = await TegToken.deployed();

  // deploy TokenFarm
  await deployer.deploy(TokenFarm, tegToken.address, daiToken.address);
  const tokenFarm = await TokenFarm.deployed();

  //assign Teg tokens to farm so that user can earn them from farm
  await tegToken.transfer(tokenFarm.address, "1000000000000000000000000");

  // transfer 100 fake dai to account 1 on Ganache 
  await daiToken.transfer(accounts[1], "100000000000000000000")

  // transfer 10000 fake dai to farm so that it can lend
  await daiToken.transfer(tokenFarm.address, "10000000000000000000000")
};