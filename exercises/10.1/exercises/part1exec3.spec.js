const { myRemoveWithoutCopy } = require('./part1exec3.js');

describe(`Testes na função myRemoveWithoutCopy()`, () => {
  it(`Verifique se a chamada myRemoveWithoutCopy([1, 2, 3, 4], 3) retorna o array esperado`, () => {
    expect(myRemoveWithoutCopy([1, 2, 3, 4], 3)).toEqual([1, 2, 4]);
  });
  it(`Verifique se a chamada myRemoveWithoutCopy([1, 2, 3, 4], 3) não retorna o array [1, 2, 3, 4]`, () => {
    expect(myRemoveWithoutCopy([1, 2, 3, 4], 3)).not.toEqual([1, 2, 3, 4]);
  });
  it(`Faça uma chamada para a função myRemoveWithoutCopy e verifique se o array passado por parâmetro sofreu alterações`, () => {
    const array = [1, 2, 3, 4];
    expect(myRemoveWithoutCopy(array, 3)).toEqual(array);
  });
  it(`Verifique se a chamada myRemoveWithoutCopy([1, 2, 3, 4], 5) retorna o array esperado`, () => {
    expect(myRemoveWithoutCopy([1, 2, 3, 4], 5)).toEqual([1, 2, 3, 4]);
  });
});