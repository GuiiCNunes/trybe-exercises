const express = require('express');
const { setData, getData } = require('../data/db');
const authFormTeams = require('../middlewares/authFormTeams');

const router = express.Router();

router.post('/', authFormTeams, (req, res) => {
  setData(req.body);
  res.status(201).json(req.body);
});

router.get('/', (req, res) => {
  const data = getData();
  res.status(200).json(data);
});

module.exports = router;
