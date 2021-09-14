# Orientação

Para cada execução, utilize o método find() para conferir as alterações nos documentos
O MongoDB possui diversas ferramentas, como, por exemplo, mongo , mongosh , Compass e outras ferramentas de terceiros. Você pode utilizar o que achar melhor para executar as queries . O importante é realizá-las.

# Exercícios

1. Adicione a categoria "superhero" ao filme Batman .
```
db.movies.updateOne(
  { title: "Batman" },
  { $push: { category: "superhero" } },
);
```

2. Utilizando o modificador $each , adicione as categorias "villain" e "comic-based" ao filme Batman
```
db.movies.updateOne(
  { title: "Batman" },
  { $push: { category: { $each: ["villain", "comic-based"] } } },
);
```

3. Remova a categoria "action" do filme Batman .
```
db.movies.updateOne(
  { title: "Batman" },
  { $pull: { category: "action" } },
);
```

4. Remova o primeiro elemento do array category do filme Batman .
```
db.movies.updateOne(
  { title: "Batman" },
  { $pop: { category: -1 } },
);
```

5. Remova o último elemento do array category do filme Batman .
```
db.movies.updateOne(
  { title: "Batman" },
  { $pop: { category: 1 } },
);
```

6. Adicione o elemento "action" ao array category do filme Batman , garantindo que esse valor não se duplique.
```
db.movies.updateOne(
  { title: "Batman" },
  { $addToSet: { category: "action" } },
);
```

7. Adicione a categoria "90's" aos filmes Batman e Home Alone .
```
db.movies.updateMany(
  { title: { $in: ["Batman", "Home Alone"] } },
  { $addToSet: { category: "90's" } },
);
```

8. Crie um array de documentos chamado cast para o filme Home Alone com os seguintes dados:

```
{
  "actor": "Macaulay Culkin",
  "character": "Kevin"
},
{
  "actor": "Joe Pesci",
  "character": "Harry"
},
{
  "actor": "Daniel Stern"
}
```

```
db.movies.updateOne(
  { title: "Home Alone" },
  { $push: { cast: { $each: [
    {
      "actor": "Macaulay Culkin",
      "character": "Kevin"
    },
    {
      "actor": "Joe Pesci",
      "character": "Harry"
    },
    {
      "actor": "Daniel Stern"
    }
  ] } } }
);
```

9. Adicione o campo character com o valor Marv ao array de cast em que o campo actor seja igual a Daniel Stern no filme Home Alone .
Dica : Para isso, leia [aqui](https://docs.mongodb.com/manual/reference/operator/update/positional/) sobre o operador $ .
```
db.movies.updateOne(
  { title: "Home Alone", "cast.actor": "Daniel Stern" },
  { $set: { "cast.$.character": "Marv" } },
);
```

10. Crie um array de documentos chamado cast para o filme Batman com os seguintes dados:
```
{
  "character": "Batman"
},
{
  "character": "Alfred"
},
{
  "character": "Coringa"
}
```

```
db.movies.updateOne(
  { title: "Batman" },
  { $push: { cast: { $each: [
    {
      "character": "Batman"
    },
    {
      "character": "Alfred"
    },
    {
      "character": "Coringa"
    }
  ] } } },
);
```

11. Produza três querys para o filme Batman :
- Adicione o campo actor , que deve ser um array com o valor Christian Bale , ao array de cast em que o campo character seja igual a Batman ;
- Adicione o campo actor , que deve ser um array com o valor Michael Caine , ao array de cast em que o campo character seja igual a Alfred ;
- Adicione o campo actor , que deve ser um array com o valor Heath Ledger , ao array de cast em que o campo character seja igual a Coringa .
Dica : Para isso, leia [aqui](https://docs.mongodb.com/manual/reference/operator/update/positional/) sobre o operador $ .
```
db.movies.updateOne(
  { title: "Batman", "cast.character": "Batman" },
  { $push: { "cast.$.actor": "Christian Bale" } }
);
db.movies.updateOne(
  { title: "Batman", "cast.character": "Alfred" },
  { $push: { "cast.$.actor": "Michael Caine" } }
);
db.movies.updateOne(
  { title: "Batman", "cast.character": "Coringa" },
  { $push: { "cast.$.actor": "Heath Ledger" } }
);
```

12. Adicione aos atores de cast do character Batman do filme Batman os valores "Michael Keaton" , "Val Kilmer" e "George Clooney" , e deixe o array em ordem alfabética.
Dica : Para isso, [leia aqui](https://docs.mongodb.com/manual/reference/operator/update/positional/) sobre o operador $ .
```
db.movies.updateOne(
  { title: "Batman", "cast.character": "Batman" },
  { $push: { "cast.$.actor": { $each: ["Michael Keaton" , "Val Kilmer", "George Clooney"] } } }
);
```
