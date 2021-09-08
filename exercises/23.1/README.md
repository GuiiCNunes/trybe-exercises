# Bloco 23 - Introdução ao MongoDB

## Introdução - NoSQL

* Significado *- **N**ot **O**nly **SQL***
* Particularidades:
  - **BASE** (*Base Availability*, *Soft State and Eventually Consistent*)
    * *Base Availability*: Banco funciona o tempo todo.
    * *Soft State*: não é consistente o tempo todo, informação pode ter um *delay* ao ser propagada em todo o *cluster*.
    * *Eventually Consistent*: Mas em algum momento ela estará completa.
  - *Cluster*: multiplos servidores.
  - Tolerância a falhas: mais de um servidor para o usuário se conectar.
  - Balanceamento de carga: usuários são automaticamente alocados em servidores com menos uso.
* Tipos (classes):
  - Chave / Valor ( *Key / Value* )
    * Normalmente utilizam armazenamento *in-memory*(memória RAM), gerando acesso mais rápido aos dados.
    * Ex.: **Redis**.
  - Família de Colunas ( *Column Family* )
    * Armazena os dados e um conjunto de três chaves: linha, coluna e *timestamp*.
    * Linhas e colunas concentram os dados.
    * Diferentes versões destes dados são armazenados no *timestamp*
    * *Masterless*: não existe um servidor que concentra a escrita, essa operação é atendida pelo servidor mais próximo.
    * Ex.: Cassandra.
  - Documentos ( *Document* )
    * Mais flexível.
    * Ampla aderência.
    * Dados armazenados estilo *JSON*.
    * Pode ter níveis e subníveis, conferindo maior complexidade aos dados.
    * Semelhante ao Chave/Valor, mas com documentos. Não possuindo apenas uma chave e sim um conjunto de chaves e valores.
    * Exemplos: CouchDB e MongoDB.
  - Grafos ( *Graph* )
    * Dados muito complexos.
    * Dados compostos de **nós** (vértices do grafo), **relacionamentos** (arestas do grafo) e as **propriedades** ou atributos dos nós ou relacionamentos.
    * Relacionamento como ponto central.
    * Consultas extremamente performáticas.
    * Aplicativos de transporte e GPS costumam utilizar.
    * Exemplo: Neo4j.

## MongoDB - Introdução

### Instalação

Três tipos:
- Standalone
  * Ambiente de desenvolvimento.
  * Não exige configurações de segurança.
- Replica Set
  * Mínimo para o ambiente de produção.
  * Apenas um ponto de escrita e dados replicados no *cluster*.
  * Demis servidores escalam a leitura.
- Shard
  * Escalar a escrita de informação.
  * Dados divididos no *cluster* com chaves de partição (*shard keys*), compostas por um o mais atributos do documento. Afetam a performance, eficiência e escalabilidade.
  * Mais capacidade para que o banco processe mais operações.

