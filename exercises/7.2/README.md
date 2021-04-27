# Bloco 7 - Introdução à JavaScript ES6 e Testes Unitários

## JavaScript ES6 - Objects

### Métodos para interagir com objetos

- `Object.keys` Acessar todas as chaves do objeto.
- `Object.entries` Acessar todos os pares *chave-valor*.
  Retorna um *Array* contendo outros *arrays*, duplas de *chave-valor*.
- `Object.assign` Copiar um objeto.
  Ele recebe como parâmetro um objeto, que será o destino da copia, seguido de quantos objetos forem necessários. Assim todo o conteúdo dos demais é incorporado no primeiro. **TODAS AS ALTERAÇÕES FEITAS NO CLONE REFLETEM NO ORIGINAL**. Para *driblar* isso, a função pode ser atribuida a uma nova variável(que será um objeto) com o primeiro parâmetro `{}`.
- `Object.values` Acessar todos os valores.