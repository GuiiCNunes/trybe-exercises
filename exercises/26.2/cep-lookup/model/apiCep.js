const axios = require('axios').default;

const getData = (cep) => axios.get(`https://viacep.com.br/ws/${cep}/json\/`)
  .then(({ data }) => data)
  .catch((error) => ({ error }));

  module.exports = {
    getData,
  };