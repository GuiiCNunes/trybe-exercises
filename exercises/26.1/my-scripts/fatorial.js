const readlineSync = require('readline-sync');

function fatorial(n) {
  return n === 1 ? 1 : n * fatorial(n - 1);
}

function view() {
  let numero = readlineSync.questionInt('Qual número deseja saber o fatorial?');
  if (numero > 0) {
    console.log(fatorial(numero));
  } else {
    view();
  }
}

view();