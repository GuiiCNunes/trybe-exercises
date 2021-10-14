# Bloco 26 - NodeJS: Camada de Serviço e Arquitetura Rest e Restful

## Arquitetura de Software - Testando as Camadas

### Testes Unitários (Unit Tests)

Testes unitários são de baixo nível, focando em pequenas partes do software. Testam partes isoladas. Essa "pequena parte" pode varias de equipe para equipe, linguagem para linguagem, etc... Podendo ser uma classe, uma função, etc...

> O que podemos ter nítido é que uma unidade **é uma parte que pode ter seu comportamento isolado de suas dependências**.

Exemplo de um estrutura MSC + TDD:

```
└── controllers
│   └── movieController.js
└── models
│   └── connection.js
│   └── movieModel.js
└── services
│   └── movieService.js
└── tests
│   ├── controllers
│   │   └── movieController.test.js
│   ├── services
│   │   └── movieService.test.js
│   └── models
│       └── movieModel.test.js
└── index.js

// Ou


└── controllers
│   └── movieController.js
└── models
│   └── connection.js
│   └── movieModel.js
└── services
│   └── movieService.js
└── tests
│   ├── controllers
│   │   └── movieControllerCreate.test.js
│   │   └── movieControllerGetAll.test.js
│   │   └── movieControllerGetById.test.js
│   └── models
│   │   └── movieModelCreate.test.js
│   │   └── movieModelGetAll.test.js
│   │   └── movieModelGetById.test.js
│   ├── services
│   │   └── movieServiceCreate.test.js
│   │   └── movieServiceGetAll.test.js
│   │   └── movieServiceGetById.test.js
└── index.js
```

Libs para testes:

```
 npm install -D mocha chai sinon
```

Para rodar **todos os testes contidos em uma pasta**:

```
mocha <suaPastaDeTestes> --recursive

// Ou definindo um padrão, todos os arquivos .test.js

mocha .<suaPastaDeTestes>/**/*.test.js

// Ou para rodar com o nome específico do arquivo:

mocha ./tests/**/*$NAME*.test.js
```
Para utilizar: `NAME=nomeDoArquivo npm test`

No *script*:

```
...
  "scripts": {
    "test": "mocha ./tests/**/*$NAME*.test.js --exit"
  },
...
```

### Requisitos em Testes com BD em memória (Testes no Model)

Com o intuito de isolar os componentes, o teste acaba sendo dispendioso, pela necessidade de simular um retorno fidedigno ao da aplicação real. Para facilitar, uma opção seria ao invés de *mockar* das funções de acesso ao banco, utilizar um banco de dados em memória. Assim nenhuma das informações manipuladas será persisistida no disco, sendo apagadas ao final do teste.
Existem diversas libs para isso, uma delas é a [mongodb-memory-server](https://github.com/nodkz/mongodb-memory-server). Para instalá-lo:

```
npm install -D mongodb-memory-server@6
```

**OBS.**: O `@6` é a versão que foi utilizada no conteúdo.

Exemplo:

```
// const sinon = require('sinon');
// const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

// const mongoConnection = require('../../models/connection');
// const MoviesModel = require('../../models/movieModel');

// describe('Insere um novo filme no BD', () => {
//   /* Vamos deixar o objeto com o mock da conexão como uma variável global dentro desse describe. */
//   let connectionMock;
//   const payloadMovie = {
//     title: 'Example Movie',
//     directedBy: 'Jane Dow',
//     releaseYear: 1999,
//   };

    /* Aqui atualizamos o código para usar o banco montado pela lib `mongo-memory-server` */
    before(async () => {
      const DBServer = new MongoMemoryServer();
      const URLMock = await DBServer.getUri();

      connectionMock = await MongoClient
        .connect(URLMock, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        })
        .then((conn) => conn.db('model_example'));

      
      sinon.stub(mongoConnection, 'getConnection').resolves(connectionMock);
    });

//   /* Restauraremos a função `getConnection` original após os testes. */
//   after(() => {
//     mongoConnection.getConnection.restore();
//   });    

//   describe('quando é inserido com sucesso', () => {

//     it('retorna um objeto', async () => {
//       const response = await MoviesModel.create(payloadMovie);

//       expect(response).to.be.a('object');
//     });

//     it('tal objeto possui o "id" do novo filme inserido', async () => {
//       const response = await MoviesModel.create(payloadMovie);

//       expect(response).to.have.a.property('id');
//     });

//   });

// });
```

### Service e testes

É uma boa prática mockar o model, como:

```
before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';

      sinon.stub(MoviesModel, 'create')
        .resolves({ id: ID_EXAMPLE });
    });
```

### Controllers e testes

> Percebam que os testes do controller tem uma particularidade em sua implementação. Isso acontece porque diferente das outras camadas, o controller não possui funções simples que retornam um resultado qualquer, mas sim middlewares que funcionam a partir dos objetos req , res , next e error .
> Dessa forma, para conseguirmos testar, precisaremos passar um input a partir do req e validar o output a partir do res , validando se os devidos métodos foram chamados e com os parâmetros esperados.
> Para nos ajudar com essa tarefa iremos utilizar recursos do sinon , observe como ira ficar no teste do movieController
(Fonte [Trybe](https://www.betrybe.com/))

```
describe('Ao chamar o controller de create', () => {
  describe('quando o payload informado não é válido', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
    })

    it('é chamado o status com o código 400', async () => {
      await MoviesController.create(request, response);

      expect(response.status.calledWith(400)).to.be.equal(true);
    });

    it('é chamado o json com a mensagem "Dados inválidos"', async () => {
      await MoviesController.create(request, response);

      expect(response.json.calledWith({ message: 'Dados inválidos' })).to.be.equal(true);
    });

  });

  (...)
```

Criamos o mock da função de respostas (`response`) e verificamos se ela foi chamada com os devidos parâmetros: `expect(response.status.calledWith(400)).to.be.equal(true);`.

## Links

- [Unit Tests - Martin Fowler](https://martinfowler.com/bliki/UnitTest.html)

- [Artigo Trybe: Teste unitário: o que são, por que usar e por onde começar?](https://blog.betrybe.com/tecnologia/testes-unitarios/)
- [Artigo (em inglês): Blazing Fast Testing in Node with MongoDB](https://formidable.com/blog/2019/fast-node-testing-mongodb/)
- [Artigo (em inglês): Martin Fowler - UnitTest](https://martinfowler.com/bliki/UnitTest.html)
- [Ferramenta: mongodb-memory-server (MongoDB em memória)](https://github.com/nodkz/mongodb-memory-server)