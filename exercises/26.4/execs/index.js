const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const generateToken = require('./generateToken');

const nomeDoArquivo = 'simpsons.json';
let data;

const getData = () => {
  fs.readFile(nomeDoArquivo, 'utf8')
    .then((d) => data = JSON.parse(d))
    .catch((err) => err);
}

const isIdInUse = (id) => {
  const response = data.find((obj) => parseInt(obj.id) === parseInt(id));
  return response ? true : false;
}

const app = express();
app.use(bodyParser.json());

app.get('/simpsons', (req, res) => {
  const token = req.headers.authorization || '';
  if(token.length !== 16 || token !== '1234567890123456') return res.status(401).json({ message: 'Token inválido!' });
  if(!data) { return res.status(500).send('Internal Server Error'); }
  res.status(200).json(data);
});

app.get('/simpsons/:id', (req, res) => {
  const token = req.headers.authorization || '';
  if(token.length !== 16 || token !== '1234567890123456') return res.status(401).json({ message: 'Token inválido!' });
  const { id } = req.params;
  const character = data.find((per) => per.id === id);
  if(!character) return res.status(404).json({ message: 'simpson not found' });
  res.status(200).json(character);
});

app.post('/simpsons', (req, res) => {
  const token = req.headers.authorization || '';
  if(token.length !== 16 || token !== '1234567890123456') return res.status(401).json({ message: 'Token inválido!' });
  const { id, name } = req.body;
  if(isIdInUse(id)) return res.status(409).json({ message: 'id already exists' });
  const newSimps = { id, name };
  data.push(newSimps);
  res.status(204).end();
});

app.get('/', function (_req, res) {
  const token = req.headers.authorization || '';
  if(token.length !== 16 || token !== '1234567890123456') return res.status(401).json({ message: 'Token inválido!' });
  res.status(200).json({ message: 'pong' });
});

app.post('/hello', (req, res) => {
  const token = req.headers.authorization || '';
  if(token.length !== 16 || token !== '1234567890123456') return res.status(401).json({ message: 'Token inválido!' });
  const { name } = req.body;
  res.status(200).json({ 'message': `Hello, ${name}!` });
});

app.post('/greetings', (req, res) => {
  const token = req.headers.authorization || '';
  if(token.length !== 16 || token !== '1234567890123456') return res.status(401).json({ message: 'Token inválido!' });
  const { name, age } = req.body;
  if(parseInt(age) > 17) {
    return res.status(200).json({ 'message': `Hello, ${name}!` });
  }
  res.status(401).json({ "message": "Unauthorized" });
});

app.put('/users/:name/:age', (req, res) => {
  const token = req.headers.authorization || '';
  if(token.length !== 16 || token !== '1234567890123456') return res.status(401).json({ message: 'Token inválido!' });
  const { name, age } = req.params;
  res.status(200).json({ 'message': `Seu nome é ${name} e você tem ${age} anos de idade` });
});

app.post('/signup', (req, res) => {
  const { email = '', password = '', firstName = '', phone = '' } = req.body;
  if(!email || !password || !firstName || !phone) return res.status(401).send({ message: 'missing fields' });
  res.status(200).json({ token: generateToken() });
});

app.listen(3000, function () {
  getData();
  console.log('Example app listening on port 3000!');
});