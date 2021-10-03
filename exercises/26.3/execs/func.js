const func = (n) => {
  if(typeof n !== 'number') return 'o valor deve ser um número';
  if(n > 0) { return 'positivo'; }
  else if(n < 0) { return 'negativo'; }
  else return 'neutro';
}

module.exports = func;