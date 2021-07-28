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
      assert.equal(name, 'Tegridy Token Farm')
    })

    it('has tokens', async () => {
      let balance = await tegToken.balanceOf(tokenFarm.address)
      assert.equal(balance.toString(), tokens('1000000'));
    })
  })

  describe('Farming tokens', async () => {
    it('rewards investors for staking mDai tokens', async () => {
      let result
      //check investor balance before staking
      result = await daiToken.balanceOf(investor)
      assert.equal(result.toString(), tokens('100'), 'investor Mock Dai balance correct before staking')

      //stake mock dai tokens
      await daiToken.approve(tokenFarm.address, tokens('100'), {from: investor})
      await tokenFarm.stakeTokens(tokens('100'), {from: investor})

      //check staking result
      result = await daiToken.balanceOf(investor)
      assert.equal(result.toString(), tokens('0'), 'investor Mock Dai wallet balance correct after staking')

      result = await tokenFarm.stakingBalance(investor)
      assert.equal(result.toString(), tokens('100'), 'investor staking balance correct after staking')

      result = await tokenFarm.isStaking(investor)
      assert.equal(result.toString(), 'true', 'investor staking status correct after staking')

      //issue tokens
      await tokenFarm.issueTokens({from:owner})

      //check balances after issuance
      result = await tegToken.balanceOf(investor)
      assert.equal(result.toString(), tokens('100'), 'investor Tegrity Token wallet balance correct after issuance')

      //ensure owner only can issue tokens
      await tokenFarm.issueTokens({from:investor}).should.be.rejected;

      //unstake tokens
      await tokenFarm.unstakeTokens({from: investor})

      //check results after unstaking
      result = await daiToken.balanceOf(investor)
      assert.equal(result.toString(), tokens('100'), 'investor Mock Dai wallet balance is correct after unstaking')

      result = await daiToken.balanceOf(tokenFarm.address)
      assert.equal(result.toString(), tokens('0'), 'Token Farm Mock Dai balance is correct after unstaking')

      result = await tokenFarm.stakingBalance(investor)
      assert.equal(result.toString(), tokens('0'), 'investor staking balance is correct after unstaking')

      result = await tokenFarm.isStaking(investor)
      assert.equal(result.toString(), 'false', 'investor staking status is correct after unstaking')

    })
  })

})