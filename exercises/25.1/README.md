# Bloco 25 - MongoDB: Aggregation Framework

## Aggregation Framework - Parte 1

São utilizados para agrupar informações de multiplos documentos, já que o `find()` não possibilita esse recurso. É possível realizar de três formas: *aggregation pipeline* , *map-reduce function* e *single purpose aggregation methods*. O MongoDB indica a utilização do ***aggregation pipeline***.

### Aggregation Framework

Modelado para processamento de dados por meio de *pipelines* (funil). Documentos entram nesse funil e vão se transformando, até o estágio final, com um resultado "agregado".

Exemplo:

```
db.orders.aggregate([
  { $match: { status: "A" } },
  { $group: { _id: "$cust_id", total: { $sum: "$amount" } } }
]);
```

1. `$match`: Filtra os documentos pelo campo `status`, passando somento o com valor `A`.
2. `$group`: Agrupa documentos pelo campo `cust_id`, calculando a soma(`$sum`) dos campos `amount`.

Similar a query conhecida, **a novidade** é o `aggregate`. É nele que o *pipeline* ocorre. É possível utilizar [operadores](https://docs.mongodb.com/manual/reference/operator/aggregation/#aggregation-expression-operators), em diversos estágios, para realizar cálculos ou concatenar *strings*.

**LEMBRANDO que ele recebe um *ARRAY* como parâmetro.**

### $match

Para filtrar os documentos, utiliza-se o `$match`. De comportamento similar ao `find({ $match })`. É recomentado colocar o `$match`o mais cedo possível no *pipeline*, melhorando a performance.

#### Exemplo

Base:
```
db.articles.insertMany([
{ _id: ObjectId("512bc95fe835e68f199c8686"), author: "dave", score: 80, views: 100 },
{ _id: ObjectId("512bc962e835e68f199c8687"), author: "dave", score: 85, views: 521 },
{ _id: ObjectId("55f5a192d4bede9ac365b257"), author: "ahn", score: 60, views: 1000 },
{ _id: ObjectId("55f5a192d4bede9ac365b258"), author: "li", score: 55, views: 5000 },
{ _id: ObjectId("55f5a1d3d4bede9ac365b259"), author: "annT", score: 60, views: 50 },
{ _id: ObjectId("55f5a1d3d4bede9ac365b25a"), author: "li", score: 94, views: 999 },
{ _id: ObjectId("55f5a1d3d4bede9ac365b25b"), author: "ty", score: 95, views: 1000 }
])
```

**Igualdade simples:**
```
db.articles.aggregate(
  [{ $match : { author : "dave" } }]
);
```

Resultado:
```
{ _id: ObjectId("512bc95fe835e68f199c8686"), author: "dave", score: 80, views: 100 }
{ _id: ObjectId("512bc962e835e68f199c8687"), author: "dave", score: 85, views: 521 }
```

**Igualdade complexa:**
```
db.articles.aggregate(
  [
    {
    $match: {
      $or: [
          { score: { $gt: 70, $lt: 90 } },
          { views: { $gte: 1000 } }
        ]
      }
    }
  ]
);
```

Resultado:
```
{ "_id" : ObjectId("512bc95fe835e68f199c8686"), "author" : "dave", "score" : 80, "views" : 100 }
{ "_id" : ObjectId("512bc962e835e68f199c8687"), "author" : "dave", "score" : 85, "views" : 521 }
{ "_id" : ObjectId("55f5a192d4bede9ac365b257"), "author" : "ahn", "score" : 60, "views" : 1000 }
{ "_id" : ObjectId("55f5a192d4bede9ac365b258"), "author" : "li", "score" : 55, "views" : 5000 }
{ "_id" : ObjectId("55f5a1d3d4bede9ac365b25b"), "author" : "ty", "score" : 95, "views" : 1000 }
```

### $limit

Operador `$limit` limita o número de documentos para o próximo estágio. Recebe sempre um inteiro positivo.

#### Exemplos

```
db.articles.aggregate(
  [
    { $limit : 5 }
  ]
);
```

### $project

Para projetar campos, utilizamos o operador `$project`. Podem ser campos novos, resultado de calculos, interações e concatenações entre campos existentes no documento. Semelhante ao `find({}, { $project })`. Se for especificado um campo que não existe o `$project` simplesmente ignora ele.
Ou seja, são quais campos seram mostrados no resultado da *query*. Para omitir o `_id`, ele precisa ser expressamente ligado.

#### Exemplos

Base:
```
db.books.insertOne(
  {
    _id: 1,
    title: "A Fundação",
    isbn: "0001122223334",
    author: { last: "Asimov", first: "Isaac" },
    copies: 5
  }
)
```

**Incluindo campos específicos**:
```
db.books.aggregate(
  [
    {
      $project : {
        title : 1,
        author : 1
      }
    }
  ]
);
```

Resultado:
```
[
  {
    _id: 1,
    title: 'A Fundação',
    author: { last: 'Asimov', first: 'Isaac' }
  }
]
```

**Excluindo o campo _id:**
```
db.books.aggregate([
  {
    $project : {
      _id: 0,
      title : 1,
      author : 1
    }
  }
]);
```

Resultado:
```
[ { title: 'A Fundação', author: { last: 'Asimov', first: 'Isaac' } } ]
```

**Excluindo outros campos:**
```
db.books.aggregate([
  {
    $project : {
      copies: 0
    }
  }
]);
```

Resultado:
```
[
  {
    _id: 1,
    title: 'A Fundação',
    isbn: '0001122223334',
    author: { last: 'Asimov', first: 'Isaac' }
  }
]
```

**Excluindo campos em subdocumentos:**
```
db.books.aggregate([
  {
    $project : {
      "author.first": 0,
      copies: 0
    }
  }
]);
```

Resultado:
```
[
  {
    _id: 1,
    title: 'A Fundação',
    isbn: '0001122223334',
    author: { last: 'Asimov' }
  }
]
```

**Incluindo campos calculados:**
```
db.books.aggregate([
  {
    $project: {
      title: 1,
      isbn: {
        prefix: { $substr: ["$isbn", 0, 3] },
        group: { $substr: ["$isbn", 3, 2] },
        publisher: { $substr: ["$isbn", 5, 4] },
        title: { $substr: ["$isbn", 9, 3] },
        checkDigit: { $substr: ["$isbn", 12, 1] }
      },
      lastName: "$author.last",
      copiesSold: "$copies"
    }
  }
]);
```

**OBS.:** O `$` antes da *string* simula uma variável, indicando que queremos pegar apenas o valor do campo

Resultado:
```
{
  "_id" : 1,
  "title" : "A Fundação",
  "isbn" : {
    "prefix" : "000",
    "group" : "11",
    "publisher" : "2222",
    "title" : "333",
    "checkDigit" : "4"
  },
  "lastName" : "Asimov",
  "copiesSold" : 5
}
```

### $group

O operador utilizado para agrupar valores é o `$group`. Desde um *distinct* simples, até cálculos mais elaborados.

![Exemplo de uso](https://s3.us-east-2.amazonaws.com/assets.app.betrybe.com/back-end/mongodb/aggregation-framework/images/group-light-5fc00074297e4214183f0544d71eca10.png)
[Fonte](https://www.betrybe.com/)

Ele faz uso de um parâmetro `_id` que é **diferente do identificados dos documentos**. Nesse parâmetro é onde estão os campos que serão utilizados no argumento.

![Usando o _id](https://s3.us-east-2.amazonaws.com/assets.app.betrybe.com/back-end/mongodb/aggregation-framework/images/group-light-specific-f2da626c60103dff6543268f3c2496e4.png)
[Fonte](https://www.betrybe.com/)

Como visto, a saída é um agrupamento de valores com base no `_id` utilizado.
Podendo conter calculos com uso dos [acumuladores](https://docs.mongodb.com/manual/reference/operator/aggregation/group/#accumulators-group).

#### Operadores de acumulação

* `$addToSet` : retorna um array com os valores únicos da expressão para cada grupo;
* `$avg` : retorna a média de valores numéricos. Valores não numéricos são ignorados;
* `$first` : retorna um valor do primeiro documento de cada grupo;
* `$last` : retorna um valor do último documento de cada grupo;
* `$max` : retorna o maior valor de cada grupo;
* `$sum` : retorna a soma de valores numéricos. Valores não numéricos são ignorados.

#### Exemplos

Base:
```
db.sales.insertMany([
{
  _id: 1,
  item: "Código Limpo",
  price: NumberDecimal("10"),
  quantity: NumberInt("2"),
  date: ISODate("2014-03-01T08:00:00Z")
},
{
  _id: 2,
  item: "O Homem e Seus Símbolos",
  price: NumberDecimal("20"),
  quantity: NumberInt("1"),
  date: ISODate("2014-03-01T09:00:00Z")
},
{
  _id: 3,
  item: "Comunicação Não-Violenta",
  price: NumberDecimal("5"),
  quantity: NumberInt( "10"),
  date: ISODate("2014-03-15T09:00:00Z")
},
{
  _id: 4,
  item: "Comunicação Não-Violenta",
  price: NumberDecimal("5"),
  quantity:  NumberInt("20"),
  date: ISODate("2014-04-04T11:21:39.736Z")
},
{
  _id: 5,
  item: "Código Limpo",
  price: NumberDecimal("10"),
  quantity: NumberInt("10"),
  date: ISODate("2014-04-04T21:23:13.331Z")
},
{
  _id: 6,
  item:"A Coragem de Ser Imperfeito",
  price: NumberDecimal("7.5"),
  quantity: NumberInt("5" ),
  date: ISODate("2015-06-04T05:08:13Z")
},
{
  _id: 7,
  item: "A Coragem de Ser Imperfeito",
  price: NumberDecimal("7.5"),
  quantity: NumberInt("10"),
  date: ISODate("2015-09-10T08:43:00Z")
},
{
  _id: 8,
  item: "Código Limpo",
  price: NumberDecimal("10"),
  quantity: NumberInt("5" ),
  date: ISODate("2016-02-06T20:20:13Z")
}
])
```

**Contando o número de documentos:**
```
db.sales.aggregate([
  {
    $group: {
      _id: null,
      count: { $sum: 1 }
    }
  }
]);
```

**OBS.:** O `_id` é `null` porque queremos todos os documentos.

Resultado:  
`{ "_id" : null, "count" : 8 }`

**Retornando valores distintos:**
```
db.sales.aggregate([
  {
    $group : {
      _id : "$item",
      count: { $sum: 1}
    }
  }
]);
```

Resultado:
```
{ "_id" : "A Coragem de Ser Imperfeito", "count" : 2 }
{ "_id" : "O Homem e Seus Símbolos", "count" : 1 }
{ "_id" : "Código Limpo", "count" : 3 }
{ "_id" : "Comunicação Não-Violenta", "count" : 2 }
```

**Somando valores:**
```
db.sales.aggregate([
  {
    $group : {
      _id : "$item",
      totalSaleAmount: {
        $sum: {
          $multiply: ["$price", "$quantity"]
        }
      }
    }
  }
]);
```

Resultado:
```
{ "_id" : "A Coragem de Ser Imperfeito", "totalSaleAmount" : NumberDecimal("112.5") }
{ "_id" : "O Homem e Seus Símbolos", "totalSaleAmount" : NumberDecimal("20") }
{ "_id" : "Código Limpo", "totalSaleAmount" : NumberDecimal("170") }
{ "_id" : "Comunicação Não-Violenta", "totalSaleAmount" : NumberDecimal("150") }
```

**Having (do Mysql), combinando estágios no aggregate:**
```
db.sales.aggregate([
  // Primeiro Estágio
  {
    $group: {
      _id : "$item",
      totalSaleAmount: {
        $sum: {
          $multiply: ["$price", "$quantity"]
        }
      }
    }
  },
  // Segundo Estágio
  {
    $match: { "totalSaleAmount": { $gte: 100 } }
  }
]);
```

Resultado:
```
{ "_id" : "A Coragem de Ser Imperfeito", "totalSaleAmount" : NumberDecimal("112.5") }
{ "_id" : "Código Limpo", "totalSaleAmount" : NumberDecimal("170") }
{ "_id" : "Comunicação Não-Violenta", "totalSaleAmount" : NumberDecimal("150") }
```

**Agrupando por null:**
```
db.sales.aggregate([
  {
    $group : {
      _id : null,
      totalSaleAmount: {
        $sum: { $multiply: ["$price", "$quantity"] }
      },
      averageQuantity: { $avg: "$quantity" },
      count: { $sum: 1 }
    }
  }
]);
```

Resultado:
```
{
  "_id" : null,
  "totalSaleAmount" : NumberDecimal("452.5"),
  "averageQuantity" : 7.875,
  "count" : 8
}
```

### $unwind

Para quebrar um campo *array* em um conjunto de documentos, com os valores gerais do *array* pai mais o específico do *array* filho, utiliza-se o operador `$unwind`.

#### Exemplos

Base:
```
db.inventory.insertOne({ _id: 7, item: "ABC1", sizes: ["S", "M", "L"] });
```

**Operação:**
```
db.inventory.aggregate([{ $unwind : "$sizes" }]);
```

Resultado:
```
{ "_id" : 7, "item" : "ABC1", "sizes" : "S" }
{ "_id" : 7, "item" : "ABC1", "sizes" : "M" }
{ "_id" : 7, "item" : "ABC1", "sizes" : "L" }
```

### $lookup

O operador `$lookup` possibilita juntar documentos de outra coleção (`join`). Ele cria um campo *array* com todos os documentos que deram `match` na coleção. Os parâmetros básicos são:

1. `from`: uma coleção na mesma *database*.
2. `localField`: o campo da coleção original que será comparador com o `foreingField` para a agregação.
3. `foreingField`: o campo da coleção especificado no `from` para ser comparado com o `localField` por igualdade simples.
4. `as`: o nome do novo *array* que será adicionado.

#### Exemplos

Base:
```
// orders
db.orders.insertMany([
{ _id: 1, item: "almonds", price: 12, quantity: 2 },
{ _id: 2, item: "pecans", price: 20, quantity: 1 },
{ _id: 3 }
])

// inventory
db.inventory.insertMany([
{ _id: 1, sku: "almonds", description: "product 1", instock: 120 },
{ _id: 2, sku: "bread", description: "product 2", instock: 80 },
{ _id: 3, sku: "cashews", description: "product 3", instock: 60 },
{ _id: 4, sku: "pecans", description: "product 4", instock: 70 },
{ _id: 5, sku: null, description: "Incomplete" },
{ _id: 6 }
])
```

**Cruzando os campos correspondentes `sku` e `item`:**
```
db.orders.aggregate([
  {
    $lookup: {
      from: "inventory",
      localField: "item",
      foreignField: "sku",
      as: "inventory_docs"
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
  "quantity" : 2,
  "inventory_docs" : [
    {
      "_id" : 1,
      "sku" : "almonds",
      "description" : "product 1",
      "instock" : 120
    }
  ]
}
{
  "_id" : 2,
  "item" : "pecans",
  "price" : 20,
  "quantity" : 1,
  "inventory_docs" : [
    {
      "_id" : 4,
      "sku" : "pecans",
      "description" : "product 4",
      "instock" : 70
    }
  ]
}
{
  "_id" : 3,
  "inventory_docs" : [
    {
      "_id" : 5,
      "sku" : null,
      "description" : "Incomplete"
    },
    {
      "_id" : 6
    }
  ]
}
```

## Links

- [Pipeline Operators and Indexes](https://docs.mongodb.com/manual/core/aggregation-pipeline/#aggregation-pipeline-operators-and-performance)
- [Aggregation Pipeline Optimization](https://docs.mongodb.com/manual/core/aggregation-pipeline-optimization/)
- [Perform a Single Equality Join with $lookup](https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/index.html#lookup-single-equality)
- [Use $lookup with an Array](https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/index.html#unwind-example)
- [Projection](https://docs.mongodb.com/manual/reference/operator/aggregation/project/index.html)
- [MongoDB Aggregation Cheat Sheet](https://github.com/tryber/Trybe-CheatSheets/blob/master/backend/mongodb/mongodb_aggregation/README.md)
