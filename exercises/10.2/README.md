# Bloco 10 - Testes automatizados com Jest

## Jest - Testes Assíncronos

### done()

Utilizado para testar *callbacks* assíncronos. Esse comando faz com que o Jest espere a função terminar, para isso, basta adicioná-lo na última linha da função *test*.

### Promise

A sintaxe dos testes fica um pouco diferente. Dentro da função `test()`, é necessártio chamar a função que se deseja testar, e colocar um `.then()`, e dentro deste os `expect()` necessários. **O resultado da função testada deve ser retornado a função test**, basta colocar um `return` antes da função a ser testada. É uma boa prática invocar a função `expect.assertions()` passando como parâmetro a quantidade de `expect()`presentes no *test* antes do retorno e chamada da função a ser testada. **Lembrar de testar as possibilidades de erros! Para isso, utilize o `catch()` ao invés do `then()` e siga o mesmo procedimento.

### Async/Await

Para estes testes, acrescente o `async`na função que o `test()` recebe como parâmetro. Atribua o valor de retorno da função a ser testada, com `await`, a uma variável e depois teste ela dentro com o `expect`desejado. Para testar a captura de erros, utilize blocos `try` `catch`. **Não precisa fazer o retorno para o `test()`.

### Matcher .resolves / .rejects

Outro meio de tratar *promises* é utilizando os *matchers* `.resolve` e `.reject`. O `resolve` espera que a *promise* seja resolvida, caso seja rejeitada ele falha. O `reject`espera que a *promise* seja rejeitada, se for resolvida ele falha. Eles são colocados após o `expect` e antes do *matcher*. Sintaxe:

```
expect(funcToResolve()).resolve.toEqual();
expect(funcToReject()).reject.toEqual();
```

Para o uso de `Promise`, ainda necessita do `return` para o `test()`, no caso do uso com `async`não precisa do `try/catch`.

### Setup e Teardown

O *setup* é um comando padrão que é executado sempre antes de cada teste, já o *teardown* é um comando padrão que é sempre executado após cada teste. Uma boa prática é **agrupá-los dentro de um escopo de teste**, o `describe`.
Para configurar o *setup* utilize a função `beforeEach()`, passando como parâmetro a função que deseja executar.

```
beforeEach(() => {
  // Script for setup;
});
```

Para configurar o *teardown*, utilize a função `afterEach()`, passando como parâmetro a função que deseja executar.

```
afterEach(() => {
  // Script for teardown;
});
```

*Para utilizar código assíncrono dentro delas, apenas retorne a promise final.* 

## Links

- [Jest - Testing Asynchronous Code - Video](https://www.youtube.com/watch?v=Y4PHrT6Cc_A)
- [Jest - Testing Asynchronous Code - Leitura](https://deltice.github.io/jest/docs/pt-BR/asynchronous.html#content)
- [Testing Asynchronous Code](https://jestjs.io/docs/en/asynchronous)
- [An Async Example](https://jestjs.io/docs/en/tutorial-async)
- [Setup and Teardown](https://jestjs.io/docs/en/setup-teardown)
- [Jest - Setup and Teardown - Video](https://www.youtube.com/watch?v=wWx9uZa-Wnk)