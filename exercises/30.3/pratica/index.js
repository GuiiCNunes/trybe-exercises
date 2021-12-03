const express = require('express');
const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  }});

// io.on('connection', (socket) => {
//   console.log(`Usuário conectado. ID: ${socket.id} `);

//   socket.emit('ola', 'Que bom que você chegou aqui! Fica mais um cadin, vai ter bolo :)');

//   socket.on('ping', () => {
//     console.log(`${socket.id} emitiu um ping!`);
//     io.emit('pong', `${socket.id} enviou um ping!`); // essa linha envia um aviso para o cliente que o ping chegou.
//   });
// });,
app.use(express.static(__dirname + '/public'));
require('./sockets/chat')(io); // Exemplo do Chat
require('./sockets/ping')(io); // Exemplo do Ping
require('./sockets/rooms')(io); // Exemplo Rooms

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});