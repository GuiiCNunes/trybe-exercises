-- 1 - Utilizando a tabela sakila.payment , monte uma function que retorna a quantidade
-- total de pagamentos feitos até o momento por um determinado customer_id .
USE sakila;
DELIMITER $$

CREATE FUNCTION MostraPagamentosAteAgoraPeloCliente(customer int)
RETURNS FLOAT READS SQL DATA
BEGIN
  DECLARE payments_total FLOAT;
  SELECT SUM(amount)
	FROM sakila.payment
	WHERE customer_id = customer INTO payments_total;
	RETURN payments_total;
END $$

DELIMITER ;

-- 2 - Crie uma function que, dado o parâmetro de entrada inventory_id , retorna o nome do filme
-- vinculado ao registro de inventário com esse id.
USE sakila;
DELIMITER $$

CREATE FUNCTION MostraNomedoFilmeQUeUtilizouInventario( inventario INT )
RETURNS VARCHAR(300) READS SQL DATA
BEGIN
	DECLARE film_name VARCHAR(300);
    SELECT title
		FROM film AS f
			INNER JOIN
            inventory AS i
            ON f.film_id = i.film_id
		WHERE inventory_id = inventario
        INTO film_name;
	RETURN film_name;
END $$

DELIMITER ;

-- SELECT MostraNomedoFilmeQUeUtilizouInventario(1);

-- 3 - Crie uma function que receba uma determinada categoria de filme em formato de texto
-- (ex: 'Action' , 'Horror' ) e retorna a quantidade total de filmes registrados nessa categoria.
USE sakila;
DELIMITER $$

CREATE FUNCTION MostraQuantidadeDeFilmesDaCategoria(categoria VARCHAR(100))
RETURNS INT READS SQL DATA
BEGIN
	DECLARE quantidade_filmes INT;
	SELECT COUNT(film_id)
    FROM category AS c
		INNER JOIN
        film_category AS fc
		ON c.category_id = fc.category_id
		WHERE `name` = categoria
		INTO quantidade_filmes;
	RETURN quantidade_filmes;
END $$

DELIMITER ;

-- SELECT MostraQuantidadeDeFilmesDaCategoria('Action');
-- SELECT MostraQuantidadeDeFilmesDaCategoria('Horror');