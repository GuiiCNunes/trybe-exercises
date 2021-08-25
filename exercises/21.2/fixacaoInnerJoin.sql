-- 1 - Monte uma query que exiba o id do ator , nome do ator e id do filme em que ele já atuou
-- usando as tabelas actor e film_actor .
SELECT act.actor_id,
CONCAT(act.first_name, ' ', act.last_name), film.film_id
FROM sakila.actor act
INNER JOIN sakila.film_actor film
ON act.actor_id = film.actor_id;

-- 2 - Use o JOIN para exibir o nome , sobrenome e endereço de cada um dos funcionários do banco.
-- Use as tabelas staff e address .
SELECT first_name, last_name, address
FROM sakila.staff
INNER JOIN sakila.address
ON sakila.staff.address_id = sakila.address.address_id;

-- 3 - Exiba o id do cliente , nome e email dos primeiros 100 clientes, ordenados pelo nome em ordem decrescente,
-- juntamente com o id do endereço e o nome da rua onde o cliente mora.
-- Essas informações podem ser encontradas nas tabelas customer e address .
SELECT first_name, email, customer.address_id, address
FROM sakila.customer AS customer
INNER JOIN sakila.address
ON customer.address_id = sakila.address.address_id
ORDER BY first_name DESC
LIMIT 100;

-- 4 - Exiba o nome , email , id do endereço , endereço e distrito dos clientes que moram no distrito
-- da California e que contêm "rene" em seus nomes.
-- As informações podem ser encontradas nas tabelas address e customer .
SELECT first_name, email, customer.address_id, address, district
FROM sakila.customer AS customer
INNER JOIN sakila.address
ON customer.address_id = sakila.address.address_id
WHERE district = 'California'
AND first_name LIKE '%rene%';

-- 5 - Exiba o nome e a quantidade de endereços dos clientes cadastrados.
-- Ordene seus resultados por nomes de forma decrescente.
-- Exiba somente os clientes ativos. As informações podem ser encontradas na tabela address e customer .
SELECT first_name, IF(address2 = '' OR address2 IS NULL, 1, 2) AS `quantidade de enderecos`
FROM sakila.customer AS customer
INNER JOIN sakila.address
ON customer.address_id = sakila.address.address_id
ORDER BY first_name DESC;

-- 6 - Monte uma query que exiba o nome , sobrenome e a média de valor ( amount ) paga aos funcionários
-- no ano de 2006. Use as tabelas payment e staff .
-- Os resultados devem estar agrupados pelo nome e sobrenome do funcionário.
SELECT first_name, last_name, AVG(amount)
FROM sakila.staff AS s
-- FROM sakila.payment AS p
INNER JOIN sakila.payment AS p
-- INNER JOIN sakila.staff AS s
ON s.staff_id = p.staff_id
WHERE YEAR(payment_date) = '2006'
GROUP BY first_name, last_name; 

-- 7 - Monte uma query que exiba o id do ator , nome , id do filme e título do filme , usando as tabelas actor
-- , film_actor e film . Dica: você precisará fazer mais de um JOIN na mesma query .
SELECT a.actor_id, first_name, f.film_id, title
FROM sakila.actor AS a
INNER JOIN sakila.film_actor AS fa
ON a.actor_id = fa.actor_id
INNER JOIN sakila.film AS f
ON f.film_id = fa.film_id;
