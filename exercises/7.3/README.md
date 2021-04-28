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

