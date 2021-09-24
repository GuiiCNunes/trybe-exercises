const readlineSync = require('readline-sync');
const sorteio = require('./sorteio');
const velocidade = require('./velocidade');
const imc = require('./imc');
const fatorial = require('./fatorial');

function start() {
  let selectOption = readlineSync.questionInt('Qual pacote quer utilizar?\n[1] - Sorteio\n[2] - Velocidade\n[3] - IMC\n[4] - Fatorial\n[5] - Fibonnaci');
  switch (selectOption) {
    case 1:
      sorteio();
      break;
    case 2:
      velocidade();
      break;
    case 3:
      imc();
      break;
    case 4:
      fatorial();
      break;
    case 5:
      fibonacci();
      break;
    default:
      console.log('Opção não encontrada');
      start();
  }
}

start();
