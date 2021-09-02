# Bloco 22 - Normalização e Modelagem de Banco de Dados

## Transformando ideias em um modelo de banco de dados - Parte 2

### Clonar tabelas

```
-- Sintaxe:
CREATE TABLE nome_para_nova_tabela LIKE tabela_a_ser_clonada;

--Verificar o banco certo
USE nome_do_banco_de_dados;
CREATE TABLE nome_para_nova_tabela LIKE tabela_a_ser_clonada;

-- Exemplo:
CREATE TABLE actor_clone LIKE sakila.actor;
```

**Tomar cuidado que se não apontar o banco, ela joga no que está em uso**.
**Não clona dados.**

### VIEW

`VIEW` é uma tabela temporária no banco de dados, que pode ser consultada como qualquer outra. Permite:

- Ter uma tabela que pode ser usada me relatórios.
- Ter uma tabela que pode ser usada como base para montar novas *queries*.
- Reduz a necessidade de recriar *queries* utilizadas com frequência.

```
-- Defina em qual banco a view será criada
USE nome_do_banco_de_dados;
-- Comando para criar a view
CREATE VIEW nome_da_view AS query;
```

Exemplo:

```
CREATE VIEW top_10_customers AS
    SELECT c.customer_id, c.first_name, SUM(p.amount) AS total_amount_spent
    FROM sakila.payment p
    INNER JOIN sakila.customer c ON p.customer_id = c.customer_id
    GROUP BY customer_id
    ORDER BY total_amount_spent DESC
    LIMIT 10;

-- Para usar
SELECT * FROM top_10_customers;

-- Para excluir
DROP VIEW nome_da_view;
```

### ALTER TABLE

Exemplo:

```
-- Cria a tabela utilizada no exemplo
USE sakila;
CREATE TABLE noticia(
    noticia_id INT PRIMARY KEY,
    titulo VARCHAR(100),
    historia VARCHAR(300)
) engine = InnoDB;

-- Adicionar uma nova coluna
ALTER TABLE noticia ADD COLUMN data_postagem date NOT NULL;

-- Modificar o tipo e propriedades de uma coluna
ALTER TABLE noticia MODIFY noticia_id BIGINT;

-- Adicionar incremento automático a uma coluna
-- (especifique o tipo da coluna + auto_increment)
ALTER TABLE noticia MODIFY noticia_id BIGINT auto_increment;

-- Alterar o tipo e nome de uma coluna
ALTER TABLE noticia CHANGE historia conteudo_postagem VARCHAR(1000) NOT NULL;

-- Dropar/Excluir uma coluna
ALTER TABLE noticia DROP COLUMN data_postagem;

-- Adicionar uma nova coluna após outra
ALTER TABLE noticia ADD COLUMN data_postagem DATETIME NOT NULL AFTER titulo;

-- Adicionar uma nova coluna como primeira
ALTER TABLE noticia ADD COLUMN data_postagem DATETIME NOT NULL FIRST;
```

Para ver as alterações:
```
SHOW COLUMNS FROM sakila.noticia;
```

### DROP TABLE

Excluir uma tabela, pode ocorrer restrição de chave estrangeira, caso tente excluir uma tabela que é referenciada em outra. Para funcionar, exclui a tabela que usa a referência antes.

> Integridade referencial : Propriedade que afirma que todas as referências de chaves estrangeiras devem ser válidas.

```
DROP TABLE nome_da_tabela;
```

### INDEX (ou KEY)

Tipos:

- `PRIMARY KEY`: Numérico ou caracteres, só pode em uma coluna por tabela.
- `UNIQUE`: Numérico ou caracteres, pode em mais de uma coluna por tabela.
- `INDEX`: Valor numérico, pode ser colocado em multiplas colunas.
- `FULLTEXT INDEX`: Busca em index maiores que um número.

Pontos Positivos:

- Acelera as *queries* `SELECT`.
- Permite uma coluna ter valores únicos (`UNIQUE`).
- Permiter buscar em grandes pedaços de textos (`FULLTEXT INDEX`).
- Acelera operações de `UPDATE`que utilizam o `WHERE`.

Pontos Negativos:

- Ocupam espaço.
- Tornam lentos os `INSERT`, `UPDATE` e `DELETE`, porque cada indice precisa ser atualizado junto com os dados.

**Antes era utilizado como `KEY`, mas as versões mais novas do *MySQL* admitem o uso do `INDEX`.**

#### Como criar

1. Depois que uma tabela já está criada

```
CREATE INDEX nome_index ON tabela(coluna);
CREATE FULLTEXT INDEX nome_index ON tabela(coluna);
CREATE UNIQUE INDEX nome_do_indice ON nome_tabela(nome_coluna);
```

2. Ao criar uma tabela

```
CREATE TABLE pizzas (
  pizza_id INT PRIMARY KEY,
  sabor VARCHAR(100),
  preco DECIMAL(5,2),
  INDEX sabor_index(sabor)
) ENGINE=InnoDB;
```

3. Alterando uma tabela

```
ALTER TABLE nome_tabela
ADD INDEX nome_index(nome_coluna);
-- Pode ser o FULLTEXT INDEX e UNIQUE INDEX tambem
```

* Sintaxes genéricas

```
-- Criando um índice em uma coluna
CREATE [INDEX | FULLTEXT INDEX | UNIQUE INDEX] nome_indice
ON tabela (coluna);

-- Criando um índice composto, em duas ou mais colunas
CREATE [INDEX | FULLTEXT INDEX | UNIQUE INDEX] nome_indice
ON tabela (coluna1, coluna2);

-- Excluindo índices
DROP INDEX nome_do_indice ON tabela;

-- Mostras os indices utilizados
SHOW INDEX FROM tabela;
```

* Quando não utilizar

- Em tabelas pequenas, pois a diferença de performance será mínima, se houver;
- Em colunas que retornarão uma grande quantidade dados quando filtradas. Por exemplo, você não adicionaria os artigos "o" e "a" ao índice de um livro;
- Em tabelas que frequentemente têm atualizações em grande escala, uma vez que a performance dessas atualizações será afetada;
- Em colunas que são frequentemente manipuladas, haja vista que a manutenção do índice dessa coluna pode demandar muito tempo quando feita em excesso;
- Em colunas que possuem muitos valores nulos.

## Link

- [full-text search](https://www.mysqltutorial.org/mysql-natural-language-search.aspx)
- [MySQL Create Index - w3resource](https://www.w3resource.com/mysql/creating-table-advance/create-index.php)
- [MySQL Views - w3resource](https://www.w3resource.com/mysql/mysql-views.php)
- [Integridade referencial](https://pt.wikipedia.org/wiki/Integridade_referencial)
