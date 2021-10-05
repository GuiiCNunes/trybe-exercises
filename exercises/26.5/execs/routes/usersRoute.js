const express = require('express');
const router = express.Router();

router.post('/login', (req, res, _next) => {

});

const authUser = require('../middlewares/authUser.js');
router.use(authUser);

router.post('/register', (req, res, _next) => {
  const {username,email,password} = req.body;
  res.status(201).json({ "message": "user created" });
});

module.exports = router;