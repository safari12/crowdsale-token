const ether = require('./helpers/ether');
const latestTime = require('./helpers/latestTime');
const { increaseTimeTo, duration } = require('./helpers/increaseTime');

const BigNumber = web3.BigNumber;

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
.should();

const SampleCrowdsale = artifacts.require('SampleCrowdsale.sol');
const SampleCrowdsaleToken = artifacts.require('SampleCrowdsaleToken.sol');

contract('SampleCrowdsale', ([owner, wallet, investor]) => {
    const RATE = new BigNumber(10);
    const GOAL = ether(10);
    const CAP = ether(20);

    beforeEach(async () => {
        this.startTime = latestTime() + duration.weeks(1);
        this.endTime = this.startTime + duration.weeks(1);
        this.afterEndTime = this.endTime + duration.seconds(1);

        this.token = await SampleCrowdsaleToken.new();
        this.crowdsale = await SampleCrowdsale.new(
            this.startTime, this.endTime, RATE, GOAL, CAP, wallet, this.token.address
        );

        await this.token.transferOwnership(this.crowdsale.address);
    });

    it('should create crowdsale with correct parameters', async () => {
        this.crowdsale.should.exist;
        this.token.should.exist;

        const startTime = await this.crowdsale.startTime();
        const endTime = await this.crowdsale.endTime();
        const rate = await this.crowdsale.rate();
        const walletAddress = await this.crowdsale.wallet();
        const goal = await this.crowdsale.goal();
        const cap = await this.crowdsale.cap();

        startTime.should.be.bignumber.equal(this.startTime);
        endTime.should.be.bignumber.equal(this.endTime);
        rate.should.be.bignumber.equal(RATE);
        walletAddress.should.be.equal(wallet);
        goal.should.be.bignumber.equal(GOAL);
        cap.should.be.bignumber.equal(CAP);
    });
});
