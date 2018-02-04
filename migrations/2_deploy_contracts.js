function ether(n) {
  return new web3.BigNumber(web3.toWei(n, 'ether'));
}

const SafeMath = artifacts.require('./SafeMath.sol');
const SampleCrowdsale = artifacts.require('./SampleCrowdsale.sol');
const SampleCrowdsaleToken = artifacts.require('./SampleCrowdsaleToken');

module.exports = function(deployer) {
  deployer.deploy(SafeMath);

  deployer.link(SafeMath, SampleCrowdsale);
  deployer.link(SafeMath, SampleCrowdsaleToken);

  deployer
    .deploy(SampleCrowdsaleToken)
    .then(() => {
      const wallet = web3.eth.accounts[1];
      const startTime = 1520141469;
      const endTime = 1522819869;
      const goal = ether(10);
      const cap = ether(20);
      const rate = new web3.BigNumber(10);
      const token = SampleCrowdsaleToken.address;

      deployer.deploy(
        SampleCrowdsale,
        startTime,
        endTime,
        rate,
        goal,
        cap,
        wallet,
        token
      );
    });
};
