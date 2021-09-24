async function exec1(a, b, c) {
  if (typeof a !== 'number' || typeof b !== 'number' || typeof c !== 'number'  ) {
    return new Error('Informe apenas números');
  }

  let calc = ( (a + b) * c );

  return calc < 50 ? new Error('Valor muito baixo') : calc;
}

module.exports = exec1;
