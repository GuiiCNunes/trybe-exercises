# Bloco 24 - MongoDB: Updates Simples e Complexos

## Updates Simples

Sintaxes:

```
db.colecao.updateOne(<filtro>, <update>, <opcoes>);
db.colecao.updateMany(<filtro>, <update>, <opcoes>);

{
  <operador>: { <campo1>: <valor1>, ... },
  <operador>: { <campo2>: <valor2>, ... },
  ...
}
```

### Alterar um único elemento

Utilizamos a função `db.colecao.updateOne()`. Ela recebe como primeiro parâmetro um filtro, que especifica qual documento será atualizado, seguido de o que será atualizado e as opções. Exemplo:

```
db.inventory.updateOne(
  { item: "paper" },
  { $set: { "size.uom": "cm", status: "P" } }
);
```

**Caso receba umfilro vazio `{}`, o resulta será a tualização do primeiro documento da coleção.**

### Alterando múltiplos documentos

Utilizamos a função `db.colecao.updateMany()` para alterar multiplos documentos de uma vez só. Seguindo a mesma estrutura do `updateOne` (*filtro*, *atualização* e *opções*). Exemplo:

```
db.inventory.updateMany(
  { "qty": { $lt: 50 } },
  { $set: { "size.uom": "in", status: "P" } }
);
```

**Se passar o filtro vazio `{}`, o resultado será a atualização de todos os documentos.**

### $set

O operador `$set` altera o valor de uma chave específica, caso a chave não exista, ela será adiconada. Se a chave estiver em *dot notation*, todo o caminho até o valor será criado. Aceita multiplas chaves/valor.
Alem de conseguir alterar subcampos dentro de um documento através da *dot notation*, é possível alterar elementos de um *array* com o uso da mesma. Exemplo:

```
db.products.update(
  { _id: 100 },
  { $set: {
      "tags.1": "rain gear",
      "ratings.0.rating": 2
    }
  }
);
```

### $mul

Operador `$mul` multiplica o valor de um campo e atribui como novo valor para ele, sem a necessidade de uso do `$set`. Exemplo:

```
// Valores iniciais
db.products.insertOne(
  { "_id": 1, "item": "ABC", "price": NumberDecimal("10.99"), "qty": 25 }
);

// Atualização
db.products.update(
  { _id: 1 },
  { $mul: { price: NumberDecimal("1.25"), qty: 2 } }
);

// Resultado final
{ "_id": 1, "item": "ABC", "price": NumberDecimal("13.7375"), "qty": 50 }
```

Pode ser utilizado em um campo que não exista, assim o campo será criado e a multiplicação partirá do zero.
É possível multiplicar com valores de tipos diferentes. Exemplo:

```
// Valores iniciais
db.products.insertOne(
  { _id: 3,  item: "XYZ", price: NumberLong("10") }
);

// Atualização
db.products.update(
  { _id: 3 },
  { $mul: { price: NumberInt(5) } }
);

// Resultado final
{ "_id": 3, "item": "XYZ", "price": NumberLong(50) }
```

