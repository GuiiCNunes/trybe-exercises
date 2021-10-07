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

## Links

* [Software Architecture Guide - Martin Fowler](https://martinfowler.com/architecture/)
* [O que são regras de negócio e quais as vantagens de aplicá-las em uma empresa](https://www.heflo.com/pt-br/automacao-processos/o-que-sao-regras-de-negocio/)
* [Entenda o que são e confira 10 exemplos de regras de negócio](https://www.heflo.com/pt-br/definicoes/regra-de-negocio/)