[Instalação para Linux](https://docs.mongodb.com/manual/administration/install-on-linux/)
[Instalação para MAC](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)

Testar se foi instalado corretamente, viar *service*:

```
sudo service mongod start

sudo service mongod status
```

Parar e reiniciar o serviço:

```
sudo service mongod stop

sudo service mongod restart
```

**OBS.: Todos esses comandos foram retirados do site de instalação citado. Inclusive ele mostra como desinstalar.**

Instalação de forma resumida:

```
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -

// Retorna OK, caso de erro no gnupg, fazer:

sudo apt-get install gnupg
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -

// Continuando a instalação

echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list

sudo apt-get update

sudo apt-get install -y mongodb-org
```

**Pacotes instalados:**

1. `mongodb-org-server`: Recurso necessários para rodar uma instância do banco, como se fosse o servidor.
2. `mongodb-org-shell`: *shell* para se conectar ao MongoDB. **Suporta *JavaScript***.
3. `mongodb-org-mongos`: Só é necessário para ambientes *shard*.
4. `mongodb-org-tools`: Ferramentas nativas do MongoDB. Como:
  * `mongodump`: Extrai dados no formato *BSON*.
  * `mongorestore` Ferramenta para restaurar *backups*.
  * `mongoimport`: Ferramenta para importar *JSON*, *CSV* ou *TSV* para uma instância do MongoDB.
  * `mongoexport`: Exporta dados para os formatos *JSON* ou *CSV*.

### ulimit

Algumas distribuições Unix limitam os recursos do SIstema por sessão, podendo impactar na execução do MongoDB. [Ver mais](https://docs.mongodb.com/manual/reference/ulimit/)

### Diretórios

Quando instaslado via `apt`, algumas configurações são executadas e mantidas no diretório do sistema operacional. Os dados ficando em `/var/lib/mongodb`e o log em `/var/log/mongodb`. Já no mac, `/usr/local/var/mongodb` e `/usr/local/var/log/mongodb`.

### Configurações

**O arquivo de configurações fica em**: `/etc/mongod.conf`. [Ver mais](https://docs.mongodb.com/manual/reference/configuration-options/#conf-file)

Por padrão, o software é configurado para **não** iniciar junto com o sistema. Para ativar essa funcionalidade:

```
sudo systemctl enable mongod.service

// Para desativar
sudo systemctl disable mongod.service
```

Por padrão, o MongoDB só permite conexões locais, [para ativar conexões remotas](https://docs.mongodb.com/manual/core/security-mongodb-configuration/).

### Acessando o MongoDB pelo temrinal

Existem dois meios de acessar pelo temrinal:

```
mongo
```
Via Mongo Shell (+ otimizado)
```
mongosh
```

A porta padrão da instância é `27017`. Para criar uma instância em otura porta:
```
mongo --port 19000
```

Para sair da instância:
```
exit
```

[Outros comandos](https://docs.mongodb.com/manual/reference/mongo-shell/)

**Outras interfaces visuais**
- [MongoDB Compass](https://www.mongodb.com/try/download/compass)
- [MongoDB for VS Code](https://marketplace.visualstudio.com/items?itemName=mongodb.mongodb-vscode)
- [NoSQLBooster for MongoDB](https://nosqlbooster.com/downloads)

### Bancos de Dados, Coleções e Documentos

Estrutura:
  1. Diversos bancos
  2. Dentro dos bancos as coleções (equivalente as tabelas do relacional)
  3. Dentro das coleções os documentos (equivalentes ao registros do relacional)

Os documentos são armazenados no formato **BSON**(*Binary JSON*), [documentação](https://docs.mongodb.com/manual/core/document/#bson-document-format).

#### Bancos de Dados

Dentro de uma mesma instância de MongoDB podem existir um ou vários bancos. Uma grande diferença é não precisar criar o banco antes de fazer operações nele. O MongoDB cria o banco automaticamente, caso não exista, durante a execução da operação desejada. Por exemplo, uma inserção:

```
use nomeDoBanco
db.nomeDaColecao.insertOne( { x: 1 })
```

[Padrões para nomear bancos e coleções](https://docs.mongodb.com/manual/reference/limits/#restrictions-on-db-names).

#### Coleções

Equivalente a uma tabela, é nela que são armazenados os documentos. É possível criar uma coleção durante a inserção de valores:

```
db.nomeDaColecao1.insertOne({ x: 1 })
db.nomeDaColecao2.createIndex({ y: 1 })
```

Tambem podem ser criadas de maneira explícita, com o `db.createCollection()`([documentção](https://docs.mongodb.com/manual/reference/method/db.createCollection/#db.createCollection)), atribuindo certos parâmetros, como tamanho máximo dos documentos, regras de validação, [collation](https://docs.mongodb.com/manual/reference/collation/#collation-document-fields), etc... .Exemplo:

```
db.createCollection( "nomeDaColecao", { collation: { locale: "pt" } } );
```

Para modificar os parâmetros, utilizar [collMod](https://docs.mongodb.com/manual/reference/command/collMod/#dbcmd.collMod).

#### Documentos

Equivalente aos registros(linhas) do relacional. A diferença é que documentos podem conter estruturas mais ricas e diferentes entre os documentos. Como tambem pode armazenar muitomais informações.
Por ser *schemaless*, a estrutura não faz parte da coleção, e sim do documento. Podendo existir várias estrutras dentro de uma mesma coleção.

É possível realizar uma **validação de documentos**, onde cada operação de escrita em uma coleção respeita uma estrutura. Para isso, utiliza-se o [Schema Validation](https://docs.mongodb.com/manual/core/schema-validation/).

Mesmo que inseridos como um *JSON*, os documentos são salvos no formato *BSON* que é uma extenão do *JSON* que permite outros tipos de dados.

### Insert

Métodos `insertOne()` e `insertMany()`, um insere um documento por vez e o outro insere vários em uma única operação. 

```
// Criar banco
use nome_banco

// Mostrar bancos
show dbs

// Mostrar o banco atual
db

// Inserir valores
db.nome_colection.insertOne({_id: 'Id do documento, não é bom colcoar, ele faz por padrão!', chaves: valores});
```

Para inserir vários, ao invés de passar um objeto como parâmetro, passa-se um *array* de objetos.

```
db.nome_colection.insertMany([{chave: 'valor'}, {chave: 'valor'}]);
```

Caso ocorra algum erro (como duplicação de ID), a gravação é parada e não salva os demais documentos.
Para não deixar de ser ordenada, pulando o erro assim:

```
db.nome_colection.insertMany([{chave: 'valor'}, {chave: 'valor'}], {ordered: false});
```

### Find

Serve para selecionar uma **coleção** de documentos e retornar um **cursor** com os documentos.
Recebe dois parâmetros:
  1. `query`: Opcional. Tipo: Documento. Especifica os filtros da seleção. Para recuperar todos os documentos, basta omitir o parâmetro ou passar um objeto/documento vazio `{}`.
  2. `projection`: Opcional. Tipo: Documento. Especifica quais atributos serão retornados nos documentos selecionados pela `query`.

```
db.collection.find(query, projection)
```

#### Projection

```
{ "atributo1": <valor>, "atributo2": <valor> ... }
```

O `<valor>` pode ser:
  * `1` ou `true`: para incluir o atributo.
  * `0` ou `false`: para não incluir o atributo.
  * Uma expressão com [Projection Operators](https://docs.mongodb.com/manual/reference/operator/projection/)

**É sempre o segundo parâmetro do `find`.**
**O atributo ID será mostrado por padrão, mesmo se omitido. Para não mostrar, é necessário especificar que não quer.**

#### Cursor

Com o `find()`, é mostrado, por padrão, os 20 primeiros documentos encontrados. Para acessar os outros 20, digite `it`, até serem exibidos todos.
Para verificar a quantidade de documentos na coleção:

```
db.colecao.count()
```

#### Tipos e comparações

Alguns tipos de dados são tratados como equivalentes quando comparados. Os demais, quando utilizado os [operadores de comparação](https://docs.mongodb.com/manual/reference/operator/query-comparison/), realizam a comparação apenas em documentos que o [tipo BSON](https://docs.mongodb.com/manual/reference/bson-type-comparison-order/#bson-types-comparison-order) do atributo corresponde com o do operando na *query*.

### Exemplos

- [bios-example](https://docs.mongodb.com/manual/reference/bios-example-collection/)

- A operação abaixo retorna os documentos da coleção bios em que o atributo _id é igual a 5 :
```
db.bios.find( { _id: 5 } )
```

- Agora, a operação abaixo retorna todos os documentos da coleção bios em que o campo `last` do subdocumento `name` é igual a "Hopper" :
```
db.bios.find( { "name.last": "Hopper" } )
```

**Para acessar subdocumentos utilizados [dot notation](https://docs.mongodb.com/manual/core/document/#document-dot-notation-embedded-fields).**

- Especificando quais atributos serão mostrados:
```
db.bios.find({}, { name: 1 })
```

### Comandos

- Limitar a quantidade de documentos retornados:
```
db.coelcao.find(<query>).limit(<número>)
```

- Deixar os resultados exibidos mais legíveis:
```
db.colecao.find().limit(5).pretty()
```

- Pular documentos (semelhante ao `OFFSET`), mostra a partir de qual documento começará a retornar os resultados:
```
db.coelcao.find(<query>).skip(<número>)
```

## Links

- [Paradigma-da-computacao-distribuida](https://imasters.com.br/arquitetura-da-informacao/paradigma-da-computacao-distribuida)
- [NoSQL // Dicionário do Programador](https://youtu.be/1B64oqE8PLs)
- [Artigo que fala sobre as principais características do NoSQL](https://www.guru99.com/nosql-tutorial.html)
- [Pesquisa feita em 2019 sobre o uso de bancos de dados SQL vs NoSQL](https://scalegrid.io/blog/2019-database-trends-sql-vs-nosql-top-databases-single-vs-multiple-database-use/)
- [Artigo que explica quando usar e quando não usar NoSQL](https://medium.com/leroy-merlin-brasil-tech/devo-usar-nosql-e-mongodb-951693aa0d34)
- [Conceitos de Bancos de Dados – O que significa ACID](http://www.bosontreinamentos.com.br/bancos-de-dados/conceitos-de-bancos-de-dados-o-que-significa-acid/)
- [Site DB Engine com os bancos de dados mais usados](https://db-engines.com/en/ranking/)

- [Ranking utilização de banco de dados](https://db-engines.com/en/ranking)
- [Outros comandos](https://docs.mongodb.com/manual/reference/mongo-shell/)
- [MongoDB Compass](https://www.mongodb.com/try/download/compass)
- [MongoDB for VS Code](https://marketplace.visualstudio.com/items?itemName=mongodb.mongodb-vscode)
- [NoSQLBooster for MongoDB](https://nosqlbooster.com/downloads)
- [Schema Validation](https://docs.mongodb.com/manual/core/schema-validation/)
- [bios-example](https://docs.mongodb.com/manual/reference/bios-example-collection/)

- [Find](https://docs.mongodb.com/manual/reference/method/db.collection.find/index.html)
- [Projection Operators](https://docs.mongodb.com/manual/reference/operator/projection/)
- [Operadores de comparação](https://docs.mongodb.com/manual/reference/operator/query-comparison/)
- [BSON Types](https://docs.mongodb.com/manual/reference/bson-type-comparison-order/#bson-types-comparison-order)
- [mongoimport](https://docs.mongodb.com/database-tools/mongoimport/#examples)
