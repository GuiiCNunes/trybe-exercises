const {
  obj1,
  obj2,
  obj3,
} = require('./part1exec5.js')

describe(`Teste se os objetos são identicos`, () => {
  it(`Objeto 1 é identico ao Objeto 2`, () => expect(obj1).toEqual(obj2));
  it(`Objeto 2 é diferente do Objeto 3`, () => expect(obj2).not.toEqual(obj3));
});