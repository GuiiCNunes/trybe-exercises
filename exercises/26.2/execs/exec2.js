const calc = require('./exec1');

function randomNumber() {
  return Math.floor(Math.random() * 100 + 1);
}

function start() {
  calc(randomNumber(), randomNumber(), randomNumber())
    .then((data) => console.log(data))
    .catch(err => console.log(err));
}

start();