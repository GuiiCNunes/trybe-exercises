# Bloco 21 - Funções SQL, Joins e Subqueries

## Descomplicando JOINs, UNIONs e Subqueries

### INNER JOIN

Possibilita a ultilização de multiplas tabelas na *query*, colocando o que é comum entre as elas.

![INNER JOIN](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk2_CRBec-Y2l-ib4TykSOyZRkdmbdkn1E1I4-IQQnb1AFEue3rUNtlTCncTbPnpRPzQM&usqp=CAU)

```
SELECT t1.coluna, t2.coluna
FROM tabela1 AS t1
INNER JOIN tabela2 AS t2
ON t1.coluna_em_comum = t2.coluna_em_comum;
```

**OBS.:** Para não precisar dos *alias*(`AS`) basta utilizar o nome completo(`banco.tabela.coluna`) das colunas ao chamar.

**OBS.:** Podemos omitir o `AS`, passando diretamente após o nome da tabela o *alias* que desejamos. Exemplo:

```
SELECT a.first_name, a.actor_id, f.actor_id
FROM sakila.actor a
INNER JOIN film_actor f
ON a.actor_id = f.actor_id;
```

**OBS.:** Não precisa sempre especificar de qual tabela está vindo, MySQL é esperto o suficiente para identificar isso. **Só é obrigatório nos campos ambiguos(que aparecem em mais de uma tabela)**. Mas é uma boa prática.

### LEFT JOIN e RIGHT JOIN

Retornam todos os valores de uma determinada tabela, mais os valores em comum com outra.

```
SELECT t1.coluna, t2.coluna
FROM tabela1 AS t1
LEFT JOIN tabela2 AS t2
ON t1.coluna_em_comum = t2.coluna_em_comum;

SELECT t1.coluna, t2.coluna
FROM tabela1 AS t1
RIGTH JOIN tabela2 AS t2
ON t1.coluna_em_comum = t2.coluna_em_comum;
```

A diferença entre eles é a tabela base (que terá todos os valores mostrados), no `LEFT JOIN` é a da esquerda (no exemplo a `t1`) e no `RIGHT JOIN`  o da direita (`t2`). O resultado a ser exibido será todos os valores da tabela base junto com os valores correspondentes na outra tabela, caso existam. Se não existirem será exibido um `NULL`.

![LEFT JOIN](https://www.techonthenet.com/sql/images/left_outer_join.gif)

### SELF JOIN

Utilizado para pesquisa e comparações dentro da própria tabela. Não possui uma *palavra reservada* própria (como os demais `JOIN`), mas sim um método para realizar. Basta chamar duas vezes a mesma tabela atribuindo um apelido. Exemplo:

```
SELECT t1.title, t1.replacement_cost, t2.title, t2.replacement_cost
FROM sakila.film AS t1, sakila.film AS t2
WHERE t1.length = t2.length;
```

### UNION e UNION ALL

Serve para unir os registros de uma tabela com o de outra, desde que usemos a mesma quantidade de colunas. A diferença entre o `UNION` e o `UNION ALL` é que o primeiro omite valores duplicados, o segundo mostra todos.
Caso queira colocar mais colunas de uma tabela do que de outra, basta passar um valor qualquer para a coluna com menos, assim esse valor ficará no lugar da ausência.
**Para ordenação**: Colocar as *querys* entre parênteses e colocar o `ORDER BY` fora, assim garante que pegue todos os valores.

```
SELECT coluna1, coluna2 FROM banco.tabela1
UNION ALL
SELECT coluna1, coluna2 FROM banco.tabela2;

--

SELECT coluna1, coluna2, '-' FROM banco.tabela1
UNION ALL
SELECT coluna1, coluna2, coluna3 FROM banco.tabela2;

--

(SELECT coluna1, coluna2 FROM banco.tabela1)
UNION ALL
(SELECT coluna1, coluna2 FROM banco.tabela2)
ORDER BY coluna1 DESC;
```

### SUBQUERY

É uma *query* que está dentro de outra. Podendo realizar expressões simples (adição, subtração,...), como tambem comandos complexos. Pode ser uma opção ao `JOIN`. Pensar sempre na performace na hora de escolher.

Modos de uso:

1. Como fonte de dados para o `FROM`

```
SELECT f.title, f.rating
FROM (
  SELECT *
  FROM sakila.film
  WHERE rating = 'R'
) AS f;
```

2. Para preencher uma coluna dentro do `SELECT`

```
SELECT
  address,
  district,
  (
    SELECT city
    FROM sakila.city
    WHERE city.city_id = sakila.address.city_id
  ) AS city
FROM sakila.address;
```

3. Filtrar dados com o `WHERE`

```
SELECT address, district
FROM sakila.address
WHERE city_id in (
  SELECT city_id
  FROM sakila.city
  WHERE city in ('Sasebo', 'San Bernardino', 'Athenai', 'Myingyan')
);
```

4. Utilizar uma tabela externa

```
SELECT
  first_name,
  (
    SELECT address
    FROM sakila.address
    WHERE address.address_id = tabela_externa.address_id
  ) AS address
FROM sakila.customer AS tabela_externa;
```

### SUBQUERY ou JOIN

```
SELECT
  first_name,
  (
    SELECT address
    FROM sakila.address
    WHERE address.address_id = tabela_externa.address_id
  ) AS address
FROM sakila.customer AS tabela_externa;

-- JOIN
SELECT c.first_name, ad.address
FROM sakila.customer c
INNER JOIN sakila.address ad ON c.address_id = ad.address_id;
```

### Performace

Para medir a performace das *queries*, o Workbench disponibiliza a ferramenta **Execution Plan**. Com ela podemos ver o tempo e o tipo de consulta, sendo:

- `table scan`: percorre a tabela toda, **mais custoso**. Exemplo: `SELECT * FROM table`
- `index scan`: utiliza-se de index/condição para encontrar o valor. Exemplo: 
```
SELECT * FROM table
WHERE alguma_condição
```

### EXISTS

`EXISTS` retorna os valores de uma tabela que tenham relação com outra tabela. Utilizando *subqueries*. Pode ser negado com o uso do `NOT`.

```
SELECT * FROM banco.tabela1 AS t1
WHERE EXISTS (
  SELECT * FROM banco.tabela2
  WHERE t1.coluna1 = t2.coluna2
);
```

## Links

- [Como utilizar INNER JOIN , LEFT LEFT e RIGHT JOIN , por Dev Media](https://www.devmedia.com.br/clausulas-inner-join-left-join-e-right-join-no-sql-server/18930)
- Entenda mais sobre o INNER JOIN no [MySQLTutorial](https://www.mysqltutorial.org/mysql-inner-join.aspx) e no [W3Schools](https://www.w3schools.com/sql/sql_join_inner.asp)
- [Aprenda SQL JOINS na prática com o SQL Bolt](https://sqlbolt.com/lesson/select_queries_with_joins)
- [Explicação detalhada sobre UNION no Macoratti](http://www.macoratti.net/13/05/sql_uni1.htm)
- [UNION desconstruido com exemplos no SQLServerTutorial.net](https://www.sqlservertutorial.net/sql-server-basics/sql-server-union/)
- [Um pouco mais sobre o EXISTS aqui .](https://www.w3resource.com/sql/special-operators/sql_exists.php)
- [Maneiras diferentes de otimizar suas queries neste link](https://dev.mysql.com/doc/refman/8.0/en/optimization.html)
- [Para mais exercícios de fixação sobre SQL em geral, ascesse esse repositorio e siga o READ ME.](https://github.com/XD-DENG/SQL-exercise)