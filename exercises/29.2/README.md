# Bloco 29 - Arquitetura: SOLID e ORM

## ORM - Interface da aplicação com o banco de dados

* **ORM** (*Object Relational Mapper*): Camada de mapeamento que permite relacionar a estrutura de dados da aplicação com os dados do banco de dados.
* Abstrai as diferenças entre dois paradigmas: da aplicação e do banco de dados.

![ORM APP DB](./ORMappBd.png)

* Uma lib que faz isso: *Sequelize*. Suporta: PostgreSQL, MariaDB, MySQL, SQLite e Microsoft SQL Server.

## Mapeamentos

* Dois padrões: **Data Mapper** e **Active Record**.
  - Definidos por *Martin Fowler* em *Padrões de Arquitetura de Aplicações Corporativas*

### Data Mapper

* Classe que representa a tabela do banco não deve conhecer os recursos necessários para realizar as transações com o banco.

![Data Mapper](./DataMapper.png)

> No Data Mapper , como podemos ver acima, a entidade Pessoa está desacoplada do banco de dados. As informações e os comportamentos relacionadas à Pessoa no contexto específico do nosso negócio ficam em um lugar, e em um outro, o Mapeador Pessoa , temos a camada responsável por criar as transações das informações com o banco de dados.

* *Mapeador Pessoa* -> fortemente acoplado ao banco.
  - Devendo ser refatorado ou refeito toda a vez que houver mudanças na estrutura do banco.
* Entidade *Pessoa* é completamente independente do banco.
  - Complexidade absorvida pelo mapeador.

### Active Record

* Classe que representa a tabela conhece os recursos do banco.

![Active Record](./ActiveRecord.png)

> No Active Record o model está diretamente acoplado ao banco de dados. Dessa forma, o nosso próprio model descreve as operações do banco de dados e tem conhecimento de como salvar os dados, atualizá-los, deletá-los etc.

## Sequelize

* Maioria dos métodos é assíncrono.
> Usando o Sequelize, você pode evitar a criação de queries SQL e utilizar models e migrations para criar as tabelas em vez de um script SQL separado.
* Código mais legível, extensível e de fácil manutenção.
* Criar as relações e associações entre tabelas pelo próprio JS, no *Active Record*.
* Possibilita migrar a base de dados para outro banco sem precisar reescrever o código.

![Sequelize](./sequelize.png)

### Configurando

* **Instalação**
```
npm install sequelize

// Gera e executa as operações
npm install sequelize-cli

// Dependência do Banco
npm install mysql2
```

* **Iniciar um projeto do Sequelize**
```
npx sequelize-cli init
```
  - Comando cria as pastas:
    * `config` : contém um arquivo de configuração, que "fala" para o CLI como conectar-se com o nosso banco de dados;
    * `models` : contém todos os modelos da nossa aplicação;
    * `migrations` : contém todos os arquivos de migração da nossa aplicação;
    * `seeders` : contém todos os arquivos de "seeds".

* **Conectando com o banco**
  * Configurar o arquivo: `config/config.json`
    - Somente o objeto `development`.
  ```
  {
    "development": {
      "username": "root",
      "password": "",
      "database": "orm_example",
      "host": "127.0.0.1",
      "dialect": "mysql"
    }

    // No resto do arquivo você vai encontrar as convenções para conectar o Sequelize em outros ambientes
  }
  ```
    * Usuário de acesso ao banco de dados;
    * Senha de acesso ao banco de dados;
    * Nome do banco de dados no qual queremos conectar;
    * Host que estamos conectando - por ser local, utilizamos o 127.0.0.1 ;
    * Dialect é, nada mais nada menos, qual banco estamos utilizando. Dito isso, passamos "mysql".

* **Criando o Banco de Dados via CLI**
  ```
   npx sequelize db:create
  ```

### Model

* Na pasta `models`, existe um arquivo `index.js`. Sua função é estabelecer uma isntância de conexão entre os arquivos presentes na pasta e o banco. **NÃO APAGUE ESSE ARQUIVO**.
* EssÊncia do *Sequelize*.
  - Abstração que representa uma linha na tabela.
* 2 modos de criação:
  - Chamando pela função `sequelize.define(modelName, attributes, options)`.
  - Estendendo *Model* como uma classe e chamando `init(attributes, options)`.

> A segunda forma é a padrão para utilização do sequelize, gerada automaticamente quando utilizado os comandos do CLI, e é específica para programação Orientada a Objetos .

