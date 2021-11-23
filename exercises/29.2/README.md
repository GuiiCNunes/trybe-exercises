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

## Links