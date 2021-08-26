-- Exercício 1: Utilizando o INNER JOIN , encontre as vendas nacionais ( domestic_sales ) e internacionais ( international_sales ) de cada filme.
SELECT title, domestic_sales, international_sales
FROM Pixar.Movies AS m
INNER JOIN Pixar.BoxOffice AS b
WHERE m.id = b.movie_id;

-- Exercício 2: Utilizando o INNER JOIN , faça uma busca que retorne o número de vendas para cada filme que possui um número maior
-- de vendas internacionais ( international_sales ) do que vendas nacionais ( domestic_sales ).
SELECT title, domestic_sales, international_sales
FROM Pixar.Movies
INNER JOIN Pixar.BoxOffice
ON id = movie_id
WHERE domestic_sales < international_sales;

-- Exercício 3: Utilizando o INNER JOIN , faça uma busca que retorne os filmes e sua avaliação ( rating ) em ordem decrescente.
SELECT title, rating
FROM Pixar.Movies
INNER JOIN Pixar.BoxOffice
ON id = movie_id
ORDER BY rating DESC;

-- Exercício 4: Utilizando o LEFT JOIN , faça uma busca que retorne todos os dados dos cinemas, mesmo os que não possuem filmes em cartaz e,
-- adicionalmente, os dados dos filmes que estão em cartaz nestes cinemas. Retorne os nomes dos cinemas em ordem alfabética.
SELECT * FROM Pixar.Theater AS t
LEFT JOIN Pixar.Movies
ON t.id = theater_id
ORDER BY `name`;

-- Exercício 5: Utilizando o RIGHT JOIN , faça uma busca que retorne todos os dados dos filmes, mesmo os que não estão em cartaz e,
-- adicionalmente, os dados dos cinemas que possuem estes filmes em cartaz. Retorne os nomes dos cinemas em ordem alfabética.
SELECT * FROM Pixar.Theater AS t
RIGHT JOIN Pixar.Movies
ON t.id = theater_id
ORDER BY `name`;

-- Exercício 6: Faça duas buscas, uma utilizando SUBQUERY e outra utilizando INNER JOIN , que retornem os títulos dos filmes que possuem avaliação maior que 7.5.
SELECT (
	SELECT title FROM Pixar.Movies
    WHere id = Pixar.BoxOffice.movie_id
) AS title , rating
FROM Pixar.BoxOffice
WHERE rating > 7.5;

SELECT title, rating  FROM Pixar.Movies
INNER JOIN Pixar.BoxOffice
ON id = movie_id
WHERE rating > 7.5;

-- Exercício 7: Faça duas buscas, uma utilizando SUBQUERY e outra utilizando INNER JOIN , que retornem as avaliações dos filmes lançados depois de 2009.
SELECT rating FROM Pixar.BoxOffice
WHERE movie_id IN (
	SELECT id FROM Pixar.Movies WHERE `year` > 2009
);

SELECT rating FROM Pixar.BoxOffice
INNER JOIN Pixar.Movies
ON id = movie_id
WHERE `year` > 2009;

-- Exercício 8: Utilizando o EXISTS , selecione o nome e localização dos cinemas que possuem filmes em cartaz.
SELECT `name`, location FROM Pixar.Theater AS t
WHERE EXISTS (
	SELECT id FROM Pixar.Movies WHERE theater_id = t.id
);

-- Exercício 9: Utilizando o EXISTS , selecione o nome e localização dos cinemas que não possuem filmes em cartaz.
SELECT `name`, location FROM Pixar.Theater AS t
WHERE NOT EXISTS (
	SELECT id FROM Pixar.Movies WHERE theater_id = t.id
);

-- Exercício 10: Utilizando o INNER JOIN , selecione todas as informações dos filmes com avaliação maior que 8 e que estejam em cartaz.
SELECT * FROM Pixar.Movies AS m
INNER JOIN Pixar.Theater AS t
ON t.id = theater_id
INNER JOIN Pixar.BoxOffice
ON m.id = movie_id
WHERE rating > 8;

-- Exercício 11: Utilizando o SELF JOIN , selecione os títulos e duração dos filmes que possuem o mesmo diretor.
SELECT m1.title, m1.length_minutes,m2.title, m2.length_minutes FROM Pixar.Movies AS m1, Pixar.Movies AS m2
WHERE m1.director = m2.director;

-- Exercício 12: Faça duas buscas, uma utilizando SUBQUERY e outra utilizando INNER JOIN ,
-- que retornem o título dos filmes que arrecadaram 500 milhões ou mais, e que possuem duração maior que 110 minutos.
SELECT title FROM Pixar.Movies
WHERE EXISTS (
	SELECT movie_id FROM Pixar.BoxOffice
    WHERE id = movie_id
    AND (domestic_sales + international_sales) >= 500000000 
) AND length_minutes > 110;

SELECT title FROM Pixar.Movies
INNER JOIN Pixar.BoxOffice
ON id = movie_id
WHERE (domestic_sales + international_sales) >= 500000000
AND length_minutes > 110;
