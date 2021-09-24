const calc = require('./exec1');

function randomNumber() {
  return Math.floor(Math.random() * 100 + 1);
}

async function start() {
  try {
    let result = await calc(randomNumber(), randomNumber(), randomNumber());
    console.log(result);
  } catch(err) {
    console.log(err);
  }
}

start();
