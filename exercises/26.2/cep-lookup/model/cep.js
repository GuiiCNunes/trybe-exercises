const connection = require("./connection");

const getCep = async (cep) => {
  const [response] = await connection.execute(
    'SELECT * FROM ceps WHERE cep = ?;',
    [cep],
  );
  return response;
};

const addCep = async ({ cep, logradouro, bairro, localidade, uf }) => {
  const [response] = await connection.execute(
    'INSERT INTO ceps (cep, logradouro, bairro, localidade, uf) VALUES (?, ?, ?, ?, ?);',
    [cep, logradouro, bairro, localidade, uf],
  );
  return response.affectedRows;
};

module.exports = {
  getCep,
  addCep,
};
