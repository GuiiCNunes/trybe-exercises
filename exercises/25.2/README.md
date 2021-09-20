# Bloco 25 - MongoDB: Aggregation Framework

## Aggregation Framework - Parte 2

Uma forma de incrementar o `$lookup`, podendo utilizar expressões mais elaboradas, é com os campos:

* `let`: define as variáveis que serão utilizadas no `$pipeline`. Isso porque ele não consegue acessar diretamente os campos dos documentos de entrada.
* `pipeline`: define uma *pipeline* a ser executada na coleção de junção.

![Let e Pipeline](https://s3.us-east-2.amazonaws.com/assets.app.betrybe.com/back-end/mongodb/aggregation-framework/images/lookup-pipeline-light-c83fcf0c18692cacb3785e558b06ccb8.png)

![Exemplo 1 - Banana](https://s3.us-east-2.amazonaws.com/assets.app.betrybe.com/back-end/mongodb/aggregation-framework/images/lookup-pipeline-match-light-f6997617143e022d585899b76b5bc48f.png)

![Exemplo 2 - kiWi](https://s3.us-east-2.amazonaws.com/assets.app.betrybe.com/back-end/mongodb/aggregation-framework/images/lookup-pipeline-match-light1-6c49f645fd7113d91e5fc36a3821590a.png)

### Exemplos

Base:
```
use example_db;
db.orders.insertMany([
  { _id: 1, item: "almonds", price: 12, ordered: 2 },
  { _id: 2, item: "pecans", price: 20, ordered: 1 },
  { _id: 3, item: "cookies", price: 10, ordered: 60 }
]);

use example_db;
db.warehouses.insertMany([
  { _id: 1, stock_item: "almonds", warehouse: "A", instock: 120 },
  { _id: 2, stock_item: "pecans", warehouse: "A", instock: 80 },
  { _id: 3, stock_item: "almonds", warehouse: "B", instock: 60 },
  { _id: 4, stock_item: "cookies", warehouse: "B", instock: 40 },
  { _id: 5, stock_item: "cookies", warehouse: "A", instock: 80 }
]);
```

Função:
```
db.orders.aggregate([
  {
    $lookup: {
      from: "warehouses",
      let: { order_item: "$item", order_qty: "$ordered" },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: [ "$stock_item",  "$$order_item" ] },
                { $gte: [ "$instock", "$$order_qty" ] }
              ]
            }
          }
        },
        { $project: { stock_item: 0, _id: 0 } }
      ],
      as: "stockdata"
    }
  }
]);
```

Resultado:
```
{
  "_id" : 1,
  "item" : "almonds",
  "price" : 12,
  "ordered" : 2,
  "stockdata" : [
    {
      "warehouse" : "A",
      "instock" : 120
    },
    {
      "warehouse" : "B",
      "instock" : 60
    }
  ]
}
{
  "_id" : 2,
  "item" : "pecans",
  "price" : 20,
  "ordered" : 1,
  "stockdata" : [
    {
      "warehouse" : "A",
      "instock" : 80
    }
  ]
}
{
  "_id" : 3,
  "item" : "cookies",
  "price" : 10,
  "ordered" : 60,
  "stockdata" : [
    {
      "warehouse" : "A",
      "instock" : 80
    }
  ]
}
```

**`$` é utilizado para se referir a um campo da tabela utilizada e o `$$` é utilizado para se referir a uma variável declarada no `let`.**

### $add

Com o `$add` é possível somar valores numéricos e datas. Se um argumento for do tipo `date`, o outro será considerado milissegundos e adicionado a data.

#### Exemplos

Base:
```
use sales;
db.sales.insertMany([
  { _id: 1, item: "abc", price: 10, fee: 2, date: ISODate("2014-03-01T08:00:00Z") },
  { _id: 2, item: "jkl", price: 20, fee: 1, date: ISODate("2014-03-01T09:00:00Z") },
  { _id: 3, item: "xyz", price: 5,  fee: 0, date: ISODate("2014-03-15T09:00:00Z") }
]);
```

Função:
```
db.sales.aggregate([
  { $project: { item: 1, total: { $add: ["$price", "$fee"] } } }
]);
```

Resultado:
```
{ "_id" : 1, "item" : "abc", "total" : 12 }
{ "_id" : 2, "item" : "jkl", "total" : 21 }
{ "_id" : 3, "item" : "xyz", "total" : 5 }
```


**O segundo argumento sempre será milissegundos, então há duas opções. Escrever por extenso ou criar uma função para retornar o número desejado.**

```
// Exemplo com 3 dias:
// Por extenso:

db.sales.aggregate([
  { $project: { item: 1, billing_date: { $add: ["$date", 2.592e+8] } } }
]);

// Via função:
db.sales.aggregate([
  { $project: { item: 1, billing_date: { $add: ["$date", 3 * 24 * 60 * 60000] } } }
]);
```

### $subtract

Para subtrair dois valores numéricos e retornar a diferença entre eles: `$subtract`. Funciona com datas, no mesmo esquema do `$add`. **Segundo argumento sempre será subtraído do primeiro**.

#### Exemplo

Base:
```
db.sales.insertMany([
  {
    _id: 1,
    item: "abc",
    price: 10,
    fee: 2,
    discount: 5,
    date: ISODate("2014-03-01T08:00:00Z")
  },
  {
    _id: 2,
    item: "jkl",
    price: 20,
    fee: 1,
    discount: 2,
    date: ISODate("2014-03-01T09:00:00Z")
  }
]);
```

**Utilizando `$add` e `$subtract`:**
```
db.sales.aggregate([
  {
    $project: {
      item: 1,
      total: {
        $subtract: [
          { $add: ["$price", "$fee"] },
          "$discount"
        ]
      }
    }
  }
]);
```

Resultado:
```
[
  { _id: 1, item: 'abc', total: 7 },
  { _id: 2, item: 'jkl', total: 19 }
]
```

**Duas datas:**
```
db.sales.aggregate([
  {
    $project: {
      item: 1,
      dateDifference: {
        $subtract: ["$$NOW", "$date"]
      }
    }
  }
]);

// Outra opção
db.sales.aggregate([
  {
    $project: {
      item: 1,
      dateDifference: {
        $subtract: [new Date(), "$date"]
      }
    }
  }
]);
```

Resultado:
```
[
  { _id: 1, item: 'abc', dateDifference: Long("238511991252") },
  { _id: 2, item: 'jkl', dateDifference: Long("238508391252") }
]
```

### $ceil

Para arredondar para cima, `$ceil`.

#### Exemplos

Base:
```
db.samples.insertMany([
  { _id: 1, value: 9.25 },
  { _id: 2, value: 8.73 },
  { _id: 3, value: 4.32 },
  { _id: 4, value: -5.34 }
]);
```

Função:
```
db.samples.aggregate([
  { $project: { value: 1, ceilingValue: { $ceil: "$value" } } }
]);
```

Resultado:
```
{ "_id" : 1, "value" : 9.25, "ceilingValue" : 10 }
{ "_id" : 2, "value" : 8.73, "ceilingValue" : 9 }
{ "_id" : 3, "value" : 4.32, "ceilingValue" : 5 }
{ "_id" : 4, "value" : -5.34, "ceilingValue" : -5 }
```

### $floor

Para arredondar para baixo: `$floor`.

#### Exemplos

Base igual ao do `$ceil`.
Função:
```
db.samples.aggregate([
  { $project: { value: 1, floorValue: { $floor: "$value" } } }
]);
```

Resultado:
```
{ "_id" : 1, "value" : 9.25, "floorValue" : 9 }
{ "_id" : 2, "value" : 8.73, "floorValue" : 8 }
{ "_id" : 3, "value" : 4.32, "floorValue" : 4 }
{ "_id" : 4, "value" : -5.34, "floorValue" : -6 }
```

### $round

O `$round` arredonda para o número mais próximo, permitindo escolher a quantidade de casas decimais.

#### Exemplos

Base igual ao dos anteriores.
Query:
```
db.samples.aggregate([
  { $project: { value: 1, roundedValue: { $round: ["$value"] } } }
]);
```

**`$round` recebe um array, diferente dos anteriores.** Segundo valor do array é a quantidade de números decimais:
```
db.samples.aggregate([
  { $project: { value: 1, roundedValue: { $round: ["$value", 1] } } }
]);
```

Resultado:
```
{ "_id" : 1, "value" : 9.25, "roundedValue" : 9.2 }
{ "_id" : 2, "value" : 8.73, "roundedValue" : 8.7 }
{ "_id" : 3, "value" : 4.32, "roundedValue" : 4.3 }
{ "_id" : 4, "value" : -5.34, "roundedValue" : -5.3 }
```

Resultado:
```
{ "_id" : 1, "value" : 9.25, "roundedValue" : 9 }
{ "_id" : 2, "value" : 8.73, "roundedValue" : 9 }
{ "_id" : 3, "value" : 4.32, "roundedValue" : 4 }
{ "_id" : 4, "value" : -5.34, "roundedValue" : -5 }
```

### $abs

Para encontrar o [valor absoluto](https://github.com/tryber/sd-011-mongodb-aggregations) de um número, utiliza-se o `$abs`.

#### Exemplos

Base:
```
db.ratings.insertMany([
  { _id: 1, start: 5, end: 8 },
  { _id: 2, start: 4, end: 4 },
  { _id: 3, start: 9, end: 7 },
  { _id: 4, start: 6, end: 7 }
]);
```

**Encontrando a diferença entre dois números:**
```
db.ratings.aggregate([
  {
    $project: {
      delta: {
        $abs: { $subtract: ["$start", "$end"] }
      }
    }
  }
]);
```

Resultado:
```
{ "_id" : 1, "delta" : 3 }
{ "_id" : 2, "delta" : 0 }
{ "_id" : 3, "delta" : 2 }
{ "_id" : 4, "delta" : 1 }
```

### $multiply

Para multiplicar dois valores numéricos: `$multiply`. **Recebe um array**.

#### Exemplos

Base:
```
db.sales.insertMany([
  { _id: 1, item: "abc", price: 10, quantity: 2, date: ISODate("2014-03-01T08:00:00Z") },
  { _id: 2, item: "jkl", price: 20, quantity: 1, date: ISODate("2014-03-01T09:00:00Z") },
  { _id: 3, item: "xyz", price: 5, quantity: 10, date: ISODate("2014-03-15T09:00:00Z") }
]);
```

Função:
```
db.sales.aggregate([
  {
    $project: {
      date: 1,
      item: 1,
      total: {
        $multiply: ["$price", "$quantity"]
      }
    }
  }
]);
```

Resultado:
```
{ "_id" : 1, "item" : "abc", "date" : ISODate("2014-03-01T08:00:00Z"), "total" : 20 }
{ "_id" : 2, "item" : "jkl", "date" : ISODate("2014-03-01T09:00:00Z"), "total" : 20 }
{ "_id" : 3, "item" : "xyz", "date" : ISODate("2014-03-15T09:00:00Z"), "total" : 50 }
```

### $divide

Recebendo como primeiro argumento o dividendo e o segundo como divisor, o `$divide` divide dois valores.

#### Exemplos

Base:
```
db.planning.insertMany([
  { _id: 1, name: "A", hours: 80, resources: 7 },
  { _id: 2, name: "B", hours: 40, resources: 4 }
]);
```

**Dividir o `hours` por 8:**
```
db.planning.aggregate([
  {
    $project: {
      name: 1,
      workdays: {
        $divide: ["$hours", 8]
      }
    }
  }
]);
```

Resultado:
```
{ "_id" : 1, "name" : "A", "workdays" : 10 }
{ "_id" : 2, "name" : "B", "workdays" : 5 }
```

### $addFields

Para adicionar novos campos ao documento, utiliza-se o `$addFields`. Sua saída são todos os campos do documento de entrada mais os adicionados.

#### Exemplos

Base:
```
db.scores.insertMany([
  {
    _id: 1,
    student: "Maya",
    homework: [10, 5, 10],
    quiz: [10, 8],
    extraCredit: 0
  },
  {
    _id: 2,
    student: "Ryan",
    homework: [5, 6, 5],
    quiz: [8, 8],
    extraCredit: 8
  }
]);
```

Operação:
```
db.scores.aggregate([
  {
    $addFields: {
      totalHomework: { $sum: "$homework" } ,
      totalQuiz: { $sum: "$quiz" }
    }
  },
  {
    $addFields: {
      totalScore: {
        $add: [ "$totalHomework", "$totalQuiz", "$extraCredit" ]
      }
    }
  }
]);
```

Resultado:
```
{
  "_id" : 1,
  "student" : "Maya",
  "homework" : [ 10, 5, 10 ],
  "quiz" : [ 10, 8 ],
  "extraCredit" : 0,
  "totalHomework" : 25,
  "totalQuiz" : 18,
  "totalScore" : 43
}
{
  "_id" : 2,
  "student" : "Ryan",
  "homework" : [ 5, 6, 5 ],
  "quiz" : [ 8, 8 ],
  "extraCredit" : 8,
  "totalHomework" : 16,
  "totalQuiz" : 16,
  "totalScore" : 40
}
```

**OBS.:** Os campos originais são preservados, bem como novos campos podem ser utilizados em calculos futuros.

## Links

* [MongoDB Aggregation Cheat Sheet](https://github.com/tryber/Trybe-CheatSheets/blob/master/backend/mongodb/mongodb_aggregation/README.md)
* [SQL to Aggregation Mapping Chart](https://docs.mongodb.com/manual/reference/sql-aggregation-comparison/)
* [Aggregation Pipeline Quick Reference](https://docs.mongodb.com/manual/meta/aggregation-quick-reference/)
* [Aggregation Commands](https://docs.mongodb.com/manual/reference/operator/aggregation/interface/)
* [Aggregation Commands Comparison](https://docs.mongodb.com/manual/reference/aggregation-commands-comparison/)
