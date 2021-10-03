const { expect } = require('chai');
const func = require('../func')

describe('Teste função: se é negativo ou positivo', () => {
  it('recebe um número como parâmetro e retorna uma string', () => {
    const result = func(1);

    expect(result).to.be.a('string');
  });
  describe('o número passado for maior que 0 deverá retornar "positivo", quando for menor que 0 deverá retornar "negativo" e quando igual a 0 deverá retornar "neutro"', () => {
    it(`numero passado maior que 0 deve retornar 'positivo'`, () => {
      const result = func(1);
      expect(result).to.be.a('string');
      expect(result).to.be.equal('positivo');
    });
    it(`numero passado menor que 0 deve retornar 'negativo'`, () => {
      const result = func(-1);
      expect(result).to.be.a('string');
      expect(result).to.be.equal('negativo');
    });
    it(`numero passado 0 deve retornar 'neutro'`, () => {
      const result = func(0);
      expect(result).to.be.a('string');
      expect(result).to.be.equal('neutro');
    });
  });
  describe('passando um valor que não seja um número', () => {
    it(`passado 'test' deve retornar 'o valor deve ser um número'`, () => {
      const result = func('test');
      expect(result).to.be.a('string');
      expect(result).to.be.equal('o valor deve ser um número');
    });
  });
});