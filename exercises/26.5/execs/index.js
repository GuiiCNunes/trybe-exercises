const express = require('express');
const bodyParser = require('body-parser');
const usersRoute = require('./routes/usersRoute')

const app = express();
app.use(bodyParser.json());

app.use('/user', usersRoute);

app.listen(3001, () => { console.log('Ouvindo na porta 3001'); });