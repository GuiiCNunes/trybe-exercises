const authCep = require('../middleware/authCep');
const authReq = require('../middleware/authReq');
const Cep = require('../service/cep');

const getCep = [
  authCep,
  async (req, res, next) => {
    const { cep } = req.params;
    const response = await Cep.getCep(cep);

    if (response.length === 0) return res.status(404).json({
      "error": { "code": "notFound", "message": "CEP não encontrado"},
    });

    res.status(200).json(response);
  },
];

const addCep = [
  authReq,
  async (req, res) => {
    const { cep, logradouro, bairro, localidade, uf } = req.body;
    const response = await Cep.addCep({ cep, logradouro, bairro, localidade, uf });
    console.log(response);
    if (!response) return res.status(409).json({
      "error": { "code": "alreadyExists", "message": "CEP já existente" }
    });

    return await res.status(201).json({ cep, logradouro, bairro, localidade, uf });
  },
];

module.exports = {
  getCep,
  addCep,
};
