const authCep = (req, res, next) => {
  const { cep } = req.params;
  const regexCep = /\d{5}-?\d{3}/;
  if (!regexCep.test(cep)) {
    const error = {
      code: 400,
      message:   { "error": { "code": "invalidData", "message": "CEP inválido" } },
    }
    next(error);
  }

  next();
};

module.exports = authCep;
