const Cep = require('../model/cep');
const ApiCep = require('../model/apiCep');

const formatCep = (cep) => {
  if (!cep.includes('-')) return cep;
  return cep.replace('-', '');
};

const isCepExists = async (cep) => {
  const res = await getCep(formatCep(cep));
  console.log(res);
  return res.length > 0;
}

const getCep = async (newCep) => {
  const response = await Cep.getCep(formatCep(newCep));
  if (response.length > 0) return response;
  const { error } = await ApiCep.getData(newCep);
  console.log({ error });
  await Cep.addCep({ cep: formatCep(cep), logradouro, bairro, localidade, uf });
  return { cep, logradouro, bairro, localidade, uf };
};

const addCep = async ({ cep, logradouro, bairro, localidade, uf }) => {
  if (await isCepExists(cep)) return null;
  const response = await Cep.addCep({ cep: formatCep(cep), logradouro, bairro, localidade, uf });
  return response;
};

module.exports = {
  getCep,
  addCep,
};
