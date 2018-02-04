pragma solidity ^0.4.2;

import 'zeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

/**
 * @title SampleCrowdsaleToken
 * @dev Very simple ERC20 Token that can be minted.
 * It is meant to be used in a crowdsale contract.
 */
 contract SampleCrowdsaleToken is MintableToken {

    string public constant name = "Sample Crowdsale Token";
    string public constant symbol = "SCT";
    uint8 public constant decimals = 18;

 }