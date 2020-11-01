const express = require('express');
const router = express();

const sign = require('./sign');

router.use('/sign', sign);

module.exports = router;
