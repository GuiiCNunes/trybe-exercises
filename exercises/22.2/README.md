# Bloco 22 - Normalização e Modelagem de Banco de Dados

## Normalização, Formas Normais e Dumps

### Normalização

Organiza as tabelas relacionadas de modo a reduzir a redundância de dados. Evita uso de espaço desnecessário, anomalias de inserção, atualização e exclusão.
Consiste em separar os dados em tabelas diferentes.

### Formas Normais

#### 1ª Forma Normal

- Tabelas devem ser escaláveis, preparada para grandes quantidades de dados.
- Tabelas devem ser extensíveis, mudanças não devem quebrar a integridade dos dados.
- Colunas devem possuir apenas um valor
- Valores em uma coluna devem ser do mesmo tipo de dados
- Cada coluna deve possuir um nome único
- A ordem dos dados registrados em uma tabela não deve afetar a integridade dos dados

#### 2ª Forma Normal

Requisitos:
- 1ª Forma normal.
- Tabela não possuir dependências parciais.
  * DependÊncias parciais são valores que não dependem exclusivamente da chave primária para existir. Um exemplo seria uma tabela de alunos que, junto com as informações do aluno, guardasse o curso que fazem. Esse curso poderia ser movido para uma tabela própria, visto que a informação não depende exclusivamente de um aluno.

#### 3ª Forma Normal

Requisitos:
- 1ª e 2ª formas normais.
- Não deve possuir atributos que não sejam totalmente dependentes da chave primária.
[Resumo](https://docs.microsoft.com/pt-br/office/troubleshoot/access/database-normalization-description#normalizing-an-example-table)

### DUMP

Salvar as informações do banco em formato de texto, mais comum são os `.sql`.
Pode ser feito via interface gráfica do Workbench ou Via linha de comando.

```
## Acessando o mysql
mysql -u user -p

## mostrar os bancos
SHOW DATABASES;

USE nome_banco_de_dados;

SHOW TABLES;

-- Mostrar informações da tabela
SELECT * FROM tabela_desejada;
```

```
-- DUMP
mysqldump -u usuario_para_acessar -p banco_que_quero_backup > nome_do_arquivo

-- DUMP SEM DADOS
mysqldump -u usuario_para_acessar -p --no-data banco_que_quero_backup > nome_do_arquivo

-- Recuperar os dados apartir do BK
mysql -u usuario -p

CREATE DATABASE nome_banco; -- Banco precisa estar criado para receber as info

-- Precisa estar na pasta onde está o BK (Diferença fica no >)
mysqldump -u usuario_para_acessar -p banco_que_quero_backup < nome_do_arquivo

```

## Links

- Mais informações sobre normalização de banco de dados [neste artigo do Medium](https://medium.com/@diegobmachado/normaliza%C3%A7%C3%A3o-em-banco-de-dados-5647cdf84a12)
- [Conceitos Gerais sobre normalização](https://www.luis.blog.br/normalizacao-de-dados-e-as-formas-normais.html)
