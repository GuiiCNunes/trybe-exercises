const express = require('express');
const router = express.Router();

const authUser = require('../middlewares/authUser.js');
router.use(authUser);

router.post('/register', (req, res) => {
  const {username,email,password} = req.body;
  console.log(typeof username);
  console.log(typeof email);
  console.log(typeof password);
  res.status(201).json({ "message": "user created" });
});

module.exports = router;