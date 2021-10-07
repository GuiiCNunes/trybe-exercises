const express = require('express');
const authEmail = require('../middlewares/authEmail.js');
const router = express.Router();

router.post('/login', authEmail, (_req, res, _next) => {
  res.status(200).json({ token: getToken(12) });
});

const authUser = require('../middlewares/authUser.js');
const getToken = require('../util/tokenGenerate.js');
router.use(authUser);

router.post('/register', (req, res, _next) => {
  const {username,email,password} = req.body;
  res.status(201).json({ "message": "user created" });
});

module.exports = router;