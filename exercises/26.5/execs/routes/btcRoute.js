const express = require('express');
const authToken = require('../middlewares/authToken');
const router = express.Router();
const axios = require('axios');

const apiURL = 'https://api.coindesk.com/v1/bpi/currentprice/BTC.json);';

router.get('/price', authToken, async (_req, res) => {
  const response = await axios.get(apiURL);
  res.status(200).json(response.data);
});

module.exports = router;
