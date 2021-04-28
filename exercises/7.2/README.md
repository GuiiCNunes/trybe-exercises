# Bloco 7 - Introdução à JavaScript ES6 e Testes Unitários

## JavaScript ES6 - Objects

### Métodos para interagir com objetos

- `Object.keys` Acessar todas as chaves do objeto.
- `Object.entries` Acessar todos os pares *chave-valor*.
  Retorna um *Array* contendo outros *arrays*, duplas de *chave-valor*.
- `Object.assign` Copiar um objeto.
  Ele recebe como parâmetro um objeto, que será o destino da copia, seguido de quantos objetos forem necessários. Assim todo o conteúdo dos demais é incorporado no primeiro. **TODAS AS ALTERAÇÕES FEITAS NO CLONE REFLETEM NO ORIGINAL**. Para *driblar* isso, a função pode ser atribuida a uma nova variável(que será um objeto) com o primeiro parâmetro `{}`.
- `Object.values` Acessar todos os valores.

### Links

- [Object.entries()](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
- [Object.values()](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/values)
- [Object.keys()](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
- [How to Use Object.keys in JavaScript](https://levelup.gitconnected.com/learn-about-object-keys-in-javascript-cf2967ba6401)
- [Cuidado com Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
- [Convertendo objetos em arrays](https://www.samanthaming.com/tidbits/76-converting-object-to-array/)
- [Como usar métodos Object no JavaScript | DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-use-object-methods-in-javascript-pt)
- [Video sobre Object.assign](https://www.youtube.com/watch?v=JmGJUzNsGFs)