Para ver mais: [Regras de Conversão de Tipos em Multiplicações](https://docs.mongodb.com/manual/reference/operator/update/mul/#multiplication-type-conversion)

### $inc

É possível incrementar ou decrementar o valor de um campo com o uso do `$inc`, aceitando tanto valores positivos quanto negativos. Exemplo:

```
// Valor inicial
db.increment.insertOne(
  {
    _id: 1,
    sku: "abc123",
    quantity: 10,
    metrics: {
      orders: 2,
      ratings: 3.5
    }
  }
)

// Atualização
db.increment.update(
  { sku: "abc123" },
  { $inc: { quantity: -2, "metrics.orders": 1 } }
);

// Valor final
{
  "_id": 1,
  "sku": "abc123",
  "quantity": 8,
  "metrics": {
    "orders": 3,
    "ratings": 3.5
  }
}
```

### $min e $max

`$min`e `$max` funcionam de maneira similar, mas em setidos opostos. Enquanto um altera o valor do campo para o especificado se o valor atual for maior que o mínimo, o outro altera caso seja menor que o máximo.
Podem comparar valores de diferentes tipos, seguindo a [ordem de comparação BSON](https://docs.mongodb.com/manual/reference/bson-type-comparison-order/#faq-dev-compare-order-for-bson-types).
Exemplo:

```
// Valores iniciais
[
  { _id: 1, campo: 25 },
  { _id: 2, campo: 50 },
  { _id: 3, campo: 100 }
]

// Atualização
db.collection.updateMany({}, { $max: { campo: 75 } });
// Atualizando todos os valores do atributo "campo"
// para 75 caso sejam menores

db.collection.find();

// Valores finais
[
  { _id: 1, campo: 75 }, // valor anterior: 25
  { _id: 2, campo: 75 }, // valor anterior: 50
  { _id: 3, campo: 100 }, // não encontrou no escopo
]

// Outra operação
db.collection.updateMany({}, { $min: { campo: 42 } });
// Atualizando todos os valores do atributo "campo"
// para 42 caso sejam maiores

db.collection.find();

// Resultado
[
  { _id: 1, campo: 42 }, // valor anterior: 75
  { _id: 2, campo: 42 }, // valor anterior: 75
  { _id: 3, campo: 42 }, // valor anterior: 100
]
```

**Resumo:** O `$min` 'puxa' os valores para baixo e o `$max` 'joga' os valores para cima.

**Esses operadores funcionam com `Date`.** Exemplo:
```
// Inicial
use conteudo_trybe;
db.tags.insertOne(
  {
    _id: 1,
    desc: "crafts",
    dateEntered: ISODate("2019-10-01T05:00:00Z"),
    dateExpired: ISODate("2019-10-01T16:38:16Z")
  }
);

// Atualização
db.tags.update(
  { _id: 1 },
  {
min: { dateEntered: new Date("2019-09-25") },
max: { dateExpired: new Date("2019-10-02") }
  }
);

```

### $currentDate

O operador `$currentDate` atribui a data corrente a um campo, por padrão no formato `Date`, mas tambem pode ser `timestamp`, quando específicado. Sintaxe:

```
{ $currentDate: { <campo>: <typeSpecification>, ... } }
```

O `<typeSpecification>` pode ser um *boolean* `true`que específica como `Date` ou um documento que especifica o tipo do campo, como:` { $type: "timestamp" }` ou `{ $type: "date" }`. ***Case-sensitive*, utilizar somente minúsculas.**
Exemplo:

```
// Inicial
use conteudo_trybe;
db.customers.insertOne(
  { _id: 1, status: "a", lastModified: ISODate("2013-10-02T01:11:18.965Z") }
);

// Atualização
db.customers.updateOne(
  { _id: 1 },
  { $currentDate: {
      lastModified: true,
      "cancellation.date": { $type: "timestamp" }
    }, $set: {
      "cancellation.reason": "user request",
      status: "D"
    }
  }
);

// Final
{
  "_id": 1,
  "status": "D",
  "lastModified": ISODate("2020-01-22T21:21:41.052Z"),
  "cancellation": {
    "date": Timestamp(1579728101, 1),
    "reason": "user request"
  }
}
```

### $rename

Renomear campor com o `$rename`.

Exemplo:

```
// Inicial
use conteudo_trybe;
db.fruits.insertOne(
  { _id: 100, name: "Banana", quantity: 100, inStock: true }
);

// Atualização
db.fruits.updateOne(
  { name: "Banana" },
  { $rename: {
      "name": "productName"
    }
  }
);

// Final
{ _id: 100, quantity: 100, inStock: true, productName: 'Banana' }
```

### $unset

O `$unset` remove campos de um documento, podendo ser um ou mais. Exemplo:

```
// Inicio
{
  _id: 100,
  productName: "Banana",
  quantity: 100,
  inStock: true
}

// Atualização
db.fruits.updateMany(
  { productName: "Banana" },
  { $unset: { quantity: "" } }
);

// Fim
{
  _id: 100,
  productName: "Banana",
  inStock: true
}
```

## Links

- [Dot notation](https://docs.mongodb.com/manual/core/document/#document-dot-notation-embedded-fields)
- [Regras de Conversão de Tipos em Multiplicações](https://docs.mongodb.com/manual/reference/operator/update/mul/#multiplication-type-conversion)
- [Ordem de comparação BSON](https://docs.mongodb.com/manual/reference/bson-type-comparison-order/#faq-dev-compare-order-for-bson-types)

- [Update Methods](https://docs.mongodb.com/manual/reference/update-methods/)
- [Field Update Operators](https://docs.mongodb.com/manual/reference/operator/update-field/)
