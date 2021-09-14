# Bloco 24 - MongoDB: Updates Simples e Complexos

## Updates Complexos - Arrays - Parte 1

### $push

O operador `$push` adiciona um novo elemento no *array* de um determinado campo, caso o campo não exista, será criado.

```
{ $push: { <campo1>: <valor1>, ... } }
```

É possível adicionar modificadores junto com o `$push`, como:

- `$each` : Adiciona múltiplos valores a um array ;
- `$slice` : Limita o número de elementos do array . Requer o uso do modificador `$each` ;
- `$sort` : Ordena os elementos do array . Requer o uso do modificador `$each` ;
- `$position` : Especifica a posição do elemento que está sendo inserido no array . Também requer o modificador `$each` . Sem o modificador `$position` , o operador `$push` adiciona o elemento no final do array .

Quando um modificador é utilizado, **a ordem** do `$push` segue:

1. Altera o *array* para adicionar os elementos na posição correta.
2. Aplica ordenação (`$sort`), se utilizada.
3. Limita o *array* (`$slice`), se usado.
4. Armazena o *array*.

#### Exemplos

```
use sales;
db.supplies.updateOne(
  { _id: 1 },
  {
push: {
      items: {
        "name": "notepad",
        "price":  35.29,
        "quantity": 2,
      },
    },
  },
  { upsert: true },
);

// Resultado:
{
    _id : 1,
    items : [
        {
            "name" : "notepad",
            "price" : 35.29,
            "quantity" : 2,
        },
    ],
}
```

