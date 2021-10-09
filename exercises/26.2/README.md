# Bloco 26 - NodeJS: Camada de Serviço e Arquitetura Rest e Restful

## Arquitetura de Software - Camada de Controller e Service

* **Controller** - receber e tratar os dados da requisição.
* **Service** - aplicar as regras de negócio da aplicação antes de qualquer comunicação com o banco.

### Controllers

O principal componente dessa camada são os *middlewares*. Aqui acontece um filtro das informações que chegam com a requisição, antes de serem encaminhadas o *service*.

Para a validação dos dados, podemos utilziar a lib `Joi`:

```
npm i joi
```

### Service

- Deve centralizar acesso a dados e funções externas. Exemplo: chamar um evento que dispara uma mensagem no Slack;
- Deve abstrair lógica de negócio complexa do seu modelo;
- Não deve ter nenhum tipo de informação sobre o acesso a camada de dados. Exemplo: não ter nenhuma query SQL;
- Não deve receber nada relacionado ao HTTP, seja o request ou o response . O controller deve mandar apenas o necessário para o service .

O service **identifica e gera erros**, o gerar é relacionado aos erros que atinjam as regras de negócio.

### Organizando a API

Tipos de organização:

* Por **domínio/correlação** , nós mantemos todos os arquivos que têm relação com um Author , por exemplo, na mesma pasta, independente da responsabilidade de cada arquivo

```
└── author
│   ├── authorController.js
│   ├── authorService.js
│   └── authorModel.js
└── book
│   └── bookController.js
│   └── bookService.js
│   └── bookModel.js
```

* Por **papel técnico** é como temos exemplificado até agora (não que seja necessariamente melhor). Todos os controllers em uma pasta, todos os services em outra e por aí vai:

```
└── controllers
│   ├── authorController.js
│   └── bookController.js
└── services
│   ├── authorService.js
│   └── bookService.js
└── models
│   ├── authorModel.js
│   └── bookModel.js
```

Mantenha o **Express o mais longe possível**! Ou seja, mantenha os `req` e `res` dentro do escopo do *controller*, as outras camadas devem receber só o necessário.

#### Mantenha sua configuração separada (e segura)

Para as configurações, como URL do banco, logins, senhas,... , é uma boa prática armazenar esses valores em variáveis de ambiente, assim não é necessário ter o valor a mostra no arquivo e nem ficar alterando caso use outro computador.

O ambiente *Node* tem uma **variável global** chamada `process`, dentro dela há um objeto `env` que armazena todos os valores das variáveis de ambiente do sistema.

Para setar uma variável, no terminal:

```
DB_URL="mongodb://localhost:27017" node index.js
```

Para usar:

```
// index.js

console.log(process.env.DB_URL) // mongodb://localhost:27017
```

Outra opção é utilizar uma biblioteca para isso: `dotenv`

```
npm install dotenv
```

Essa lib deixa as variáveis de ambiente acessíveis dentro da aplicação via `process.env `.

```
# .env
PORT=3000
DB_URL=mongodb://localhost:27017
DB_NAME=model_example
```

Exemplos de uso:

```
// index.js

require('dotenv').config();
// ...

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
// Server listening on port 3000
```

```
// models/connection.js

const { MongoClient } = require('mongodb');

const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const MONGO_DB_URL = 'mongodb://127.0.0.1:27017';

let db = null;

const connection = () => {
    return db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => {
    db = conn.db('model_example');
    return db;
    })
};

module.exports = connection;
```

**Não esqueça de colocar o arquivo `.env` no `gitignoe`.**

## Links

* [Best Practices with NodeJS](https://github.com/goldbergyoni/nodebestpractices#1-project-structure-practices)
* [The Service Layer - Martin Fowler](https://martinfowler.com/eaaCatalog/serviceLayer.html)
* [Bulletproof node.js project architecture](https://dev.to/santypk4/bulletproof-node-js-project-architecture-4epf)
