const { myFizzBuzz } = require('./part1exec4.js');

describe(`Testes funções myFizzBuzz()`, () => {
  it(`Faça uma chamada com um número divisível por 3 e 5 e verifique se o retorno é o esperado`, () => {
    expect(myFizzBuzz(15)).toEqual('fizzbuzz');
  });
  it(`Faça uma chamada com um número divisível por 3 e verifique se o retorno é o esperado`, () => {
    expect(myFizzBuzz(12)).toEqual('fizz');
  });
  it(`Faça uma chamada com um número divisível por 5 e verifique se o retorno é o esperado`, () => {
    expect(myFizzBuzz(10)).toEqual('buzz');
  });
  it(`Faça uma chamada com um número que não é divisível por 3 ou 5 e verifique se o retorno é o esperado`, () => {
    expect(myFizzBuzz(7)).toEqual(7);
  });
  it(`Faça uma chamada com um parâmetro que não é um número e verifique se o retorno é o esperado`, () => {
    expect(myFizzBuzz('7')).toBeFalsy();
  });
});