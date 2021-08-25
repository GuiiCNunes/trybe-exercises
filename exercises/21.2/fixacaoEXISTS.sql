-- Use o banco de dados hotel para realizar os desafios a seguir:
-- 1 - Usando o EXISTS na tabela books_lent e books , exiba o id e título dos livros que ainda não foram emprestados.
SELECT  Id, Title FROM hotel.Books AS B1
WHERE NOT EXISTS (
	SELECT * FROM hotel.Books_Lent AS B2
    WHERE B1.Id = B2.book_id
);

-- SELECT  Id, Title FROM hotel.Books AS B1
-- WHERE B1.Id NOT IN (
-- 	SELECT book_id FROM hotel.Books_Lent
-- );

-- 2 - Usando o EXISTS na tabela books_lent e books , exiba o id e título dos livros estão atualmente emprestados e que contêm a palavra "lost" no título.
SELECT  Id, Title FROM hotel.Books AS B1
WHERE EXISTS (
	SELECT * FROM hotel.Books_Lent AS B2
    WHERE B1.Id = B2.book_id
) AND Title LIKE '%lost%';

-- 3 - Usando a tabela carsales e customers , exiba apenas o nome dos clientes que ainda não compraram um carro.
SELECT `Name` FROM hotel.Customers AS cust
WHERE NOT EXISTS (
	SELECT * FROM hotel.CarSales
    WHERE cust.CustomerID = hotel.CarSales.CustomerID
);

-- 4 - Usando o comando EXISTS em conjunto com JOIN e as tabelas cars , customers e carsales ,
-- exiba o nome do cliente e o modelo do carro de todos os clientes que fizeram compras de carros.
SELECT cust.`Name`, car.`Name` FROM hotel.Customers AS cust
INNER JOIN hotel.Cars AS car
WHERE EXISTS(
	SELECT * FROM hotel.CarSales AS Sales
    WHERE cust.CustomerID = Sales.CustomerID
    AND car.Id = Sales.CarID
);

-- SELECT cust_name, car.`Name` FROM (
-- 	SELECT `Name` AS `cust_name` FROM hotel.Customers AS cust
-- 	WHERE EXISTS(
-- 		SELECT * FROM hotel.CarSales
-- 		WHERE cust.CustomerID = hotel.CarSales.CustomerID 
-- )) INNER JOIN hotel.Cars AS car;
