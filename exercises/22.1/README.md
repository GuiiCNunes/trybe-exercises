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

## Links


