# Bloco 26 - NodeJS: Camada de Serviço e Arquitetura Rest e Restful

## Arquitetura de Software - Camada de Model

A camada Model é responsável por ligar a aplicação ao(s) Banco(s) de Dados. Agindo de forma isolada do restante da aplicação, ela apenas coleta as informações do banco, trata e encaminha para onde for necessário.

### Model com MySQL

Para realizar a comunicação entre API e banco, é necessário a utilização de um ***driver***. Este nada mais é que uma *lib* que fica responsável por isso. Uma opção é a lib `mysql2`.

```
 npm install mysql2
```

É uma boa prática criar uma pasta `models`, assim fica mais evidente o que cada coisa está fazendo. Essa pasta terá um arquivo `connection.js`, resposável por realizar a conexão com o banco de dados. Exemplo:

```
// models/connection.js

const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'senha123',
    database: 'model_example' });

module.exports = connection;
```
**OBS.**: A lib possui uma versão que utiliza *callbacks* e outra *promises*, é recomnedável utilizar está ultima.
**OBS.**: O método `createPool` é responsável por manter a conexão aberta, otimizando a execução da API.

O `createPool` recebe um objeto com as credenciais necessárias para a conexão:

* `host` : local onde o servidor do MySQL está armazenado. Como estamos executando localmente, usamos `localhost` ;
* `user` : usuário que vamos utilizar para acessar o banco. Estamos usando o usuário *root* nesse exemplo;
* `password` : senha do usuário especificado. Coloque '' se não houver senha para o usuário;
* `database` : nome do banco ao qual queremos nos conectar;

Dentro da pasta `model`, devem existir diferentes arquivos, cada um sendo responsável pelas interações (coletar, tratar e encaminhas as informações) com uma rota específica. Exemplo:

```
// models/Author.js

const connection = require('./connection');

// Cria uma string com o nome completo do autor

const getNewAuthor = (authorData) => {
const { id, firstName, middleName, lastName } = authorData;

const fullName = [firstName, middleName, lastName]
    .filter((name) => name)
    .join(' ');

return {
    id,
    firstName,
    middleName,
    lastName,
    name: fullName,
};
};

// Converte o nome dos campos de snake_case para camelCase

const serialize = (authorData) => ({
    id: authorData.id,
    firstName: authorData.first_name,
    middleName: authorData.middle_name,
    lastName: authorData.last_name});

// Busca todos os autores do banco.

const getAll = async () => {
    const [authors] = await connection.execute(
        'SELECT id, first_name, middle_name, last_name FROM model_example.authors;',
    );
    return authors.map(serialize).map(getNewAuthor);
};

module.exports = {
    getAll,
};
```

A função responsável por coletar as informações no banco é a `getAll`, sendo assincrona. Ela chama a conexão e pede para executar a *query* desejada. Ela trata esses dados com outras funções e retorna isso.

A função `connection.execute()` retorna uma *promise*, que, quando resolvida, fornece um *array* com dois campos `[rows, fields]`. As `rows` ontem as linhas retornadas pela *query*, ao passo que `fields` são metadados da pesquisa em sí.

#### Passando parâmetros para a query

Caso queira passar parâmetros para a *query*, o `mysql2` tem um método seguro para isso (evitando SQLInject). Na *query*, todos os valores que serão recebidos de forma dinâmica, coloque como `?` e, como segundo parâmetro do `execute` passe um *array* com as variáveis que deseja inserir. Exemplo:

```
const query = 'SELECT id, first_name, middle_name, last_name FROM model_example.authors WHERE id = ?'
const [ authorData ] = await connection.execute(query, [id]);
```

**Exemplo de inserção**
```
const create = async (firstName, middleName, lastName) => connection.execute(
    'INSERT INTO model_example.authors (first_name, middle_name, last_name) VALUES (?,?,?)',
    [firstName, middleName, lastName],
);
```

### Model com MongoDB

A lib utilizada para se comunicar com o MongoDB é a `mongodb`. Para instalar:

```
 npm install mongodb
```

A conexão é assim:

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

* `useNewUrlParser`: o time do mongodb reescreveu a forma que o driver utiliza para interpretar a URL de conexão ao banco. Por ser uma mudança muito grande, essa nova forma de interpretação de URLs só é ativada com o uso dessa flag. A forma antiga, no entanto, está depreciada, e seu uso emite um warning no terminal.

* `useUnifiedTopology`: nas versões mais recentes do driver do mongodb, a ferramenta que realiza a descoberta de servidores e a conexão com os mesmos foi alterada. Essa flag diz para o driver do mongodb que queremos utilizar essa nova forma de conexão. A forma de conexão antiga está depreciada, e seu uso emite um warning no terminal.

**OBS.**: O código de conexão segue um padrão `singleton`, nesse padrão, mesmo que o objeto ou módulo seja chamado diversas vezes, só será criado um. Na primeira vez que `connection` for chamado, a variável `db`estará vazia.

**OBS.**: O `connection` **não é um objeto**, como no `mysql2`. Agora **é uma *Promise***.

Exemplo de busca:

```
// models/Author.js

// const connection = require('./connection');

// Busca todos os autores do banco.
const getAll = async () => {
    return connection()
        .then((db) => db.collection('authors').find().toArray())
            .then((authors) =>
                authors.map(({ _id, firstName, middleName, lastName }) =>
                getNewAuthor({
                    id: _id,
                    firstName,
                    middleName,
                    lastName,
                })
            )
        );
}
// ...
```

**OBS.**: O mongo **retorna um objeto para cada documento encontrado**. Diferente do `mysql2` que retorna um *array*.

**OBS.**: Diferente do mongo puro, para escrever as *queries* se utiliza `db.collection('authors').find()`, ao invés do `db.authors.find()`. Podendo utilizar outros métodos, como `findOne` , `insertMany` e `updateMany`.

**OBS.**: **É necessário dar um `.toArray()` ao final de toda consulta.**

#### Validar id's do MongoDB

A ferramenta `ObjectId` permite validar `_id` do MongoDB. Exemplo:

```
// models/Authors.js

const { ObjectId } = require('mongodb');

// const connection = require('./connection');

// ...

// Busca um autor específico, a partir do seu ID
// @param {String} id ID do autor a ser recuperado

const findById = async (id) => {
    if (!ObjectId.isValid(id)) {
        return null;
    }

    const authorData = await connection()
        .then((db) => db.collection('authors').findOne(new ObjectId(id)));

    if (!authorData) return null;

    const { firstName, middleName, lastName } = authorData;

    return getNewAuthor({ id, firstName, middleName, lastName });
};

// ...
```

#### Inserção

```
const create = async (firstName, middleName, lastName) =>
    connection()
        .then((db) => db.collection('authors').insertOne({ firstName, middleName, lastName }))
        .then(result => getNewAuthor({ id: result.insertedId, firstName, middleName, lastName }));
```

O método `db.collection('authors').insertOne({ firstName, middleName, lastName })` tem como retorno um `result` com diversas informações a respeito do resultado da *query*. Entre essas informações, podemos destacar o `_id` que a inserção recebeu, sendo a chave `insertedId`.

## Links

* [Software Architecture Guide - Martin Fowler](https://martinfowler.com/architecture/)
* [O que são regras de negócio e quais as vantagens de aplicá-las em uma empresa](https://www.heflo.com/pt-br/automacao-processos/o-que-sao-regras-de-negocio/)
* [Entenda o que são e confira 10 exemplos de regras de negócio](https://www.heflo.com/pt-br/definicoes/regra-de-negocio/)
