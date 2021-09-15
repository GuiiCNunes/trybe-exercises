# Bloco 24 - MongoDB: Updates Simples e Complexos

## Updates Complexos - Arrays - Parte 2

### $all

O operador `$all` seleciona todos os documentos que possuem um campo que seja um *array* com todos os elementos especificados. Sendo irrelevante para a comparação a existência de mais elementos no array e a ordem.
Para entender:
```
db.inventory.find({ tags: ["red", "blank"] });

db.inventory.find({ tags: { $all: ["red", "blank"] } });
```

A primeira *query* retorna apenas os documentos que possuem o *array* `tags` com dois elementos e nessa ordem. Já a segunda retorna todos documentos que possuam `red` e `blank` no *array* `tags`, independente da posição e se existem mais elementos.

Esse operador equivale ao `$and`, com a diferença de ser para *array*. Essas *queries* são similares:
```
db.inventory.find(
  { tags: { $all: [ "ssl", "security" ] } }
);

db.inventory.find(
  {
and: [
      { tags: "ssl" },
      { tags: "security" }
    ]
  }
);
```

### $elemMatch

Operador `$elemMatch`, busca documentos com um campo *array* que tenham pelo menos um elemento que satisfaça todas as condições.

#### Exemplos

Base:
```
db.scores.insertMany([
  { _id: 1, results: [82, 85, 88] },
  { _id: 2, results: [75, 88, 89] }
]);
```

Buscar elemento que seja maior ou igual a 80 e menor que 85 :
```
db.scores.find(
  { results: { $elemMatch: { $gte: 80, $lt: 85 } } }
);
```

Resultado:
`[ { _id: 1, results: [ 82, 85, 88 ] } ]`

**Utilizando em *array* de documentos:**
Base:

```
db.survey.insertMany([
  {
    _id: 1,
    results: [
      { product: "abc", score: 10 },
      { product: "xyz", score: 5 }
    ]
  },
  {
    _id: 2,
    results: [
      { product: "abc", score: 8 },
      { product: "xyz", score: 7 }
    ]
  },
  {
    _id: 3,
    results: [
      { product: "abc", score: 7 },
      { product: "xyz", score: 8 }
    ]
  }
]);
```

Procurando `product` igual a `xyz` e o campo `score` maior ou igual a 8 :
```
db.survey.find(
  { results: { $elemMatch: { product: "xyz", score: { $gte: 8 } } } }
);
```

Resultado:

```
[
  {
    _id: 3,
    results: [ { product: 'abc', score: 7 }, { product: 'xyz', score: 8 } ]
  }
]
```

### $size

Para selecionar um documento que possua um campo com um *array* de uma quantidade especificada, utilize o `$size`. **Só aceita valores numéricos**, não aceitando comparações, como `($gt: 2)`.

#### Exemplos:
Base:
```
db.products.insertMany([
  { _id: 1, tags: ["red", "green"] },
  { _id: 2, tags: ["apple", "lime"] },
  { _id: 3, tags: "fruit" },
  { _id: 4, tags: ["orange", "lemon", "grapefruit"] }
]);
```

Busca:
```
db.products.find(
  { tags: { $size: 2 } }
);
```

Resultado:
```
[
  { _id: 1, tags: [ 'red', 'green' ] },
  { _id: 2, tags: [ 'apple', 'lime' ] }
]
```

### $where

