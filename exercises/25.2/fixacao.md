# Bancos

## Parte 1
```
use agg_example;
db.clients.insertMany([
  { name: "Dave America", State: "Florida" },
  { name: "Ned Flanders", State: "Alasca" },
  { name: "Mark Zuck", State: "Texas" },
  { name: "Edna Krabappel", State: "Montana" },
  { name: "Arnold Schuz", State: "California" },
  { name: "Lisa Simpson", State: "Florida" },
  { name: "Barney Gumble", State: "Texas" },
  { name: "Homer Simpson", State: "Florida" },
]);

db.transactions.insertMany([
  { value: 5900, from: "Dave America", to: "Ned Flanders", bank: 'International' },
  { value: 1000, from: "Mark Zuck", to: "Edna Krabappel", bank: 'FloridaBank' },
  { value: 209, from: "Lisa Simpson", to: "Dave America", bank: 'bankOfAmerica' },
  { value: 10800, from: "Arnold Schuz", to: "Mark Zuck", bank: 'JPMorgan' },
  { value: 850, from: "Barney Gumble", to: "Lisa Simpson", bank: 'Citigroup' },
  { value: 76000, from: "Ned Flanders", to: "Edna Krabappel", bank: 'JPMorgan' },
  { value: 1280, from: "Dave America", to: "Homer Simpson", bank: 'Citigroup' },
  { value: 7000, from: "Arnold Schuz", to: "Ned Flanders", bank: 'International' },
  { value: 59020, from: "Homer Simpson", to: "Lisa Simpson", bank: 'International' },
  { value: 100, from: "Mark Zuck", to: "Barney Gumble", bank: 'FloridaBank' },
]);
```

## Outros

```
use.storage;
db.products.insertMany([
  { "name": "Ball", "purchase_price": 7.6, "taxes": 1.9, "sale_price": 12.5, "quantity": 5 },
  { "name": "Baseball bat", "purchase_price": 18.5, "taxes": 5.3, "sale_price": 39.9, "quantity": 12 },
  { "name": "Sneakers", "purchase_price": 10.4, "taxes": 1.50, "sale_price": 14.9, "quantity": 3 },
  { "name": "Gloves", "purchase_price": 2.85, "taxes": 0.90, "sale_price": 5.70, "quantity": 34 },
  { "name": "Jacket", "purchase_price": 28.9, "taxes": 10.80, "sale_price": 59.9, "quantity": 20 },
  { "name": "Mousepad", "purchase_price": 16.6, "taxes": 3.40, "sale_price": 29.9, "quantity": 8 },
  { "name": "Monitor", "purchase_price": 119.9, "taxes": 39.20, "sale_price": 240.6, "quantity": 11 },
]);
```

# Exercícios

## Parte 1

1. Selecione todos os clientes com as suas respectivas transações feitas;
```
db.clients.aggregate([
  {
    $lookup: {
      from: "transactions",
      let: { client: "$name" },
      pipeline: [
        {
          $match: {
            $expr: {
              $or: [
                { $eq: ["$from", "$$client"] },
                { $eq: ["$to", "$$client"] },
              ]
            }
          }
        }
      ],
      as: "transactions",
    }
  },
]);
```

2. Selecione os quatro primeiros clientes com as suas respectivas transações recebidas ordenados pelo estado em ordem alfabética;
```
db.clients.aggregate([
  {
    $lookup: {
      from: "transactions",
      let: { client: "$name" },
      pipeline: [
        {
          $match: {
            $expr: {
              $or: [
                { $eq: ["$from", "$$client"] },
                { $eq: ["$to", "$$client"] },
              ]
            }
          }
        }
      ],
      as: "transactions",
    },
  },
  { $sort: { State: 1 } },
  { $limit: 4 }
]);
```

3. Selecione todos os cliente do estado da "Florida" e suas respectivas transações recebidas.
```
db.clients.aggregate([
  {
    $match: {
      State: "Florida"
    }
  },
  {
    $lookup: {
      from: "transactions",
      let: { client: "$name" },
      pipeline: [
        {
          $match: {
            $expr: {
              $or: [
                { $eq: ["$from", "$$client"] },
                { $eq: ["$to", "$$client"] },
              ]
            }
          }
        }
      ],
      as: "transactions",
    },
  },
]);
```

## Parte 2

Utilizando o banco de dados storage , faça o seguinte exercício:

1. Calcule qual o custo total de cada produto, considerando o preço de compra e os impostos.
```
db.products.aggregate([
  { $project: { total: { $add: [ "$purchase_price", "$taxes" ] } } }
]);
```

## Parte 3

Utilizando o banco de dados storage , faça o seguinte exercício:
1. Calcule qual o lucro total de cada produto, considerando o preço de compra, os impostos e seu valor de venda.
```
db.products.aggregate([
  { $project: { total: { $subtract: [
    "$sale_price",
    { $add: [ "$purchase_price", "$taxes" ] }
  ] } } }
]);
```

## Parte 4

Utilizando o banco de dados storage , faça os seguintes exercícios:
1. Retorne o menor número inteiro relativo ao preço de venda de cada produto;
```
db.products.aggregate([
  { $project: {
    sale_price: { $floor: "$sale_price" }
  } }
]);
```

2. Retorne o maior número inteiro relativo ao lucro total sobre cada produto. Nota: Desconsiderar taxas (taxes)
```
db.products.aggregate([
  { $project: { total: { $ceil: { $subtract: [
    "$sale_price",
    "$purchase_price"
  ] } } } }
]);
```

## Parte 5

Utilizando o banco de dados storage , faça o seguinte exercício:
1. Calcule o valor absoluto do lucro total de cada produto.
```
db.products.aggregate([
  { $project: { total: { $abs: { $subtract: [
    "$sale_price",
    { $add: [ "$purchase_price", "$taxes" ] }
  ] } } } }
]);
```

## Parte 6

Utilizando o banco de dados storage , faça os seguintes exercícios:
1. Calcule qual o valor total em estoque de cada produto, considerando o preço de venda e a quantidade;
```
db.products.aggregate([
  { $project: { total: {
    $multiply: ["$sale_price", "$quantity"]
  } } }
]);
```

2. Calcule qual será o lucro total de cada produto caso todo o estoque seja vendido.
```
db.products.aggregate([
  { $project: { total: {
    $multiply: [
      { $subtract: [ "$sale_price",{ $add: [ "$purchase_price", "$taxes" ] } ] },
      "$quantity"
    ]
  } } }
]);
```

## Parte 7

Utilizando o banco de dados storage , faça o seguinte exercício:
1. Calcule qual será o preço de venda de cada produto caso haja uma promoção de 50% de desconto.
```
db.products.aggregate([
  { $project: { total: {
    $divide: ["$sale_price", 2]
  } } }
]);
```

## Parte 8

Utilizando o banco de dados storage , faça o seguinte exercício:
1. Calcule o valor total do estoque, considerando que cada produto valha o mesmo que seu preço de venda. Lembre-se da quantidade.
```
db.products.aggregate([
  {
    $addFields: {
      valorTotalEstoque: { $multiply: ["$sale_price", "$quantity"] },
    }
  },
]);
```