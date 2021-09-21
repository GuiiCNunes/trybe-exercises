# Orientação

O MongoDb possui diversas ferramentas, como, por exemplo, mongo , mongosh , Compass e outras ferramentas de terceiros. Você pode utilizar o que achar melhor para executar as queries , o importante é realizá-las.
Você continuará utilizando o banco de dados erp do dia anterior. Nos exercícios 1 a 8 , você utilizará o mesmo pipeline . A ideia é começar com um pipeline pequeno e ir adicionando estágios à medida que você for evoluindo nos exercícios. Vamos lá?

# Exercícios

1. Utilize uma combinação das expressões aritméticas e adicione um campo chamado idade à coleção clientes . Algumas dicas:
* arredonde para baixo o valor da idade;
* calcule a idade usando a diferença entre a data corrente e a data de nascimento;
* 1 dia é igual a 86400000 milissegundos.
```
db.clientes.aggregate([
  {
    $addFields: {
      idade: {
        $floor: {
          $divide: [{$subtract: [new Date(), "$dataNascimento"]}, (86400000 * 365) ]
        }
      },
    },
  },
]);
```

2. Utilizando o novo campo idade , conte quantos clientes têm entre 18 e 25 anos.
```
db.clientes.aggregate([
  {
    $addFields: {
      idade: {
        $floor: {
          $divide: [{$subtract: [new Date(), "$dataNascimento"]}, (86400000 * 365) ]
        }
      },
    },
  },
  {
    $match: {
      idade: { $gte: 18, $lte: 25 }
    },
  },
  { $count: "clientes" },
]);
```

3. Remova os estágios $count e $match do anterior e adicione um estágio no pipeline que coloque as compras do cliente no campo compras .
```
db.clientes.aggregate([
  {
    $addFields: {
      idade: {
        $floor: {
          $divide: [{$subtract: [new Date(), "$dataNascimento"]}, (86400000 * 365) ]
        }
      },
    },
  },
  {
    $lookup: {
      from: "vendas",
      localField: "clienteId",
      foreignField: "clienteId",
      as: "compras",
    },
  },
]);
```

4. Selecione TODOS os clientes que compraram entre Junho de 2019 e Março de 2020 .
```
db.clientes.aggregate([
  {
    $addFields: {
      idade: {
        $floor: {
          $divide: [{$subtract: [new Date(), "$dataNascimento"]}, (86400000 * 365) ]
        }
      },
    },
  },
  {
    $lookup: {
      from: "vendas",
      localField: "clienteId",
      foreignField: "clienteId",
      as: "compras",
    },
  },
  {
    $match: {
      "compras.dataVenda": {
        $gte: ISODate("2019-06-01"),
        $lt: ISODate("2020-04-01"),
      },
    },
  },
]);
```

5. Confira o número de documentos retornados pelo pipeline com o método itcount() . Até aqui, você deve ter 486 documentos sendo retornados.
```
db.clientes.aggregate([
  {
    $addFields: {
      idade: {
        $floor: {
          $divide: [{$subtract: [new Date(), "$dataNascimento"]}, (86400000 * 365) ]
        }
      },
    },
  },
  {
    $lookup: {
      from: "vendas",
      localField: "clienteId",
      foreignField: "clienteId",
      as: "compras",
    },
  },
  {
    $match: {
      "compras.dataVenda": {
        $gte: ISODate("2019-06-01"),
        $lt: ISODate("2020-04-01"),
      },
    },
  },
]).itcount();
```

6. Ainda nesse pipeline , descubra os 5 estados com mais compras.
```
db.clientes.aggregate([
  {
    $addFields: {
      idade: {
        $floor: {
          $divide: [{$subtract: [new Date(), "$dataNascimento"]}, (86400000 * 365) ]
        }
      },
    },
  },
  {
    $lookup: {
      from: "vendas",
      localField: "clienteId",
      foreignField: "clienteId",
      as: "compras",
    },
  },
  {
    $match: {
      "compras.dataVenda": {
        $gte: ISODate("2019-06-01"),
        $lte: ISODate('2020-03-31'),
      },
    },
  },
  {
    $group: {
      _id: "$endereco.uf",
      total: { $sum: 1 },
    }
  },
  { $sort: { total: -1 } },
  { $limit: 5 },
]);
```

7. Descubra o cliente que mais consumiu QUEIJO PRATO . Retorne um documento com a seguinte estrutura:

```
{
  "nomeCliente": "NOME",
  "uf": "UF DO CLIENTE",
  "totalConsumido": 100
}
```

```
```

8. Selecione todas as vendas do mês de Março de 2020 , com status EM SEPARACAO . Acrescente um campo chamado dataEntregaPrevista com valor igual a três dias após a data da venda. Retorne apenas os campos clienteId , dataVenda e dataEntregaPrevista .
```
```
