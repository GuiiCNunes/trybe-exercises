const { isValidDataUser } = require("../model/User");

const authData = (req, res, next) => {
  if (!isValidDataUser(req.body)) return res.status(400).json(
    {
      "error": true,
      "message": "O campo 'password' deve ter pelo menos 6 caracteres"
    }
  );

  next();
};

module.exports = authData;
