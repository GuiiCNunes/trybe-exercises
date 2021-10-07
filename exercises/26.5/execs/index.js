const express = require('express');
const bodyParser = require('body-parser');
const usersRoute = require('./routes/usersRoute')
const btcRoute = require('./routes/btcRoute')
const teamsRoute = require('./routes/teamsRoute')

const app = express();
app.use(bodyParser.json());

app.use('/user', usersRoute);
app.use('/btc', btcRoute);
app.use('/teams', teamsRoute);

app.listen(3001, () => { console.log('Ouvindo na porta 3001'); });