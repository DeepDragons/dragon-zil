const express = require('express');
const { Zilliqa } = require('@zilliqa-js/zilliqa');
const router = express();

const isDev = process.env.NODE_ENV === 'production';
const mainnet = 'https://api.zilliqa.com';
const testnet = 'https://dev-api.zilliqa.com';
const provider = isDev ? mainnet : testnet;
const zilliqa = new Zilliqa(provider);

zilliqa.wallet.addByPrivateKey(process.env.PRIVATE_KEY);

router.get('/:address', (req, res) => {
  const { address } = req.params;
  const hashBytes = Buffer.from(address, 'hex');
  const signature = zilliqa.wallet.defaultAccount.signTransaction(hashBytes);

  return res.status(200).json({
    signature,
    msg: address
  });
});

module.exports = router;
