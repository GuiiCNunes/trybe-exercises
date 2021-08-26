-- 1 - Monte uma procedure que exiba os 10 atores mais populares, baseado em sua quantidade de filmes.
-- Essa procedure não deve receber parâmetros de entrada ou saída e, quando chamada,
-- deve exibir o id do ator ou atriz e a quantidade de filmes em que atuaram.
USE sakila;
DELIMITER $$

CREATE PROCEDURE MostrarDezAtoresMaisPopulares()
BEGIN
    SELECT actor_id, COUNT(film_id) FROM film_actor
    GROUP BY actor_id;
END $$

DELIMITER ;

-- CALL MostrarDezAtoresMaisPopulares();

-- 2 - Monte uma procedure que receba como parâmetro de entrada o nome da categoria desejada em uma string
-- e que exiba o id do filme , seu titulo , o id de sua categoria e o nome da categoria selecionada.
-- Use as tabelas film , film_category e category para montar essa procedure.
USE sakila;
DELIMITER $$

CREATE PROCEDURE ExibeIdTituloIdCategoriaNomeCategoriaDaCategoria(IN categoria varchar(100))
BEGIN
	SELECT f.film_id, f.title, c.category_id, c.`name`
    FROM 
		film AS f INNER JOIN category AS c
	WHERE EXISTS (
		SELECT fc.film_id, fc.category_id FROM film_category AS fc
        WHERE fc.film_id = f.film_id
        AND fc.category_id = c.category_id
    )
    AND c.`name` = categoria;
END $$

DELIMITER ;

-- CALL ExibeIdTituloIdCategoriaNomeCategoriaDaCategoria('action');

-- 3 - Monte uma procedure que receba o email de um cliente como parâmetro de entrada
-- e diga se o cliente está ou não ativo, através de um parâmetro de saída.
USE sakila;
DELIMITER $$

CREATE PROCEDURE MostraSeEstaAtivoClienteComEmail(INOUT emailCliente VARCHAR(100))
BEGIN
	SELECT IF(active, 'Está ativo o cliente', 'Não está ativo o cliente')
    FROM customer
    WHERE email = emailCliente
    INTO emailCliente;
END $$

DELIMITER ;

-- SET @email = 'MARY.SMITH@sakilacustomer.org';
-- CALL MostraSeEstaAtivoClienteComEmail(@email);
-- SELECT @email;
-- SET @email = 'SANDRA.MARTIN@sakilacustomer.org';
-- CALL MostraSeEstaAtivoClienteComEmail(@email);
-- SELECT @email;