* Utilizaremos mais a primeira forma.
* **Criando um model (template)**
  ```
   npx sequelize model:generate --name NomeDoModel --attributes nomeDoAtributo:string
  ```
  - Além do `model`, gera o `migration`, que cria a tabela no banco.

  > O parâmetro `--name` se refere ao nome da tabela, mas no singular, pois se refere a uma unidade dos dados, como uma linha no banco ou um objeto no seu código javascript;

  > O parâmetro `--attributes` se refere ao nome das colunas e os tipos de dados que ela contém. Não é preciso definir todas as colunas neste comando, é possível adicioná-las direto no arquivo `model.js` gerado e na migration equivalente a este model.

  * Depos de executado o comando, são criados arquivos na pasta `model` e na pasta `migration`.
    - No segundo, os números, no início do nome do arquivo, significam a data e a hora de criação dele, seguindo o formato `yyyy-MM-dd:hh:mm:ss`.
* **Substituir o arquivo criado**
  - Por estarmos trabalhando com funções, é necessário adaptar o arquivo criado em `model`. Para algo semelhante a:
  ```
  const User = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
    });

    return User;
  };

  module.exports = User;
  ```
    - No exemplo foi adicionado mais um atributo a entidade, o `email`.

> Agora, a imagem abaixo mostra o nosso model e migration criados. Perceba que o nome do arquivo model é user.js , o nome da função model definida está no singular User e na migration a tabela foi nomeada como Users .

![Exemplo do Model](./ExamploModel.png)

> Um ponto **importante** de mudança estrutural que o sequelize traz é que, da forma que aprendemos antes, sem o sequelize, nossa lógica de validações, interação com o banco de dados (get, insert etc.), entre outras, se centralizavam no model. Com o Sequelize, essa lógica se centraliza nos controllers ou services. O modelo fica responsável apenas por representar a estrutura do banco de dados, para ajudar o sequelize a realizar as operações.

### Migrações

> Uma migration é uma forma de versionar o schema do banco de dados, ou seja, cada migration conterá um pedaço de código que representa, no conjunto, todas as alterações feitas no histórico do nosso banco de dados.

> Imagine assim: você escreve um código definindo como um banco de dados deve ser criado, e esse código fica salvo num arquivo na pasta **migrations** . Após um tempo, uma atualização é feita, e uma coluna é acrescentada em uma tabela. O que você faz? Escreve em **outro arquivo** o código para acrescentar essa coluna. Cada arquivo é marcado com uma estampa datetime , então ao longo do tempo esse código, que é mantido no controle de versão do git, vai empilhando dezenas, às vezes centenas de arquivos, e cada um marca uma versão do banco de dados e o seu histórico de mudanças e evoluções. Quem clona um projeto pela primeira vez roda suas migrations para configurar, sem ter que fazer mais nada, o banco de dados no formato mais recente enviado para master . Aí é possível trabalhar localmente no banco de dados da aplicação sem medo de ele ser diferente da versão mais nova que encontramos em master .

* `Up` e `Down` -> Toda `migration` sabe o que deve fazer no banco de dados(`Up`) e sabe como reverter(`Down`).

> Isso significa que as migrations têm o poder de avançar ou reverter o seu banco de dados para qualquer um dos estados que ele já teve.

* **Exemplo de Migration**

```
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullName: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
```

  * Parâmetros `queryInterface` e `Sequelize`
    - Objetos que armazenam operações.
    - `queryInterface` usado para modificar o banco. Utilziando o 'dialeto do banco'
    - `Sequelize` armazena os tipos de dados disponíveis no banco.

* **Adicionando Email**
```
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullName: {
        type: Sequelize.STRING
      },
      // adicionamos um novo campo 'email' como foi feito no model !
      email: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
```

* Para rodar as alterações no banco:
```
npx sequelize db:migrate
```

* Para reverter uma migration:
```
npx sequelize db:migrate:undo
```

* **Criando uma nova migration para alterar uma tabela já existente**

  - **NÃO** rodar o `db:migrate:undo`para adicionar novos campos, ele exclui a tabela. Consequentemente excluindo as informações salvas.

  > Criar uma nova migration que permita alterar a tabela, e para isso o objeto queryInterface possui funções específicas que permitem criar uma nova coluna, remover uma coluna ou mesmo mudar o tipo de uma coluna que já existe. Nesse caso, o queryInterface abstrai o que a função ALTER TABLE faz no SQL.

  * Criar um novo arquivo de *Migration*:
  ```
   npx sequelize migration:generate --name add-column-phone-table-users
  ```
    - O `add-column-phone-table-users` é o noem que a *migration* terá, como um *commit*.
  * Como será criado:
  ```
  'use strict';

  module.exports = {
    up: async (queryInterface, Sequelize) => {
      /**
      * Add altering commands here.
      *
      * Example:
      * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
      */
    },

    down: async (queryInterface, Sequelize) => {
      /**
      * Add reverting commands here.
      *
      * Example:
      * await queryInterface.dropTable('users');
      */
    }
  };
  ```
    * Esqueleto da `migration`.
    * `Up`: Função de criar coluna `queryInterface.addColumn()`.
    * `Down`: Função de remover coluna `queryInterface.removeColumn()`.
  ```
  'use strict';

  module.exports = {
    up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'phone_num', {
      type: Sequelize.STRING,
    });
    },

    down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn('Users', 'phone_num');
    }
  };
  ```
  * Rode o comando para executar as mduanças:
  ```
   npx sequelize db:migrate
  ```
  * Alterar o model referente a tabela alterada:
  ```
  const User = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    // aqui inserimos o datatype da coluna criada
    phone_num: DataTypes.STRING,
    });

    return User;
  }
  ```

