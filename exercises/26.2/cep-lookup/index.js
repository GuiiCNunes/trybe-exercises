const express = require('express');
require('dotenv').config();
const router = require('./route');
const cepRouter = require('./route/cepRoute');
const app =  express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/', router );
app.use('/cep', cepRouter);


app.listen(PORT, () => console.log(`Servidor online na porta ${PORT}`));
