-- 1 - Queremos saber os ids e custos de substituição dos filmes que possuem o mesmo
-- custo de substituição.
SELECT t1.film_id, t1.replacement_cost, t2.film_id, t2.replacement_cost
FROM sakila.film AS t1, sakila.film AS t2
WHERE t1.replacement_cost = t2.replacement_cost;

-- 2 - Exiba o título e a duração de empréstimo dos filmes que possuem a mesma duração.
-- Exiba apenas os filmes com a duração de empréstimo entre 2 e 4 dias.
SELECT f1.title, f1.rental_duration, f2.title, f2.rental_duration
FROM sakila.film AS f1, sakila.film AS f2
WHERE f1.rental_duration = f2.rental_duration
AND f1.rental_duration between 2 AND 4;

