# Bloco 23 - Introdução ao MongoDB

## Filter Operators

- Utilizar os operadores de comparação
  * `$lt` ( less than , menor que, <)
    `db.inventory.find({ qty: { $lt: 20 } })`
  * `$lte` ( less than or equal , menor ou igual a, <=)
    `db.inventory.find({ qty: { $lte: 20 } })`
  * `$gt` ( greater than , maior que, >)
    `db.inventory.find({ qty: { $gt: 20 } })`
  * `$gte` ( greater than or equal , maior ou igual a, >=)
    `db.inventory.find({ qty: { $gte: 20 } })`
  * `$eq` ( equal , igual a, =)
    `db.inventory.find({ qty: { $eq: 20 } })`
    * Equivalente a: `db.inventory.find({ qty: 20 })`
  * `$ne` ( not equal , diferente de, !=, <>)
    `db.inventory.find({ qty: { $ne: 20 } })`
  * `$in` ( in , dentro de)
    `db.inventory.find({ qty: { $in: [ 5, 15 ] } })`
  * `$nin` ( not in , não está dentro de)
    `db.inventory.find( { qty: { $nin: [ 5, 15 ] } } )`
- Utilizar os operadores lógicos
  * `$and` ( and , se todas as condições forem verdadeiras retorna true )
    ```
    db.inventory.find({
      and: [
              { price: { $ne: 1.99 } },
              { price: { $exists: true } }
          ]
      })
    ```
    **OBS.:** Se uma for falsa, ele não verifica as demais.
  * `$or` ( or , se apenas uma condição for verdadeira retorna true )
    `db.inventory.find({ $or: [{ qty: { $lt: 20 } }, { price: 10 }] })`
- Compor filtros avançados com
  * `$not` ( not , inverte o resultado da expressão)
    `db.inventory.find({ price: { $not: { $gt: 1.99 } } })`
    **OBS.:** Ela retorna os valores que não existem tambem.
  * `$nor` ( not or , semelhante ao or , porém trabalha com a condição false )
    `db.inventory.find({ $nor: [{ price: 1.99 }, { sale: true }] })`
    **OBS.:** Retorna o que não possui os atributos das condições, ou os que possuem, mas com valores que **NÃO** satisfação a condição.
- Utilizar o operador
  * `$exists` ( exists , verifica a existência de um atributo)
  ```
  db.inventory.find({ qty: { $exists: true } })

  db.inventory.find({ qty: { $exists: true, $nin: [ 5, 15 ] } })
  ```
- Utilizar o método
  * `sort()` ( sort , ordenar)
    `db.example.find({}, { value, name }).sort({ value: -1 }, { name: 1 })`


**Operadores, quando usados em tipos de *BSON* diferentes, seguem uma [ordem de comparação](https://docs.mongodb.com/manual/reference/bson-type-comparison-order/#bson-types-comparison-order)**

### Sintaxe

```
{ <campo>: { <operador>: <valor> } }
```

**Operadores lógicos:**

```
// NOT
{ campo: { $not: { <operador ou expressão> } } }

// OR
{ $or: [{ <expression1> }, { <expression2> }, ... , { <expressionN> }] }

\\ NOR

{ $nor: [ { <expressão1> }, { <expressão2> }, ...  { <expressãoN> } ] }

// AND
{ $and: [{ <expressão1> }, { <expressão2> } , ... , { <expressãoN> }] }

\\ EXISTS
{ campo: { $exists: <boolean> } }

// Sort
db.colecao.find().sort({ "campo": "1 ou -1"})
```

### Remoção de documentos

Para remover apenas um documento, podendo receber um filtro ou um conjunto de expressões:

```
db.inventory.deleteOne({ status: "D" })
```

**Se nenhum valor for passado, deleta o primeiro documento.**

Para remocer todos os documentos que satisfação o critério de seleção:

```
db.inventory.deleteMany({ status : "A" })
```

**Para remover todos, basta não passar nenhum parâmetro.**

Para remover o banco:

```
db.dropDatabase();
```

## Links

- [Query and Projection Operators](https://docs.mongodb.com/manual/reference/operator/query/)
- [Collection Methods](https://docs.mongodb.com/manual/reference/method/js-collection/)

