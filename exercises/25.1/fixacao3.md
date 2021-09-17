Utilizando o banco de dados agg_example , adicione a seguinte collection e faça os exercícios:

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
```

1. Selecione todos os clientes com as suas respectivas transações feitas;
```
db.clients.aggregate([
  {
    $lookup: {
      from: "transactions",
      localField: "name",
      foreignField: "from",
      as: "transactions",
    }
  }
]);
```

2. Selecione quatro clientes com as suas respectivas transações recebidas;
```
db.clients.aggregate([
  {
    $lookup: {
      from: "transactions",
      localField: "name",
      foreignField: "to",
      as: "transactions",
    }
  },
  { $limit: 4 }
]);
```

3. Selecione todos os cliente do estado da "Florida" e suas respectivas transações recebidas.
```
db.clients.aggregate([
  {
    $lookup: {
      from: "transactions",
      localField: "name",
      foreignField: "from",
      as: "transactions",
    }
  },
  {
    $match: {
      State: "Florida"
    }
  }
]);
```
