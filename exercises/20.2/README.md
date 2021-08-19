# Bloco 20 - Introdução à SQL

## Encontrando dados em um banco de dados

### DDL - Data Definition Language

Todos os comandos que lidam com o esquema, a descrição e o modo como os dados devem existir em um banco de dados:
- `CREATE` : Para criar bancos de dados, tabelas, índices, views, procedures, functions e triggers
- `ALTER` : Para alterar a estrutura de qualquer objeto
- `DROP` : Permite deletar objetos
- `TRUNCATE` : Apenas esvazia os dados dentro de uma tabela, mas a mantém no banco de dados

###  DML - Data Manipulation Language

Comandos que são usados para manipular dados. São utilizados para armazenar, modificar, buscar e excluir dados em um banco de dados. Os comandos e usos mais comuns nesta categoria são:
- `SELECT` : usado para buscar dados em um banco de dados
- `INSERT` : insere dados em uma tabela
- `UPDATE` : altera dados dentro de uma tabela
- `DELETE` : exclui dados de uma tabela

### DCL - Data Control Language

Focado mais nos comandos que concedem direitos, permissões e outros tipos de controle ao sistema de banco de dados.
- `GRANT` : concede acesso a um usuário
- `REVOKE` : remove acessos concedidos através do comando GRANT

### TCL - Transactional Control Language

Lida com as transações dentro de suas pesquisas.
- `COMMIT` : muda suas alterações de temporárias para permanentes no seu banco de dados
- `ROLLBACK` : desfaz todo o impacto realizado por um comando
- `SAVEPOINT` : define pontos para os quais uma transação pode voltar. É uma maneira de voltar para pontos específicos de sua query
- `TRANSACTION` : comandos que definem onde, como e em que escopo suas transações são executadas

### Comandos

- `AS`: Atribui um apelido a coluna. Ex.: `SELECT 2019 AS ano;`, `SELECT 18 AS 'minha idade';`
- `FROM`: Seleciona a Tabela que quer utilizar. Ex.: `SELECT * FROM nomeBanco.nomeTabela;`, se utilizar o `USE`, não é necessário colocar o nome do banco, o `*` retorna o valor de todas colunas, mas pode ser especificado qual coluna deseja (mais de uma separar por virgula).
- `CONCAT`: Concatena duas ou mais colunas em uma única. Ex.:

```
SELECT CONCAT(first_name, ' ', last_name) AS 'Nome Completo' FROM sakila.actor;
```

- `DISTINCT`:  Retira os valores duplicados na apresentação. **NÃO EXCLUI**, apenas não mostra. Leva em cosideração todos os campos colocados na busca. Ex.: `SELECT DISTINCT first_name, last_name FROM sakila.actor;`

- `COUNT`: Retorna a quantidade de valores daquela pesquisa. Campos nulos não são contatos. Ex.:

```
SELECT COUNT(*) FROM sakila.actor;
SELECT COUNT(DISTINCT first_name) FROM sakila.actor;
SELECT COUNT(first_name) FROM sakila.actor WHERE first_name = 'BEN';
```

- `LIMIT`: Limitar a quantidade apresentada. Ex.:

```
# Query + LIMIT quantidade_de_resultados
SELECT * FROM sakila.rental LIMIT 10;
```

- `OFFSET`: Pular linhas iniciais. Ex.:

```
# Query + LIMIT quantidade_de_linhas OFFSET quantidade_de_linhas
SELECT * FROM sakila.rental LIMIT 10 OFFSET 3;
```

- `ORDER BY`: Ordena os valores em ordem crescente (`ASC`, padrão) ou decrescente (`DESC`), podendo receber mais de um campo para ordenação, a ordenação segue a ordem dos campos. Ex.:

```
SELECT * FROM sakila.address
ORDER BY district ASC, address DESC;
```

## Links

- [Introdução ao básico do SQL com prática](https://sqlzoo.net/wiki/SELECT_basics)
- [W3Schools - Curso SQL online](https://www.w3schools.com/sql/)
- [Documentação Oficial MySQL](https://dev.mysql.com/doc/refman/8.0/en/)
- [Tutorial sobre tipos de comando SQL do W3Schools](https://www.w3schools.in/mysql/ddl-dml-dcl/)
- [Tutorial sobre tipos de comando SQL do Java T Point](https://www.javatpoint.com/dbms-sql-command)
