const readlineSync = require('readline-sync');

function calcIMC(peso, altura) {
  return peso / (altura *2)
}

function getClassic(imc){
  let classic;

  if( imc <= 18.5 ) { classic = "Abaixo do peso (magreza)"; }
  else if( imc <= 24.9 ) { classic = "Peso normal"; }
  else if( imc <= 29.9 ) { classic = "Acima do peso (sobrepeso"; }
  else if( imc <= 34.9 ) { classic = "Obesidade grau I"; }
  else if( imc <= 39.9 ) { classic = "Obesidade grau II"; }
  else { classic = "Obesidade graus III e IV " }

  return classic;
}


function view() {
  let peso = readlineSync.questionFloat('Qual é seu peso?');
  let altura = readlineSync.questionFloat('Qual é sua altura?');
  let imc = calcIMC(peso,altura);

  console.log(`Seu imc é: ${imc}; Seu grau é: ${getClassic(imc)}`);
}

module.exports = view;