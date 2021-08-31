# Bloco 22 - Normalização e Modelagem de Banco de Dados

## Transformando ideias em um modelo de banco de dados - Parte 1

### Modelando um banco

1. Identificar  entidades, atributos e relacionamentos
  * Entidades: Representação de algo do mundo real dentro do DB; Englobam toda uma linha e são em formato de tabela; Exemplo:
```
    Entidade 1: `Álbum`;
    Entidade 2: `Artista`;
    Entidade 3: `Estilo Musical`;
    Entidade 4: `Canção`.
```
  * Atributos: Tudo o que pode ser usado para descrever algo; Aqui entram os identificadores; Exemplo:
```
    Álbum: `album_id`, `titulo`, `preco`, `estilo_id` e `artista_id`;
    Artista: `artista_id` e `nome`;
    Estilo Musical: `estilo_id` e `nome`;
    Canção: `cancao_id`, `nome` e `album_id`.
```
  * Relacionamentos: Representa como uma entidade se relaciona com as outras; Tipos:
    - Um para um (1..1): Uma linha da tabela se relaciona com apenas uma linha da tabela correspondete e vice-versa. Pode ser utilziado para dividir a informação de uma tabela maior em tabelas menores.

    ![Um para Um](https://s3.us-east-2.amazonaws.com/assets.app.betrybe.com/back-end/sql/images/relacionamentos1.2-7e92dc1947281a68817caf5a53c014a5.png)

    - Um para muitos (1..N): Uma linha na tabela A se relacciona com uma linha na tabela B, mas uma linha da tabela B pode se relacionar com várias linhas da A.

    ![Um para muitos](https://s3.us-east-2.amazonaws.com/assets.app.betrybe.com/back-end/sql/images/relacionamentos2-c3416e636b09d82b610af666a38808c0.png)

    - Muitos para muitos (N..N): Uma linha na tabela A pode se relacionar com multiplas linhas da tabela B e vice-versa. Para isso, pode ser utilizada uma terceira tabela (intermediária), que tem uma relação de um para muitos com as outras duas, gerando assim uma ligação. Essa tabela intermediária pdoe ser chamada de **tabela de junção**, ela guarda a informação de como as tabelas se relacionam.

    ![Muitos para muitos](https://s3.us-east-2.amazonaws.com/assets.app.betrybe.com/back-end/sql/images/relacionamentos3-db9125746c65b275a77abbe0bebe3e05.png)

  Exemplo:
```
    Um artista pode possuir um ou mais álbuns;
    Um estilo musical pode estar contido em um ou mais álbuns;
    Um álbum pode possuir uma ou mais canções.
```

### Construindo um diagrama entidade-relacionamento

Ferramenta para isso: [draw.io](https://draw.io/). [Vídeo ensinando como utilziar](https://www.youtube.com/watch?v=VgTRNqn2fn0).

**EntidadeA + Verbo + EntidadeB**

![ExemploRelacionamento](https://s3.us-east-2.amazonaws.com/assets.app.betrybe.com/back-end/sql/images/relationship1-93a141ea1c9c85a74907a29a7cc1662e.png)

Colocando tambem a quantas vezes uma entidade pode se relacionar com a outra.
Para ficar mais detalhado, o nome das tabelas, suas chaves primárias e estrangeiras, suas colunas e seus relacionamentos. Exemplo:

![RelacionamentoDetalhado](https://s3.us-east-2.amazonaws.com/assets.app.betrybe.com/back-end/sql/images/relationship2-f0009f942d82b45f440519c021eadb99.png)

### Criando um banco de dados para conter suas tabelas

```
-- Cria um banco de dados com o nome especificado.
CREATE DATABASE nome_do_banco_de_dados;

-- Sinônimo de CREATE DATABASE, também cria um banco de dados.
CREATE SCHEMA nome_do_banco_de_dados;

-- Verifica se o banco de dados ainda não existe.
-- Essa verificação é comumente utilizada junto ao CREATE DATABASE para evitar
-- a tentativa de criar um banco de dados duplicado, o que ocasionaria um erro.
IF NOT EXISTS nome_do_banco_de_dados;

CREATE DATABASE IF NOT EXISTS albuns;

-- Lista todos os bancos de dados existentes.
SHOW DATABASES;

-- Define o banco de dados ativo para uso no momento.
USE nome_do_banco_de_dados;
```

### Criando tabelas

- Principais tipos de dados:
  * Booleanos: 0 ou 1, `false` ou `true`. Padrão: `null`.
  * Caracteres:
    - CHAR(qtd): Passa a *qtd* que quiser, sempre ocupa o espaço todo.
    - VARCHAR(qtd): Só ocupa o espaço que for preenchido.
  * Números
    - TINYINT: 0 a 255 (só positivos) ou -128 a 127.
    ...
    - DECIMAL(q,d): Permite colocar quantos números quer (*q*) e quantos números decimais (*d*).
    - FLOAT/REAL: Uma casa decimal.
    - DOUBLE: Duas casas decimais.
  * Temporais:
    - DATE: YYYY-MM-DD.
    - TIME: HH:MM:SS.
    - YEAR: 1901 a 2155.
    - DATETIME: DATE + TIME
    - TIMESTAMP: Igual ao anterior, mas consegue trabalhar com fuso horário.
- Primary key e Foreign key:
  * Identificar uma linha na tabela.
  * Pode tanto ser uma coluna como a junção de várias colunas.
  * Chaves estrangeiras é uma referência a uma chave primária externa.
  * Mantem a integridade referencial do banco.
  * Exemplos:
```
    DROP TABLE cidades; 
    CREATE TABLE cidades(
      id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
      cidade VARCHAR(100) NOT NULL,
      estado VARCHAR(10) NOT NULL,
      populacao INTEGER
    );

    -- Chave composta
    DROP SCHEMA IF EXISTS Brasil;
    CREATE SCHEMA Brasil;
    USE Brasil;

    CREATE TABLE cidades(
        cidade VARCHAR(100) NOT NULL,
        estado VARCHAR(10) NOT NULL,
        populacao INTEGER,
        CONSTRAINT PRIMARY KEY(cidade, estado)
    );

    INSERT INTO cidades(cidade, estado, populacao)
    VALUES('Rio Claro','SP',185421),
          ('Rio Claro','RJ',17216);
```
  * Um bom uso para as chaves primárias compostas, são as tabelas de junção na relação *N:N*.
```
CREATE TABLE filme_ator(
  AtorId INTEGER,
  FilmeId INTEGER,
  CONSTRAINT PRIMARY KEY(AtorId, FilmeId),
  FOREIGN KEY (AtorId) REFERENCES Actor (Atorid),
  FOREIGN KEY (FilmeId) REFERENCES Actor (Filmeid)
);
```

## Links

- [Algumas ferramentas gratuitas para modelagem de tabelas](https://www.holistics.io/blog/top-5-free-database-diagram-design-tools/)
- [Data Science](https://www.linkedin.com/jobs/data-scientist-vagas/?originalSubdomain=br)
- [Boas práticas na criação de tabelas.](https://www.devmedia.com.br/padronizacao-de-nomenclatura-revista-sql-magazine-100/24710)
- [Modelo ER e Diagrama ER](https://www.devmedia.com.br/modelo-entidade-relacionamento-mer-e-diagrama-entidade-relacionamento-der/14332)
- [Como modelar um banco de dados gratuitamente através do draw.io](https://drawio-app.com/entity-relationship-diagram-erd/)
- [SQL Data Types](https://www.w3schools.com/sql/sql_datatypes.asp)
- [MySQL Data Types](https://www.mysqltutorial.org/mysql-data-types.aspx)
- [MySQL Schema Best Practices](https://www.percona.com/live/17/sites/default/files/slides/michael-benshoof-schema%20best-practices.pdf)
- [Quando é recomendado uso de chave primária composta](https://pt.stackoverflow.com/questions/15883/quando-%C3%A9-recomendado-o-uso-de-chave-prim%C3%A1ria-composta)

