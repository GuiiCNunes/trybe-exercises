O MongoDB possui diversas ferramentas como, por exemplo, mongo , mongosh , Compass e outras ferramentas de terceiros. Você pode utilizar o que achar melhor para executar as queries , o importante é realizá-las.

Utilizando a coleção [bios](https://docs.mongodb.com/manual/reference/bios-example-collection/) , construa queries para retornar os seguintes itens:

1. Retorne o documento com o _id igual a 8.
```
db.bios.find({_id: 8});
```

2. Retorne o documento com o _id igual a 8, mas só exiba os atributos: _id e name .
```
db.bios.find({_id: 8}, {name: 1});
```
3. Retorne apenas os atributos name e birth do documento com o _id igual a 8.
```
db.bios.find({_id: 8}, {_id: 0, name: 1, birth: 1});
```
4. Retorne todos os documentos em que o atributo name.first seja igual a John , utilizando o método pretty() .
```
db.bios.find({'name.first': 'John'}, {}).pretty();
```
5. Retorne os 3 primeiros documentos da coleção bios utilizando o método pretty() .
```
db.bios.find().limit(3).pretty();
```
6. Retorne 2 documentos da coleção bios pulando os 5 primeiros documentos.
```
db.bios.find().limit(2).skip(5);
```

Utilizando o [mongoimport](https://docs.mongodb.com/database-tools/mongoimport/#examples) , importe o arquivo [books.json](https://s3.us-east-2.amazonaws.com/assets.app.betrybe.com/back-end/mongodb/books-48d15e4d8924badc2308cc4a62eb3ea4.json) para a sua instância local do MongoDB e utilize a coleção books para construir as seguintes consultas:

```
mongoimport --db=library --collection=books --file=./exercises/23.1/books.json
```

7. Retorne a quantidade de documentos da coleção books .
```
use library;
db.books.count()
```
8. Conte quantos livros existem com o status = "PUBLISH" .
```
db.books.find({status: 'PUBLISH'}).count();
```

9. Exiba os atributos title , isbn e pageCount dos 3 primeiros livros. NÃO retorne o atributo _id .
```
db.books.find({}, {_id:0, title: 1, isbn: 1, pageCount: 1}).limit(3);
```

10. Pule 5 documentos e exiba os atributos _id , title , authors e status dos livros com o status = "MEAP" , limitando-se a 10 documentos.
```
db.books.find({status: "MEAP" }, {title: 1, authors:1, status: 1}).skip(5).limit(10);
```
