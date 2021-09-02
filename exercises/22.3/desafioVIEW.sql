-- Crie uma view chamada film_with_categories utilizando as tabelas category , film_category e film do banco de dados sakila . Essa view deve exibir o título do filme, o id da categoria e o nome da categoria, conforme a imagem abaixo. Os resultados devem ser ordenados pelo título do filme.
CREATE VIEW film_with_categories AS
SELECT title, c.category_id, `name`
FROM 
	sakila.film AS f
		INNER JOIN
	sakila.film_category AS fc
		ON
	f.film_id = fc.film_id
		INNER JOIN
	sakila.category AS c
		ON
	fc.category_id = c.category_id
ORDER BY
	title;
    
SELECT * FROM film_with_categories;

-- Crie uma view chamada film_info utilizando as tabelas actor , film_actor e film do banco de dados sakila . Sua view deve exibir o actor_id , o nome completo do ator ou da atriz em uma coluna com o ALIAS actor e o título dos filmes. Os resultados devem ser ordenados pelos nomes de atores e atrizes. Use a imagem a seguir como referência.
CREATE VIEW film_info AS
SELECT a.actor_id, CONCAT(first_name, ' ', last_name) AS actor, title
FROM
	sakila.actor AS a
		INNER JOIN
	sakila.film_actor AS fa
		ON
	a.actor_id = fa.actor_id
		INNER JOIN
	sakila.film AS f
		ON
	fa.film_id = f.film_id
ORDER BY actor;

SELECT * FROM film_info;

-- Crie uma view chamada address_info que faça uso das tabelas address e city do banco de dados sakila . Sua view deve exibir o address_id , o address , o district , o city_id e a city . Os resultados devem ser ordenados pelo nome das cidades. Use a imagem abaixo como referência.
CREATE VIEW address_info AS
SELECT address_id, address, district, c.city_id, city
FROM
	sakila.address AS a
		INNER JOIN
	sakila.city AS c
		ON
	a.city_id = c.city_id
ORDER BY city;

SELECT * FROM address_info;

-- Crie uma view chamada movies_languages , usando as tabelas film e language do banco de dados sakila . Sua view deve exibir o título do filme , o id do idioma e o idioma do filme , como na imagem a seguir.
CREATE VIEW movies_languages AS
SELECT title, l.language_id, `name` AS `language`
FROM
	sakila.film AS f
		INNER JOIN
	sakila.`language` AS l
		ON
	f.language_id = l.language_id;
    
    SELECT * FROM movies_languages;
