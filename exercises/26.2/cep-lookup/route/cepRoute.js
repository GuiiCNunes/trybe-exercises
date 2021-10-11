const express = require('express');
const { getCep, addCep } = require('../controller/cep');
const genericErr = require('../middleware/genericErr');
const cepRouter = express.Router();

cepRouter.get('/:cep', getCep);
cepRouter.post('/', addCep);

cepRouter.use(genericErr);

module.exports = cepRouter;
