# Bloco 21 - Funções SQL, Joins e Subqueries

## Stored Routines & Stored Functions

São jeitos de armazenar *queries* para poder reutilizar depois, evitando a duplicação de código.

- Nomeação: Boa prática é seguir o exemplo

```
-- Verbo + Resultado

ObterTotalDeVendas
ExibirRankMaximo
ObterClienteMaisAtivo
CalcularNivelEngajamento
MontarNomeCompleto
```

- Pontos fortes:
  * Centralização das *queries* no servidor, facilitando a manutenção e eliminando a necessidade de refazer o *deploy*.
  * Não precisa reescrever algo específico para cada linguagem, plataforma ou framework.
  * Mudanças são propagadas para todas as aplicações, sem necessidade de refatoração.
- Pontos fracos:
  * Viola o pricípio da separação de conceitos(*separation of concerns*), que consiste em focar em resolver um único problema na sua regra de negócio, desacoplamento.
  * Debugar o código armazenado é mais difícil.
  * Não há como versionar o código de maneira fácil.

### Estrutura

```
USE banco_de_dados; -- obrigatório para criar a procedure no banco correto
DELIMITER $$ -- definindo delimitador

CREATE PROCEDURE nome_da_procedure(@parametro1, @parametro2, ..., @parametroN) -- parâmetros
BEGIN -- delimitando o início do código SQL

END $$ -- delimitando o final do código SQL

DELIMITER ; -- muda o delimitador de volta para ; - o espaço entre DELIMITER e o ';' é necessário
```

#### **Elementos**

* `DELIMITER`: Define qual simbolo representa o final da *procedure* declarada. Podendo ser qualquer simbolo, exceto o `\`. *Default* é `;`. Precisa ser colocado para que o SQL não represente o primeiro `;` como final da *procedure*.

* Variáveis: como nas outras linguagens de programação, podendo ser usadas em *procedures*. São de 3 tipos:
  * User-defined variables;
    ```
    SET @my_school = 'BeTrybe';
    SELECT @my_school;
    ```
  * Local Variables;
  * Server System Variables.

* Tipos de dados:
  - *Strings*
    * `VARCHAR` : Uma string não binária de comprimento variável;
    * `CHAR` : Uma string não binária (caractere) de comprimento fixo;
    * `TEXT` : Uma pequena string não binária.
  - Numéricos:
    * `TYNINT` : Um número inteiro muito pequeno;
    * `INT` : Um inteiro padrão;
    * `BIGINT` : Um grande número inteiro;
    * `DECIMAL` : Um número de ponto fixo.

**Tipos de *Procedure***
* *Procedure* sem parâmetros;
* *Procedure* com parâmetros de entrada (*IN*) ;
* *Procedure* com parâmetros de saída (*OUT*) ;
* *Procedure* com parâmetros de entrada e saída (*IN-OUT*) .


#### **Procedure sem parâmetros**

Para procedimentos mais simples.

```
USE sakila;
DELIMITER $$

CREATE PROCEDURE ShowAllActors()
BEGIN
  SELECT * FROM sakila.actor;
END $$

DELIMITER ;

-- Como usar:

CALL ShowAllActors();
```

#### **Procedure com parâmetros de entrada (IN)**

```
USE sakila;
DELIMITER $$

CREATE PROCEDURE ShowActorsWithSyllable(IN syllable VARCHAR(100))
BEGIN
    SELECT *
    FROM sakila.actor
    WHERE first_name LIKE CONCAT('%', syllable, '%');
END $$

DELIMITER ;

-- Como usar:

CALL ShowActorsWithSyllable('lope');
```

#### **Procedure com parâmetros de saida (OUT)**

```
USE sakila;
DELIMITER $$

CREATE PROCEDURE ShowAverageRentalDurationOfMovie(
    IN film_name VARCHAR(300),
    OUT media_aluguel_em_dias DOUBLE
)
BEGIN
    SELECT AVG(rental_duration) INTO media_aluguel_em_dias
    FROM sakila.film
    WHERE title = film_name;
END $$

DELIMITER ;

-- Como usar:

CALL ShowAverageRentalDurationOfMovie('ACADEMY DINOSAUR', @media_de_dias);
SELECT @media_de_dias;
```

OBS.: Não precisa obrigatoriamente de um `IN`.

#### **Procedure com parâmetros de entrada-saida (IN-OUT)**

É um parâmetro que é modificado tanto antes quanto durante a execução. Ou seja, é uma variável que é usada como entrada dentro do *procedure*, seu valor é alterado e retornado pela *procedure*.

```
USE sakila;
DELIMITER $$

CREATE PROCEDURE NameGenerator(INOUT film_name VARCHAR(300))
BEGIN
    SELECT CONCAT('ULTRA ', film_name, ' THE BEST MOVIE OF THE CENTURY')
    INTO film_name;
END $$

DELIMITER ;

-- Como usar:

SELECT 'ACE GOLDFINGER' INTO @movie_title;
CALL NameGenerator(@movie_title);
SELECT @movie_title;
```

## Stored Functions

Mais conciso do que as *procedures*, chama apenas um pedaço de código. Uma *procedure* pode ter *functions* dentro, o contrário não é verdadeiro. Na sua construção deve ser determinado o tipo de retorno, sendo:

- `DETERMINISTIC`: Sempre retorna o mesmo valor ao receber os mesmos dado de entrada.
- `READS SQL DATA`: Indica que a função somente lerá os dados.

Sintaxe:

```
USE banco_de_dados; -- obrigatório para criar a função no banco correto
DELIMITER $$

CREATE FUNCTION nome_da_function(parametro1, parametro2, ..., parametroN)
RETURNS tipo_de_dado tipo_de_retorno
BEGIN
  query_sql
  RETURN resultado_a_ser_retornado;
END $$

DELIMITER ;
```

Exemplos:

```
USE sakila;
DELIMITER $$

CREATE FUNCTION MoviesWithActor(actor_id int)
RETURNS INT READS SQL DATA
BEGIN
  DECLARE movie_total INT;
  SELECT COUNT(*)
  FROM sakila.film_actor
  WHERE sakila.film_actor.actor_id = actor_id INTO movie_total;
  RETURN movie_total;
END $$

DELIMITER ;

-- Como usar:

SELECT MoviesWithActor(1);
```

```
USE sakila;
DELIMITER $$

CREATE FUNCTION GetFullName(id INT)
RETURNS VARCHAR(200) READS SQL DATA
BEGIN
  DECLARE full_name VARCHAR(200);
  SELECT concat(first_name, ' ', last_name)
  FROM sakila.actor
  WHERE actor_id = id
  LIMIT 1
  INTO full_name ;
  RETURN full_name;
END $$

DELIMITER ;

SELECT GetFullName(51);
```

### Stored Functions VS Store Procedures

![Gráfico de comparação](https://s3.us-east-2.amazonaws.com/assets.app.betrybe.com/back-end/sql/images/stored_procedure_vs_stored_function-57cd47712722c4c9bdc87648822704af.png)

* *Procedures* são chamadas com o `CALL`, e o retorno é opcional.
* *Functions* são executadas com `SELECT`, e precisam de um retorno.
* *Functions* Não podem alterar o estado global do banco (nada de `INSERT`, `UPDATE` ou `DELETE`).
* *Procedures* podem alterar o estado global.
* *Procedures* permitem tratar exceções `try/catch`.

## Links

- [Conceito de Programação DRY: Don't repeat yourself](https://pt.wikipedia.org/wiki/Don%27t_repeat_yourself)