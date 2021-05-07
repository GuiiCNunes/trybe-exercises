# Bloco 8 - Higher Order Functions do JavaScript ES6

## JavaScript ES6 - spread operator, parâmetro rest, destructuring e mais

### spread

Espalha valores ao longo de um novo objeto ou array, preservando o antigo. Ele pega o conteúdo de um objeto/array e joga ele dentro de outro, podendo mesclar objetos/arrays. Aceita colocar elementos junto com ele, ficando os elementos criados ali junto com os elementos do objeto/array alvo. Ele seguirá a ordem de elementos conforme o colocado. Sintaxe:

```
...object
...array
```
Exemplos:

```
let newObject = { ...object1 , ...object2, newKey: 'newValue'};
let newArray = [ ...array1, ...array2, 'newElement']
```

O *spread* tambem pode ser usado para passar parâmetros a uma função.

```
const imc = (peso, altura) => (peso / (altura * altura)).toFixed(2);
const patientInfo = [60, 1.7];

console.log(imc(...patientInfo)); // 20.76
```

### rest

Para funções que recebem um número ilimitado de parâmetros. Os parÂmetros são armazenados em um array que pode ser usado dentro da função. Para isso, ao atribuir a função (na assinatura), você coloca um *spread*(`...`) antes do parâmetro que será esse array. Assim, pode chamar esse parâmetro (sem o *spread*) dentro da função.

### object destructuring

Desestruturação de objeto, agiliza o acesso de valores dentro de um objeto. Para isso, basta declarar uma variável com o nome da chave que deseja e cercada chaves `{ }` e atribuíla o objeto que possui essa chave e o valor pedido. Para uso, apenas o identificador sem as chaves. Pode ser pega mais de uma chave, ambas serão variáveis independentes. Caso a chave não existe, a variável recebe um *undefined* como valor. Sintaxe:

```
let { key } = object;
let { key1, key2 } = object;
```

Tambem é possível reatribuir o identificador da variável.
`let { key1: newId1 , key2: newId2 } = object;`

O *object destructuring* pode ser utilizado como parâmetro de uma função. Sendo:

```
const obj = { key1: value1, ke2: value2 };
const sum = ({ke1, key2}) => key1 + key2;
```

É possível *desestruturar* um objeto dentro de outro na mesma desistruturação, basta apontar a *key* do objeto interno seguido da nova desestruturação. Ex.:

```
let {key1, key2, objInner: {keyInner1, keyInner2}} = obj;
```

### array destructuring

Semelhante ao object, porem utiliza colchetes `[]`. Os valores são atribuidos as variáveis na ordem em que estão no *array*, por não possuir *keys*.

```
const [first, second, third] = array;
```

