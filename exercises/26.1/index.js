// index.js
// const convert = require('./brlValue');

// const usd = 10;
// const brl = convert(usd);

// console.log(brl) // 53.7
//------------------------------------

// index.js
// const brlValue = require('./brlValue');

// console.log(brlValue); // { brl: 5.37, usdToBrl: [Function: usdToBrl] }

// console.log(`Valor do dólar: ${brlValue.brl}`); // Valor do dólar: 5.37
// console.log(`10 dólares em reais: ${brlValue.usdToBrl(10)}`); // 10 dólares em reais: 53.7

//------------------------------------
const { brl, usdToBrl } = require('./brlValue');

console.log(`Valor do dólar: ${brl}`); // Valor do dólar: 5.37
console.log(`10 dólares em reais: ${usdToBrl(10)}`); // 10 dólares em reais: 53.7

//------------------------------------
// minha-aplicacao/index.js
const meuModulo = require('./meuModulo');1

console.log(meuModulo); // { funcionalidade1: [Function: funcionalidade1], funcionalidade2: [Function: funcionalidade2] }

meuModulo.funcionalidade1();
