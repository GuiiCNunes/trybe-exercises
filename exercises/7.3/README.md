# Bloco 7 - Introdução à JavaScript ES6 e Testes Unitários

## Testes unitários em JavaScript

### NodeJS Assert

Sintaxe: 
```
const assert = require('assert');
```

- `.strictEqual()` método que compara o primeiro e o segundo parâmetro, utilziando o `===`. Podendo ter um terceiro parâmetro, que será a mensagem exibida no erro.
- `.equal()` método que faz a comparação utilizando `==`.
- `.notStrictEqual()` método que espera ter um valor diferente do passado.
- `.deepStrictEqual()` utilizado para comparar objetos(pega array tmabem).
- `.notDeepStrictEqual()` método que espera ter um valor diferente do passado.
- `.ok()`
- `.fail()`
- `.throws()` verifica se o erro foi lançado.
  - Primeiro parâmetro é a função.
  - Segundo é o erro esperado.
  - Ex: `assert.throws(() => { division(10, 0); }, /^Error: parameter y must not be 0$/); // OK`

### Throws

```
throw new Error('')
```

Entre os parênteses vai a mensagem do erro.
## Links

- [Repositório com as pricnipais ferramentas de testes por linguagem](https://github.com/atinfo/awesome-test-automation)
- [Documentação dos métodos do Assert](https://nodejs.org/api/assert.htmls)
- [Mais exemplos e quando cada método é utilizado](https://nelsonic.gitbooks.io/node-js-by-example/content/core/assert/README.html)
- [Tabela Assert](https://www.w3schools.com/nodejs/ref_assert.asp)
- [Documentação throw](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/throw)
- [Documentação error](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Error)
- [Testes unitários: Entendendo o conceito por trás da definição](https://blog.paulagrangeiro.com.br/1-testes-unit%C3%A1rios-entendendo-o-conceito-por-tr%C3%A1s-da-defini%C3%A7%C3%A3o-f3a4bace71c9)
- [NPM Assert Module Documentation](https://nodejs.org/api/assert.html)
- [When I follow TDD](https://kentcdodds.com/blog/when-i-follow-tdd) **Recomendado pelo Pablo**
- [Top 8 benefits of unit testing](https://dzone.com/articles/top-8-benefits-of-unit-testing)
- [Unit testing critical for improving software quality](https://searchsoftwarequality.techtarget.com/news/1265369/Unit-testing-critical-for-improving-software-quality)
- [Happy Path vs. Testing Edge Cases](https://teamtreehouse.com/library/happy-path-vs-testing-edge-cases)
- [GitHub Awesome Katas](https://github.com/gamontal/awesome-katas)
- [Mocha JS Documentation](https://mochajs.org/#installation)
- [Chai JS Documentation](https://www.chaijs.com/guide/)
- [Katas to learn TDD](https://kata-log.rocks/tdd)
- [Programming with Wolfgang - TDD Katas](https://www.programmingwithwolfgang.com/tdd-kata/)
- [Test Driven Development (TDD): Example Walkthrough](https://technologyconversations.com/2013/12/20/test-driven-development-tdd-example-walkthrough/)
- [Test Driven Development - Wikipedia](https://en.wikipedia.org/wiki/Test-driven_development)
- [Apresentação da ThoughtWorks sobre TDD](https://agileindia.org/uploads/downloads/TDD.pdf)
- [Sort no braço](https://khan4019.github.io/front-end-Interview-Questions/sort.html) **Recomedação Panta**