`$where` pode ser utilizado para passar uma *string* ou função para ser processada pelo banco para cada documento. Para referenciar o documento utiliza-se `this` ou `obj` dentro da função. **O operador `$expr` passou a suportar as funcionalidades do `$where`**, logo ficando mais utilizado. [Documentação](https://docs.mongodb.com/manual/reference/operator/query/where/) do `$where`.

### $expr

O operador `$expr` é utilizado para construir *queries*  com [expressões de agregação](https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#aggregation-expressions) que comparem campos no mesmo documento.

#### Exemplos

Base:
```
db.monthlyBudget.insertMany([
  { _id: 1, category: "food", budget: 400, spent: 450 },
  { _id: 2, category: "drinks", budget: 100, spent: 150 },
  { _id: 3, category: "clothes", budget: 100, spent: 50 },
  { _id: 4, category: "misc", budget: 500, spent: 300 },
  { _id: 5, category: "travel", budget: 200, spent: 650 }
]);
```

**Buscar os documentos em que o valor de `spent` exceda o valor de `budget` :**
```
db.monthlyBudget.find(
  {
    $expr: { $gt: [ "$spent", "$budget" ] }
  }
);
```

Resultado:
```
{ "_id" : 1, "category" : "food", "budget" : 400, "spent" : 450 }
{ "_id" : 2, "category" : "drinks", "budget" : 100, "spent" : 150 }
{ "_id" : 5, "category" : "travel", "budget" : 200, "spent" : 650 }
```
**OBS.**: Não é especificado nenhum valor, o uso do `$` faz com que o MongoDB considere a *string* como um campo no objeto para comparar.

### $regex

Para utilizar expressões regulares nas *queries*, utiliza-se o `$regex`. Sendo essas expressões compatíveis com  [Perl](https://www.perl.org/) ( [PCRE](https://www.pcre.org/) ), versão 8.42, e com suporte a UTF-8. Pode realizar consultas similares ao `LIKE` do SQL. [Documentação](https://docs.mongodb.com/manual/reference/operator/query/regex/)

#### Exemplos

Base:
```
db.products.insertMany([
  { _id: 100, sku: "abc123", description: "Single line description." },
  { _id: 101, sku: "abc789", description: "First line\nSecond line" },
  { _id: 102, sku: "xyz456", description: "Many spaces before     line" },
  { _id: 103, sku: "xyz789", description: "Multiple\nline description" }
]);
```

Buscar documentos em que o campo `sku` termine com "789":
```
db.products.find({ sku: { $regex: /789$/ } });
```

Resultado:
```
[
  { _id: 101, sku: 'abc789', description: 'First line\nSecond line' },
  {
    _id: 103,
    sku: 'xyz789',
    description: 'Multiple\nline description'
  }
]
```

Buscando `sku`que começam com `ABC`:
```
db.products.find({ sku: { $regex: /^ABC/i } });
```

Resultado:
```
[
  { _id: 100, sku: 'abc123', description: 'Single line description.' },
  { _id: 101, sku: 'abc789', description: 'First line\nSecond line' }
]
```

### $text

O `$text` faz uma busca textual nos campos indexados por um [text index](https://docs.mongodb.com/manual/core/index-text/). Sintaxe:

```
{
  $text:
    {
      $search: <string>,
      $language: <string>,
      $caseSensitive: <boolean>,
      $diacriticSensitive: <boolean>
    }
}
```

Sendo:
- `$search`: Uma string com os termos que o MongoDB utilizará para fazer o parse e utilizará como filtro. Internamente, o MongoDB faz uma busca lógica ( OR ) sobre os termos, a menos que seja especificado como uma frase inteira;
- `$language` : Opcional. Esse campo determina a lista de *stop words* que será utilizada na tokenização da busca. Veja a [lista](https://docs.mongodb.com/manual/reference/text-search-languages/#text-search-languages) de idiomas suportados. Se você passar o valor none , a busca utilizará uma tokenização simples sem utilizar nenhuma lista de stop words ;
  > Stop word: Também conhecido como palavra vazia , é uma palavra que é removida antes ou após o processamento de um texto em linguagem natural.
- `$caseSensitive` : Opcional. Recebe um valor booleano para habilitar ou desabilitar buscas case sensitive . O valor *default* é `false` , o que faz com que as buscas sejam `case-insensitive` . Veja mais informações sobre `case-insensitive` [aqui](https://docs.mongodb.com/manual/reference/operator/query/text/index.html#text-operator-case-sensitivity);
- `$diacriticSensitive` : Opcional. Recebe um valor booleano para habilitar ou desabilitar busca *[diacritic sensitive](https://docs.mongodb.com/manual/reference/operator/query/text/index.html#text-operator-diacritic-sensitivity)* . O valor *default* também é `false` .

**Não** retorna os valores ordenados pelo `scores`, por padrão. [Mais informações](https://docs.mongodb.com/manual/reference/operator/query/text/index.html#text-operator-text-score).
`score` tem relação com a relevância do documento com a busca.

### Exemplos:

Base:
```
db.articles.insertMany([
  { _id: 1, subject: "coffee", author: "xyz", views: 50 },
  { _id: 2, subject: "Coffee Shopping", author: "efg", views: 5 },
  { _id: 3, subject: "Baking a cake", author: "abc", views: 90  },
  { _id: 4, subject: "baking", author: "xyz", views: 100 },
  { _id: 5, subject: "Café Com Leite", author: "abc", views: 200 },
  { _id: 6, subject: "Сырники", author: "jkl", views: 80 },
  { _id: 7, subject: "coffee and cream", author: "efg", views: 10 },
  { _id: 8, subject: "Cafe com Leite", author: "xyz", views: 10 }
]);

// CRIANDO O TEXT INDEX
db.articles.createIndex({ subject: "text" });
```

**Procurando um único termo (`coffee`):**
```
db.articles.find({ $text: { $search: "coffee" } });
```

Resultado:
```
[
  { _id: 1, subject: 'coffee', author: 'xyz', views: 50 },
  { _id: 7, subject: 'coffee and cream', author: 'efg', views: 10 },
  { _id: 2, subject: 'Coffee Shopping', author: 'efg', views: 5 }
]
```

**Procurando qualquer um dos termos especificados(`"bake coffee cake" `):**
```
db.articles.find({ $text: { $search: "bake coffee cake" } });
```

**OBS.:** a busca é realizada como um `OR`, delimitando os campos na *string* pelo espaço.

Resultado:
```
[
  { _id: 4, subject: 'baking', author: 'xyz', views: 100 },
  { _id: 3, subject: 'Baking a cake', author: 'abc', views: 90 },
  { _id: 1, subject: 'coffee', author: 'xyz', views: 50 },
  { _id: 7, subject: 'coffee and cream', author: 'efg', views: 10 },
  { _id: 2, subject: 'Coffee Shopping', author: 'efg', views: 5 }
]
```

**Procurando por uma frase(`"coffee shop"`):**
```
db.articles.find({ $text: { $search: "\"coffee shop\"" } });
```

Resultado:
```
[ { _id: 2, subject: 'Coffee Shopping', author: 'efg', views: 5 } ]
```

### $mod

Para realizar um filtro com base no módulo de um campo numérico e um divisor, utiliza-se o `$mod`.
  > Operação módulo: encontra o resto da divisão de um número por outro.

#### Exemplos

Base:
```
db.inventory.insertMany([
  { _id: 1, item: "abc123", qty: 0 },
  { _id: 2, item: "xyz123", qty: 5 },
  { _id: 3, item: "ijk123", qty: 12 }
]);
```

**Busca o valor do campo qty módulo 4 seja 0 :**
```
db.inventory.find({ qty: { $mod: [4, 0] } });
```

Resultado:
```
{ "_id" : 1, "item" : "abc123", "qty" : 0 }
{ "_id" : 3, "item" : "ijk123", "qty" : 12 }
```

## Links

- [Queries em Arrays](https://docs.mongodb.com/manual/tutorial/query-arrays/)
- [Query em Arrays de Documentos Embedados](https://docs.mongodb.com/manual/tutorial/query-array-of-documents/)
- [Busca Textual](https://docs.mongodb.com/manual/reference/operator/query/text/index.html#match-operation-stemmed-words)
