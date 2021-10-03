const { expect } = require('chai');
const write = require('../write');
const fs = require('fs');
const sinon = require('sinon');

describe('Teste de função de escrita', () => {
  before(() => {
    sinon.stub(fs, 'writeFileSync').returns('ok');
  });
  after(() => {
    fs.writeFileSync.restore();
  });  
  it('testa se o retorno da função é "ok", ao receber dois parâmetros', () => {
    const result = write('test.txt', 'Teste de documento');
    expect(result).to.be.a('string');
    expect(result).to.be.equal('ok');
  });
});