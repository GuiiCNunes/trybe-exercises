const authToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization.length !== 12) {
    return res.status(401).json({ message: 'invalid token' });
  }

  next();
};

module.exports = authToken;
