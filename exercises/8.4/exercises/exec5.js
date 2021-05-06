const assert = require('assert');

const names = [
  'Aanemarie', 'Adervandes', 'Akifusa',
  'Abegildo', 'Adicellia', 'Aladonata',
  'Abeladerco', 'Adieidy', 'Alarucha',
];

function containsA() {
  return names.reduce(
    ( (arr, curt) => 
    curt.split('').filter( (element) => element.match(/[a|A]/g)).length + arr)
    , 0
  );
}

assert.deepStrictEqual(containsA(), 20);