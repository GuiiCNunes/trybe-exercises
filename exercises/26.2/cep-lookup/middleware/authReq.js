const Joi = require('joi');

const schema = Joi.object({
  cep: Joi.string().pattern(/^\d{5}-?\d{3}$/m).not().empty().required(),
  logradouro: Joi.string().not().empty().required(),
  bairro: Joi.string().not().empty().required(),
  localidade: Joi.string().not().empty().required(),
  uf: Joi.string().not().empty().required(),
});

const authReq = (req, _res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    const err = {
      code: 400,
      message: { "error": { "code": "invalidData", "message": "<mensagem do Joi>" } },
    }
    next(err);
  }
  next();
};

module.exports = authReq;
