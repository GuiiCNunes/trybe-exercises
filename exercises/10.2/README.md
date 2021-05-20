# Bloco 10 - Testes automatizados com Jest

## Jest - Testes Assíncronos

### done()

Utilizado para testar *callbacks* assíncronos. Esse comando faz com que o Jest espere a função terminar, para isso, basta adicioná-lo na última linha da função *test*.

### Promise

A sintaxe dos testes fica um pouco diferente. Dentro da função `test()`, é necessártio chamar a função que se deseja testar, e colocar um `.then()`, e dentro deste os `expect()` necessários. **O resultado da função testada deve ser retornado a função test**, basta colocar um `return` antes da função a ser testada. É uma boa prática invocar a função `expect.assertions()` passando como parâmetro a quantidade de `expect()`presentes no *test* antes do retorno e chamada da função a ser testada. **Lembrar de testar as possibilidades de erros! Para isso, utilize o `catch()` ao invés do `then()` e siga o mesmo procedimento.