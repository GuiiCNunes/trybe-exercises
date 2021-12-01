const net = require('net');
const PORT = 2708;

const socketConnections = [];
let guestId = 0;

const server = net.createServer((socket) => {
  guestId += 1;
  socket.guest = `Usuário ${guestId}`;
  
  socketConnections.push(socket);

  sendMessage(socket.guest, `${socket.guest} entrou no chat.\n`);

  socket.on('end', () => {
    socketConnections.splice(socketConnections.indexOf(socket), 1);
    const message = `${socket.guest} deixou o chat.\n`;
    sendMessage(socket.guest, message);
  });

  socket.on('data', (data) => {
    const message = `${socket.guest} >> ${data.toString()}`;
    sendMessage(socket.guest, message);
  });
  
  socket.on('error', (error) => {
    console.log(`Erro no socket: ${error.message}`);
  });
})

server.on('error', (error) => {
  console.log(`Erro no servidor: ${error.message}`);
});

const sendMessage = ((clientSender, message) => {
  socketConnections.forEach(socket => {
    if(socket.guest === clientSender) return;

    socket.write(message);
  });
});

server.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
