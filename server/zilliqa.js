const { Zilliqa } = require('@zilliqa-js/zilliqa');
const { validation } = require('@zilliqa-js/util');
const BN = require('bn.js');

const isDev = process.env.NODE_ENV === 'production';
const ZLP = process.env.ZLP_CONTRACT;
const mainnet = 'https://api.zilliqa.com';
const testnet = 'https://dev-api.zilliqa.com';
const provider = mainnet;
const zilliqa = new Zilliqa(provider);

module.exports = {
  validation,
  signMessage(msg) {
    msg = String(msg).toLowerCase().replace('0x', '');

    const hashBytes = Buffer.from(msg, 'hex');
    const signature = zilliqa.wallet.defaultAccount.signTransaction(hashBytes);

    return {
      msg,
      signature
    };
  },
  async checkbalance(address) {
    if (!address) {
      throw new Error('address is required');
    } else if (!validation.isAddress(address)) {
      throw new Error('incorect address format.');
    }

    const zilliqa = new Zilliqa(provider);
    const contract = zilliqa.contracts.at(ZLP);
    const base16 = String(address).toLowerCase();

    try {
      const result = await contract.getSubState(
        'balances',
        [base16]
      );

      if (!result || !result['balances'] || !result['balances'][base16]) {
        return '0';
      }

      return result['balances'][base16];
    } catch (err) {
      return '0';
    }
  },
  isValidbalance(balance) {
    const _balance = new BN(balance);
    const _need = new BN(process.env.MIN_TO_CLAIM);

    if (_balance.lt(_need)) {
      return false;
    }

    return true;
  }
};