**OBS.**: No exemplo a *query* está fazendo a inserção e a atualização ao mesmo tempo, com o uso do `upsert: true`. Este não influencia no `$push`. [Documentação](https://docs.mongodb.com/manual/reference/method/db.collection.update/).

**Colocando multiplos valores:**
```
db.supplies.updateOne(
  {},
  {
    push: {
      items: {
        each: [
          {
            "name": "pens",
            "price": 56.12,
            "quantity": 5,
          },
          {
            "name": "envelopes",
            "price": 19.95,
            "quantity": 8,
          },
        ],
      },
    },
  },
  { upsert: true },
);
```

Resultado:

```
{
  _id : 1,
  items : [
    {
      "name" : "notepad",
      "price" : 35.29,
      "quantity" : 2,
    },
    {
      "name" : "pens",
      "price" : 56.12,
      "quantity" : 5,
    },
    {
      "name" : "envelopes",
      "price" : 19.95,
      "quantity" : 8,
    },
  ],
}
```

**Multiplos Modificadores:**

```
db.supplies.updateOne(
  { _id: 1 },
  {
    push: {
      items: {
        each: [
          {
            "name" : "notepad",
            "price" : 35.29,
            "quantity" : 2,
          },
          {
            "name": "envelopes",
            "price": 19.95,
            "quantity": 8,
          },
          {
            "name": "pens",
            "price": 56.12,
            "quantity": 5,
          },
        ],
        sort: { quantity: -1 },
        slice: 2,
      },
    },
  },
  { upsert: true },
);
```

Resultado:

```
{
  _id : 1,
  items : [
    {
      "name" : "envelopes",
      "price" : 19.95,
      "quantity" : 8,
    },
    {
      "name" : "pens",
      "price" : 56.12,
      "quantity" : 5,
    },
  ],
}
```

**OBS.**: O `slice` reduziu a 2 os elementos do *array*, sendo os dois primeiros. Ou seja, o `sort` ordenou os com maior `quantity` no começo, e o `slice` colocou eles como únicos no *array*.

### $pop

Para remover o primeiro ou último elemento de um array, utilize o método `$pop`. Se passar `-1`, removerá o primeiro. Se passar `1`, removerá o ultimo.

#### Exemplos

**Collection base:**
```
use sales;
db.supplies.insertOne(
  {
    _id: 1,
    items: [
        {
          "name" : "notepad",
          "price" : 35.29,
          "quantity" : 2,
        },
        {
          "name": "envelopes",
          "price": 19.95,
          "quantity": 8,
        },
        {
          "name": "pens",
          "price": 56.12,
          "quantity": 5,
        },
    ],
  }
);
```

**Removendo o primeiro**:

```
db.supplies.updateOne({ _id: 1 }, { $pop: { items: -1 } });
```

Resultado:

```
{
  _id: 1,
  items: [
    {
      "name": "envelopes",
      "price": 19.95,
      "quantity": 8,
    },
    {
      "name": "pens",
      "price": 56.12,
      "quantity": 5,
    },
  ],
}
```

**Removendo o ultimo**:

```
db.supplies.updateOne({ _id: 1 }, { $pop: { items: 1 } });
```

Resultado:

```
{
  _id: 1,
  items: [
    {
      "name" : "notepad",
      "price" : 35.29,
      "quantity" : 2,
    },
    {
      "name": "envelopes",
      "price": 19.95,
      "quantity": 8,
    },
  ],
}
```

### $pull

Para remover elementos com um (ou mais) condições especificadas, utiliza-se o método `$pull`.

#### Exemplos

Coleção base:

```
use sales;
db.supplies.insertMany([
  {
    _id: 1,
    items: [
      {
        "name" : "notepad",
        "price" : 35.29,
        "quantity" : 2,
      },
      {
        "name": "envelopes",
        "price": 19.95,
        "quantity": 8,
      },
      {
        "name": "pens",
        "price": 56.12,
        "quantity": 5,
      },
    ],
  },
  {
    _id: 2,
    items: [
      {
        "name" : "pencil",
        "price" : 5.29,
        "quantity" : 2,
      },
      {
        "name": "envelopes",
        "price": 19.95,
        "quantity": 8,
      },
      {
        "name": "backpack",
        "price": 80.12,
        "quantity": 1,
      },
      {
        "name": "pens",
        "price": 56.12,
        "quantity": 5,
      },
    ],
  }
]);
```

**Removendo `pens` e `envelopes`:**

```
db.supplies.updateMany(
  {},
  {
    pull: {
      items: {
        name: { $in: ["pens", "envelopes"] },
      },
    },
  },
);
```

Resultado:

```
{
  _id : 1,
  items : [
    {
      "name" : "notepad",
      "price" : 35.29,
      "quantity" : 2,
    },
  ],
},
{
  _id : 2,
  items : [
    {
      "name" : "pencil",
      "price" : 5.29,
      "quantity" : 2,
    },
    {
      "name" : "backpack",
      "price" : 80.12,
      "quantity" : 1,
    },
  ],
}
```

**Removendo diretamente no `$pull`:**

Base:

```
use.sales;
db.profiles.insertOne({ _id: 1, votes: [3, 5, 6, 7, 7, 8] });
```

Removendo todos `votes` maiores que 6:

```
db.profiles.updateOne(
  { _id: 1 },
  {
    pull: {
      votes: { $gte: 6 },
    },
  },
);
```

Resultado:

```
{ _id: 1, votes: [3,  5] }
```

**Removendo itens de um *array* de Documentos:**

Coleção base:

```
use sales;
db.survey.insertMany([
  {
    _id: 1,
    results: [
      { item: "A", score: 5 },
      { item: "B", score: 8, comment: "Strongly agree" },
    ],
  },
  {
    _id: 2,
    results: [
      { item: "C", score: 8, comment: "Strongly agree" },
      { item: "B", score: 4 },
    ],
  }
]);
```

Removendo documentos com o `score` igual a 8 e o campo `item` igual a **B**:

```
db.survey.updateMany(
  {},
  {
    pull: {
      results: { score: 8 , item: "B" },
    },
  },
);
```

Resultado:

```
{
  _id: 1,
  results: [ { "item": "A", "score": 5 } ],
},
{
  _id: 2,
  results: [
    { "item": "C", "score": 8, "comment": "Strongly agree" },
    { "item": "B", "score": 4 },
  ],
}
```

### $addToSet



## Links