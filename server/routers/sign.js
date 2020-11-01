const express = require('express');
const router = express();
const zilliqa = require('../zilliqa');

router.get('/:address', async (req, res) => {
  const { address } = req.params;

  if (!zilliqa.validation.isAddress(address)) {
    return res.status(400).json({
      code: 0,
      error: 'incorect address format.'
    })
  }

  try {
    const balance = await zilliqa.checkbalance(address);
    const isValid = zilliqa.isValidbalance(balance);

    if (!isValid) {
      return res.status(301).json({
        code: 1,
        error: 'ZLP balance less than need for claim'
      });
    }

    const payload = zilliqa.signMessage(address);
  
    return res.status(200).json(payload);
  } catch (err) {
    return res.status(400).json({
      code: 2,
      error: 'Bad requests parmas'
    });
  }
});

module.exports = router;
