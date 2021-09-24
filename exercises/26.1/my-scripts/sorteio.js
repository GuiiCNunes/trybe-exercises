const readlineSync = require('readline-sync');

function getRandomNumb() {
  return Math.floor(Math.random() * 11);
}

function view() {
  let number = getRandomNumb();
  let guess = readlineSync.questionInt('Qual o seu chute?\n');
  let response = `Opa, não foi dessa vez. O número era ${number}\n`;
  if(guess === number) {
    response = 'Parabéns, número correto!\n';
  }
  console.log(response);

  let contin = readlineSync.questionInt('Deseja jogar novamente?\n[1] - Sim\n[2] - Não\n');
  if (contin === 1) { view() };
}

module.exports = view;