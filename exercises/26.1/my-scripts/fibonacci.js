const readlineSync = require('readline-sync');

function fibonacci(n) {
  let numbers = [0, 1];
  do {
    const length = numbers.length;
    numbers.push((numbers[length - 2] + numbers[length - 1]));
  } while( numbers.length <= n )
  numbers.shift();
  return numbers;
}

function view() {
  let numero = readlineSync.questionInt('Quantos quer saber?');
  if (numero > 0) {
    console.log(fibonacci(numero));
  } else {
    view();
  }
}

view();