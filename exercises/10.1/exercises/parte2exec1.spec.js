const { TestScheduler } = require('@jest/core');
const {
  encode,
  decode,
} = require('./parte2exec1');

describe(`Testes das funções encode e decode`, () => {
  describe(`1 - Teste se encode e decode são funções`, () => {
    test(`Testa se encode é uma função`, () => expect(typeof encode).toBe('function'));
    test(`Testa se decode é uma função`, () => expect(typeof decode).toBe('function'));
  });
  describe(`2 - Para a função encode teste se as vogais a, e, i, o, u são convertidas em 1, 2, 3, 4 e 5, respectivamente`, () => {
    it(`Testa se o retorno de encode('a') é 1`, () => expect(encode('a')).toBe('1'));
    it(`Testa se o retorno de encode('e') é 2`, () => expect(encode('e')).toBe('2'));
    it(`Testa se o retorno de encode('i') é 3`, () => expect(encode('i')).toBe('3'));
    it(`Testa se o retorno de encode('o') é 4`, () => expect(encode('o')).toBe('4'));
    it(`Testa se o retorno de encode('u') é 5`, () => expect(encode('u')).toBe('5'));
  });
});