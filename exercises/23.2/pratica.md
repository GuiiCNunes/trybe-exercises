# Parte 1

1. Selecione e faça a contagem dos restaurantes presentes nos bairros Queens , Staten Island e Bronx . (utilizando o atributo borough )
`db.restaurants.find({borough: { $in: ['Queens','Staten Island','Bronx'] }}).count()`
2. Selecione e faça a contagem dos restaurantes que não possuem culinária do tipo American . (utilizando o atributo cuisine )
`db.restaurants.find({cuisine: {$ne: 'American'}}).count();`

3. Selecione e faça a contagem dos restaurantes que possuem avaliação maior ou igual a 8 . (utilizando o atributo rating )
`db.restaurants.find({ rating: { $gte: 8 } }).count();`

4. Selecione e faça a contagem dos restaurantes que possuem avaliação menor que 4 .
`db.restaurants.find({ rating: { $lt: 4 } }).count();`

5. Selecione e faça a contagem dos restaurantes que não possuem as avaliações 5 , 6 e 7 .
`db.restaurants.find({ rating: { $nin: [5, 6, 7] } }).count()`

# Parte 2

1. Selecione e faça a contagem dos restaurantes que não possuem avaliação menor ou igual a 5 , essa consulta também deve retornar restaurantes que não possuem o campo avaliação.
```
db.restaurants.find({ $nor: [{rating: {$lte: 5}}] }).count();
```

2. Selecione e faça a contagem dos restaurantes em que a avaliação seja maior ou igual a 6 , ou restaurantes localizados no bairro Brooklyn .
```
db.restaurants.find({$or: [{rating: {$gte: 6}}, {borough: 'Brooklyn'}]}).count();
```

3. Selecione e faça a contagem dos restaurantes localizados nos bairros Queens , Staten Island e Broklyn e possuem avaliação maior que 4 .
```
db.restaurants.find({$and: [{borough: { $in: ['Queens', 'Staten Island', 'Broklyn'] }},{ rating: {$gt: 4} }] }).count();
```

4. Selecione e faça a contagem dos restaurantes onde nem o campo avaliação seja igual a 1 , nem o campo culinária seja do tipo American .
```
db.restaurants.find({ $and: [{ rating: { $not: { $eq: 1 } }, cuisine: { $not:{$eq: 'American' } }  }]}).count();
```
**Poderia usar o ne(`not equal`) na 4.**
5. Selecione e faça a contagem dos resturantes em que a avaliação seja maior que 6 ou menor que 10 , E esteja localizado no bairro Brooklyn , OU não possuem culinária do tipo Delicatessen .
```
db.restaurants.find({
  $or: [
    { cuisine: 'Delicatessen' },
    { $and: [
      { borough: 'Brooklyn' },
      {
        $or: [ 
          { rating: { $gt: 6 } },
          { rating: { $lt: 10 } } 
        ],
      }
    ] }
  ]
}).count();
```

# Parte 3

1. Ordene alfabeticamente os restaurantes pelo nome (atributo name ).
```
db.restaurants.find().sort({ name: 1 });
```

2. Ordene os restaurantes de forma descrescente baseado nas avaliações.
```
db.restaurants.find().sort({ rating: -1 });
```

# Parte 4

1. Remova o primeiro restaurante que possua culinária do tipo Ice Cream, Gelato, Yogurt, Ices .
```
db.restaurants.deleteOne({ cuisine: 'Ice Cream, Gelato, Yogurt, Ices' });
```

2. Remova todos os restaurantes que possuem culinária do tipo American .
```
db.restaurants.deleteMany({ cuisine: 'American' });
```
