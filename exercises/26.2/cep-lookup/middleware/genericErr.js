const genericErr = ({ code, message }, _req, res, _next) => {
  res.status(code).json(message);
}

module.exports = genericErr;
