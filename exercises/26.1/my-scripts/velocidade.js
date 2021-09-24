const readlineSync = require('readline-sync');

function getVelo(dist, temp) {
  return dist / temp;
}

function view() {
  let distancia = readlineSync.questionInt('Qual foi a distância?');
  let tempo = readlineSync.questionInt('Qual foi o tempo?');

  console.log(getVelo(distancia, tempo));
}

module.exports = view;