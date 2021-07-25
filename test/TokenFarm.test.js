const { assert } = require('chai')
const _deploy_contracts = require('../migrations/2_deploy_contracts')

const DaiToken = artifacts.require('DaiToken')
const TegToken = artifacts.require('TegToken')
const TokenFarm = artifacts.require('TokenFarm')

require('chai')
  .use(require('chai-as-promised'))
  .should()


function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

contract('TokenFarm', ([owner, investor]) => {

  let daiToken, tegToken, tokenFarm

  before(async () => {
    //load contracts
    daiToken = await DaiToken.new()
    tegToken = await TegToken.new()
    tokenFarm = await TokenFarm.new(tegToken.address, daiToken.address)

    //transfer all Teg Tokens to token farm
    await tegToken.transfer(tokenFarm.address, tokens('1000000'))

    //transfer all tokens to investor (to be removed)
    await daiToken.transfer(investor, tokens('100'), {from: owner})
  })

  describe('Mock Dai deployment', async () => {
    it('has a name', async () => {
      const name = await daiToken.name()
      assert.equal(name, 'Mock DAI Token')
    })
  })

  describe('Teg Token deployment', async () => {
    it('has a name', async () => {
      const name = await tegToken.name()
      assert.equal(name, 'Tegrity Token')
    })
  })

  describe('Token Farm deployment', async () => {
    it('has a name', async () => {
      const name = await tokenFarm.name()
      assert.equal(name, 'Tegrity Token Farm')
    })

    it('has tokens', async () => {
      let balance = await tegToken.balanceOf(tokenFarm.address)
      assert.equal(balance.toString(), tokens('1000000'));
    })
  })

})