* [Documentação dos tipos de alterações do queryInterface](https://sequelize.org/master/manual/query-interface.html)

### Seeders

* Comandos para popular bancos ao serem executados.

> Conclusão: um seeder é usado para, basicamente, alimentar o banco de dados com informações necessárias para o funcionamento mínimo da aplicação. (...) Os seeds seguem a mesma linha das migrations.

* **Criação de um seed**

```
 npx sequelize seed:generate --name users
```
  - Cria um arquivo na pasta `seeders` com o mesmo formato de um `migration`
  - O exemplo cria um *seed* `users`, podendo alterar para o nome que fizer mais sentido.
  - Colocando as informações iniciais do banco:
  ```
  'use strict';

  module.exports = {
    up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Users',
      [
        {
          fullName: 'Leonardo',
          email: 'leo@test.com',
          // usamos a função CURRENT_TIMESTAMP do SQL para salvar a data e hora atual nos campos `createdAt` e `updatedAt`
          createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
          updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        {
          fullName: 'JEduardo',
          email: 'edu@test.com',
          createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
          updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      ], {}),

    down: async (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
  };
  ```
  - Utiliza a função recebida como parâmetro em `queryInterface`.
  - Chama o método `bulkInsert` dela. Que insere múltiplos dados na tabela.
  - Segue o mesmo princípio do `up` e `down`.

* **Executar o seed**
```
 npx sequelize db:seed:all
```
* **Reverter**
```
 npx sequelize db:seed:undo:all
```

### Operações

> controllers/userController.js

```
const express = require('express');
const { User } = require('../models');
const router = express.Router();

// Este endpoint usa o método findAll do Sequelize para retorno todos os users.
router.get('/', async (_req, res) => {
  try {
    const users = await User.findAll();

    return res.status(200).json(users);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  };
});

// ...

module.exports = router;
```

* Sequelize oculta a complexidade e provê uma forma menos trabalhosa de escrever código.

> Reparem que estamos importando o modelo que criamos do arquivo index.js da pasta models, e não diretamente do arquivo User.js . Quando executamos o comando npx sequelize init , o arquivo index.js é gerado dentro da pasta models.

> O código desse arquivo index.js é responsável por, basicamente, realizar a conexão com o banco de dados, através do arquivo config.json , coletar todos os modelos definidos dentro da pasta models e, caso necessário, associar um modelo a algum outro.

* **Outras operações**
```
// Este endpoint usa o método findByPk do Sequelize para buscar um usuário pelo id.
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    return res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

// Este endpoint usa o método findOne do Sequelize para buscar um usuário pelo id e email.
// URL a ser utilizada para o exemplo http://localhost:3000/user/search/1?email=aqui-o-email
router.get('/search/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.query;
    const user = await User.findOne({ where: { id, email }});

    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    return res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

// Este endpoint usa o método create do Sequelize para salvar um usuário no banco.
router.post('/', async (req, res) => {
  try {
    const { fullName, email } = req.body;
    const newUser = await User.create({ fullName, email });

    return res.status(201).json(newUser);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

// Este endpoint usa o método update do Sequelize para alterar um usuário no banco.
router.put('/:id', async (req, res) => {
  try {
    const { fullName, email } = req.body;
    const { id } = req.params;

    const [updateUser] = await User.update(
      { fullName, email },
      { where: { id } },
    );

    console.log(updateUser); // confira o que é retornado quando o user com o id é ou não encontrado;

    if(!updateUser) return res.status(404).json({ message: 'Usuário não encontrado' });

    return res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

// Este endpoint usa o método destroy do Sequelize para remover um usuário no banco.
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.destroy(
      { where: { id } },
    );

    console.log(deleteUser) // confira o que é retornado quando o user com o id é ou não encontrado;

    return res.status(200).json({ message: 'Usuário excluído com sucesso!' });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = router;
```


## Links
- [Documentação dos tipos de alterações do queryInterface](https://sequelize.org/master/manual/query-interface.html)