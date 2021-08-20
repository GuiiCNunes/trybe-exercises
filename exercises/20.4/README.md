# Bloco 20 - Introdução à SQL

## Manipulando tabelas

Aspas:

- Backticks ou crase ( `` ): Para nomes de tabelas ou colunas, quando estes forem palavras reservadas do MySQL ou com espaços.

-Aspas simples ( '' ): Para *strings*, aceitas na maioria dos SGBD's. Preferível à aspas duplas.

### INSERT

```
INSERT INTO nome_da_tabela (coluna1, coluna2)
VALUES ('valor_coluna1', 'valor_coluna2');

-- Multiplas linhas com apenas uma query
INSERT INTO nome_da_tabela (coluna1, coluna2) VALUES
('valor_1','valor_2'),
('valor_3','valor_4'),
('valor_5','valor_6');
```

- `INSERT IGNORE`: Pula os erros que a *query* pode ocasionar, mantendo sua execução. Como duplicidade de chaves primárias, etc...

```
INSERT IGNORE INTO nome_da_tabela (coluna1, coluna2)
VALUES ('valor_coluna1', 'valor_coluna2');
```

- auto_increment: É uma *constrains* relacionada a coluna, que, quando não inserido valores nela, ela pega o ultimo registro, acresce 1 e atribui a celula. **Colunas que possuem essa propriedade podem ser omitidas no `INSERT`**.

- `INSERT SELECT`: Inserir dados de outra tabela na tabela.

```
INSERT INTO tabelaA (coluna1, coluna2)
  SELECT tabelaB.coluna1, tabelaB.coluna2
  FROM tabelaB
  WHERE tabelaB.nome_da_coluna <> 'algumValor'
  ORDER BY tabelaB.coluna_de_ordenacao;
```
  Pode ser utilizado com `*`, mas ai é necessário que ambas tabelas tenham a mesma quantidade de colunas.

### UPDATE

```
UPDATE nome_da_tabela
SET propriedade_a_ser_alterada = 'novo valor para coluna'
WHERE alguma_condicao; -- importantíssimo aplicar o WHERE para não alterar a tabela inteira!
```

- **Safe updates mode**: Funcionalidade do MySQL que bloqueia `UPDATE` e `DELETE` que não tenham um *id* do que se deseja modificar. Para desativar:

```
SET SQL_SAFE_UPDATES = 0;

-- Config padrão do MySQL:
SET sql_safe_updates=1, sql_select_limit=1000, max_join_size=1000000;

-- Outra config:
SET sql_safe_updates=1, sql_select_limit=500, max_join_size=10000;
```

- Para alterar mais de uma coluna:

```
UPDATE sakila.staff
SET first_name = 'Rannveig', last_name = 'Jordan'
WHERE staff_id = 4;
```

- `UPDATE` em massa:

```
-- Opção 1 - Incluindo a lista de condições fixas
UPDATE sakila.actor
SET first_name = 'JOE'
WHERE actor_id IN (1,2,3);

-- Opção 2 - Especificando como cada entrada será alterada individualmente
UPDATE sakila.actor
SET first_name = (
CASE actor_id WHEN 1 THEN 'JOE' -- se actor_id = 1, alterar first_name para 'JOE'
    WHEN 2 THEN 'DAVIS' -- se actor_id = 2, alterar first_name para 'DAVIS'
    WHEN 3 THEN 'CAROLINE' -- se actor_id = 3, alterar first_name para 'CAROLINE'
  ELSE first_name -- em todos os outros casos, mantém-se o first_name
END);
```

- `UPDATE` de forma sequencial: Utilizar o `ORDER BY` junto com o `UPDATE` faz com que as atualizações sejam executadas em sequência. Com o uso do `LIMIT`, é limitado a quantidade de linhas que serão atualizadas.

```
-- Campos com [] são opcionais
UPDATE nome_da_tabela
SET coluna1 = valor1, coluna2 = valor2
[WHERE condições]
[ORDER BY expressao [ ASC | DESC ]]
[LIMIT quantidade_resultados];

-- Exemplo:
UPDATE sakila.staff
SET password = 'FavorResetarSuaSenha123'
WHERE active = 1
ORDER BY last_update
LIMIT 2;
```

### DELETE

```
DELETE FROM banco_de_dados.tabela
WHERE coluna = 'valor';
-- O WHERE é opcional. Porém, sem ele, todas as linhas da tabela seriam excluídas.

-- Exemplo
DELETE FROM sakila.film_text
WHERE title = 'ACADEMY DINOSAUR';
```

- Restrições do `DELETE`: São erros disparadas conforme a configuração da **primary_key** e **foreign_keys**. Para continuar com a execução do comando, é necessário excluir todas as referências do que está se excluindo em outras tabelas. Algumas restrições:

```
-- Rejeita o comando DELETE.
ON DELETE NO ACTION;

-- Rejeita o comando DELETE.
ON DELETE RESTRICT;

-- Permite a exclusão dos registros da tabela pai, e seta para NULL os registros da tabela filho.
ON DELETE SET NULL;

-- Exclui a informação da tabela pai e registros relacionados.
ON DELETE CASCADE;
```

- `TRUNCATE`: Limpa os registros de uma tabela inteira. Mais rápido que o `DELETE` e não aceita `WHERE`.

```
TRUNCATE banco_de_dados.tabela;
```

## Links

- [CASE Function](https://www.w3schools.com/sql/func_mysql_case.asp)
- [Tutorial sobre INSERT do Guru99](https://www.guru99.com/insert-into.html)
- [Tutorial sobre INSERT do MySQL Tutorial](https://www.mysqltutorial.org/mysql-insert-statement.aspx)
- [Tutorial sobre UPDATE do MySQL Tutorial](https://www.mysqltutorial.org/mysql-update-data.aspx)
- [Tutorial sobre DELETE e UPDATE do Guru99](https://www.guru99.com/delete-and-update.html)
- [Tutorial sobre DELETE do MySQL Tutorial](https://www.mysqltutorial.org/mysql-delete-statement.aspx)
- [Tutorial sobre DELETE do Tech On The Net](https://www.techonthenet.com/mysql/delete.php)
- [Documentação sobre restrições de chaves estrangeiras no MySQL](https://dev.mysql.com/doc/refman/5.7/en/create-table-foreign-keys.html)
