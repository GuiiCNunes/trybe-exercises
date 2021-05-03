# Bloco 8 - Higher Order Functions do JavaScript ES6

## JavaScript ES6 - Higher Order Functions - forEach, find, some, every, sort

### Array.forEach

Percorre o *Array* como um `for`, mas mais simples para declarar.
**Não possui retorno.**

```
array.forEach((elemento) => { 
  console.log(elemento);
});
```
Pode chamar mais dois parâmetros adicionais, sendo o index do elemento e o array em sí, nessa ordem.
[Exemplo com HTML no Codepen.](https://codepen.io/pen/?template=LYZPEwV)


### Array.find

Encontrar o primeiro elemento que satisfaça a condição passada, para isso, a função passada precisa retornar *true* ou *false*. [Documentação](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/find).

```
array.find((elemento) => 
  elemento === 1
);
```
Pode chamar mais dois parâmetros adicionais, sendo o index do elemento e o array em sí, nessa ordem.

### Array.some

Retorna *true* se **ao menos um** elemento do array satisfaz a uma condição.
*callback* é invocado com três argumentos: o valor do elemento, o índice do elemento, e o array onde a função foi chamada. [Documentação](https://developer.cdn.mozilla.net/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/some).
**Não altera o array.**
[Exemplo CodePen](https://codepen.io/pen/?template=abZoOZz).

### Array.every

Retorna *true* se **todos** elementos do array satisfaçam a uma condição.
A função *callback* é chamada com três argumentos: o valor do elemento corrente, o índice do elemento corrente e o array original que está sendo percorrido. [Documentação](https://developer.cdn.mozilla.net/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/every).
**Não altera o array.**
[Exemplo CodePen](https://codepen.io/pen/?template=NWrKqME).

### Array.sort

Ordenar um *array* com um critério específico.
**Padrão:** Ordena por ordem alfabética caso não seja passado ennhum parâmetro.
Para ordenar de forma numérica em ordem crescente, passe como parâmetro a função: `(a, b) => a - b`
[Documentação](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).
[Exemplo do CodePen](https://codepen.io/pen/?template=gOMYaXy).
**Altera o Array**;
