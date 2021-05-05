# Bloco 8 - Higher Order Functions do JavaScript ES6

## JavaScript ES6 - Higher Order Functions - reduce

### Array.reduce

O *reduce* percorre um *array* executando uma função em todos os seus elementos, retornando um valor final. Para isso, a função que ele recebe deve possuir dois parâmetros o primeiro o resultado(acumulador) e o segundo o elemento atual(*current*). Assim o *reduce* pega o resultado, e utiliza no calculo junto com o elemento atual, depois pega o resultado desse processo e aplica com o próximo elemento, que depois pega o resultado e aplica com o seguinte. E assim por diante.
Retorna um valor ao final.
Pode ser passado um **segundo parâmetro após a função**, esse será o resultado(acumulador) inicial. Caso não seja passado nada, o valor inicial é o primeiro elemento.

```
array.reduce((result, current) => result + current);

array.reduce(function, firstResult);
```

## Links

- [Artigo com gifs explicando map, filter e reduce](https://jstutorial.medium.com/map-filter-and-reduce-animated-7fe391a35a47)