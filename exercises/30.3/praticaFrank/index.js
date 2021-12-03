require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const { PORT = 3000, SOCKET_PORT = 4555 } = process.env;

const news = [];

const socketIoServer = require("http").createServer();

const io = require("socket.io")(socketIoServer, {
  cors: {
    origin: `http://localhost:${PORT}`, // origem permitida
    methods: ["GET", "POST"], // métodos permitidos
  },
});

const controllers = require("./controllers");
const middlewares = require("./middlewares");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  cors({
    origin: `http://localhost:${PORT}`,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Authorization"],
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/dashboard", (req, res) => {
  res.render("board", { news });
});

app.post("/notify", (req, res) => {
  const { title, message } = req.body;

  if (!title || !message) {
    res.status(422).json({ message: "Title ou message faltando" });
  }

  io.emit("notification", { title, message });
  news.push({ title, message });
  // io.on("connection", (socket) => {
  //   // or with emit() and custom event names
  //   socket.emit("notification", { title: "titulo", message: "ola" });
  // });

  res.status(200).json({ message: "Notificação foi emitida" });
});

app.use(middlewares.error);

//Esse aqui é o servidor express rodando na porta 3000
app.listen(PORT, () => {
  console.log(`Express ouvindo na porta ${PORT}`);
});

//Esse é o servidor do socketIO rodando na porta 4555
socketIoServer.listen(SOCKET_PORT);
console.log(`Socket.io ouvindo na porta ${SOCKET_PORT}`);
