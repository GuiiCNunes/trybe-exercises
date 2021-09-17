Utilizando o banco de dados agg_example e a coleção transactions , faça os exercícios:

1. Selecione todos os bancos, ou seja, valores do campo bank ;
```
db.transactions.aggregate(
  [{ $group: { _id: "$bank" } }]
);
```

2. Selecione o valor total das transações em cada banco e quantas são;
```
db.transactions.aggregate(
  [{ $group: {
    _id: "$bank",
    totalTrans: { $sum: "$value" },
    countTrans: { $sum: 1 },
  } }]
);
```

3. Selecione o valor total de transações por banco;
```
db.transactions.aggregate(
  [{ $group: {
    _id: "$bank",
    totalTrans: { $sum: "$value" },
  } }]
);
```

4. Selecione os bancos que têm o valor total de transações maior que 1000.
```
db.transactions.aggregate(
  [
    { $group: {
      _id: "$bank",
      totalTrans: { $sum: "$value" },
    } },
    { $match: { "totalTrans": { $gt: 1000 } } },
  ]
);
```
