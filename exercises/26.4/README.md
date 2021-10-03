# Bloco 26 - Introdução ao desenvolvimento Web com NodeJS

## Express: HTTP com Node.js

### Criando uma aplicação com Express

Instalação:

```
npm i express
```

Exemplo:

```
const express = require('express');

const app = express(); // 1

app.get('/hello', handleHelloWorldRequest); // 2

app.listen(3001, () => {
  console.log('Aplicação ouvindo na porta 3001');
}); // 3

function handleHelloWorldRequest(req, res) {
  res.status(200).send('Hello World!'); // 4
}
```

> 1. Criar uma nova aplicação Express;
> 2. Dizer ao Express que, quando uma requisição com método GET for recebida no caminho /hello , a função handleHelloWorldRequest deve ser chamada;
> 3. Pedir ao Express que crie um servidor HTTP e escute por requisições na porta 3001;
> 4. Ao tratar uma requisição com método GET no caminho /hello , enviar o status HTTP 200 que significa OK e a mensagem "Hello world!".

Para rodar:

```
node index.js
```

O acesso local ficaria em: `http://localhost:3001/hello`

### Nodemon

Alterações salvas em tempo de execução da API, não surtem efeitos. É necessário reinicializar a API. Ai entra o *Nodemon*, ele corta essa necessidade.

```
npm i nodemon -D
```

Acrescentar a linha no arquivo `package.json`:

```
//...
// "scripts": {
//    "test": "echo \"Error: no test specified\" && exit 1",
        "dev": "nodemon index.js"
//  },
// ...
```

Para rodar:

```
npm run dev
```

**OBS.:** Não inicializar a aplicação em produção via *Nodemon*, porque pode criar reinicializações desnecessárias.

### Roteamento

Sintaxe:

```
app.METODO(caminho, callback)
```

A `callback` recebe três parâmetros:

1. `request`: ou `req`, contém as informações enviadas pelo cliente ao servidor.
2. `response`: ou `res`, permite o envio de informações de volta ao cliente.
3. `next`: Opcional. Diz ao *Express* que a *callback* terminou de ser executada e deve prosseguir para a próxima daquela rota.

É possível encadear os métodos, como os `.then` das *promises*.

```
const express = require('express');
const app = express();

/* Rota com caminho '/', utilizando o método GET */
app.get('/', function (req, res) {
  res.send('hello world');
});

/* Rota com caminho '/', utilizando o método POST */
app.post('/', function (req, res) {
  res.send('hello world');
});

/* Rota com caminho '/', utilizando o método PUT */
app.put('/', function (req, res) {
  res.send('hello world');
});

/* Rota com caminho '/', utilizando o método DELETE */
app.delete('/', function (req, res) {
  res.send('hello world');
});

/* Rota com caminho '/' para qualquer método HTTP */
app.all('/', function (req, res) {
  res.send('hello world');
});

/* Ou podemos encadear as requisições para evitar repetir o caminho */
app
  .route('/')
  .get(function (req, res) {
        // Requisições para rota GET `/` são resolvidas aqui!
    res.send('hello world get');
  })
  .post(function (req, res) {
        // Requisições para rota POST `/` são resolvidas aqui!
    res.send('hello world post');
  });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
```

### Métodos

* `.send`: Genérico, adapta o tipo de retorno ao que vai ser retornado.
* `.json`: Mais específico, evidencia que o que será retornado é um `json`.

### Clientes HTTP

- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- [httpie](https://httpie.io/)

### cors

É necessário instalar o `cors` na aplicação para que ela possa receber requisições.

```
npm i cors
```

Utilizando ele na aplicação:
```
// const express = require('express');
// const app = express();
const cors = require('cors');

app.use(cors());
```

### Parâmetros de rota

Possibilitam acessar conteúdos específicos, sem a necessidade de criar a rota para cada conteúdo de forma unitária. Ou seja, passamos valores através da rota. `/<rota>/:<parametro>`. Exemplo:

```
app.get('/recipes/:id', function (req, res) {...});
```

Para acessar esses valores, utilizamos o `req.params` dentro da *callback*.

### Erro ao retornar duas respostas

```
Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
```

A *callback* **só pode usar um** `res`. Caso seja possível mais de uma condição de retorno, use o `return` para quebrar o fluxo principal.

### Query String

Possibilita passar mais parâmetros via *string*, sem a necessidade de atribuir uma rota para receber eles.
Exemplo:

```
/produtos?q=Geladeira&precoMaximo=2000
```
No exemplo, é passado por url para a página `/produtos` uma chave `q` com valor `Geladeira` e outra `precoMaximo` com valor `2000`.

Para acessar os valores, utiliza-se `req.query`. Exemplo:

```
app.get('/recipes/search', function (req, res) {
  const { name } = req.query;
  const filteredRecipes = recipes.filter((r) => r.name.includes(name));
  res.status(200).json(filteredRecipes);
});
```

**Rotas mais específicas devem vir antes de rotas genéricas no código.**

### Enviando parâmetros via body

Envia informações de forma segura e rápida, serializando os dados e não permitindo que apareçam na URL. Porém precisa de métodos específicos, como o `post`. Os dados precisam ser *parseados* em formato JSON. Também é necessário instalar o pacote:

```
npm i body-parser
```

#### Uso

O *Express* aceita um mesmo caminho com métodos diferentes.
Exemplo de acesso com o `fetch`:

```
fetch(`http://localhost:3001/recipes/`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    id: 4,
    title: 'Macarrão com Frango',
    price: 30
  })
});
```

É passado um segundo parâmetro, sendo este formado pelos atributos `method`, `headers` e `body`.

- `method`: O método que será utilizado (`GET`, `POST`, `PUT` e `DELETE`).
- `headers`: Algumas informações sobre a requisição. Como:
  * `Accept`: que diz qual tipo de dado esperado no retorno.
  * `Content-Type`: sinaliza o que está indo no corpo da requisição.
- `body`: Corpo da requisição. Necessário converter para uma *string JSON*. No lado do servidor, é necessário utilizar o `bodyParse` para recurar o objeto JS enviado.

Exemplo de requisição com `httpie`:

```
http POST :3001/recipes id:=4 name='Macarrão com Frango' price:=30
```

**OBS.**: Onde tem apenas `=`, o valor é enviado como *string*. Já nos casos `:=`, o valor é enviado como número. Isso no `body`.

```
http :3001/validateToken Authorization:S6xEzQUTypw4aj5A
```

**Quando passamos parâmetros pelo `header` é utilizado apenas `:`**.

### Atualizando e Deletando Dados Através da API

Para isso, os métodos utilizados devem ser o `PUT` e o `DELETE`. Exemplo:

```
// ...

app.put('/recipes/:id', function (req, res) {
  const { id } = req.params;
  const { name, price } = req.body;
  const recipeIndex = recipes.findIndex((r) => r.id === parseInt(id));

  if (recipeIndex === -1) return res.status(404).json({ message: 'Recipe not found!' });

  recipes[recipeIndex] = { ...recipes[recipeIndex], name, price };

  res.status(204).end();
});
// ...
```

```
app.delete('/recipes/:id', function (req, res) {
  const { id } = req.params;
  const recipeIndex = recipes.findIndex((r) => r.id === parseInt(id));

  if (recipeIndex === -1) return res.status(404).json({ message: 'Recipe not found!' });

  recipes.splice(recipeIndex, 1);

  res.status(204).end();
});
```

**OBS.**: A função `.end()`, ao final, avisa que a resposta nmão terá nenhuma informação.

#### Exemplos com o `fetch()`

```
// Requisição do tipo PUT
fetch(`http://localhost:3001/recipes/2`, {
  method: 'PUT',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Macarrão ao alho e óleo',
    price: 40
  })
});

// Requisição do tipo DELETE
fetch(`http://localhost:3001/recipes/4`, {
  method: 'DELETE',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
});
```

### Rota inexistente mais amigável

```
app.all('*', function (req, res) {
    return res.status(404).json({ message: `Rota '${req.path}' não existe!`});
});
```

O método `app.all()` alcança todos os verbos. E o `'*'` é um *wildcard* (coringa), que executa a *callback* para qualquer rota que chegar até ali.

## Links

- [Exemplos de Headers](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers)
- [Node.js Foundation](https://openjsf.org/)
- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)

- [Documentação Express - Rotas](https://expressjs.com/pt-br/guide/routing.html)
- [Documentação Express - Middleware](https://expressjs.com/pt-br/guide/writing-middleware.html)
- [Página do MDN sobre Node + Express](https://developer.mozilla.org/pt-BR/docs/Learn/Server-side/Express_Nodejs/Introdu%C3%A7%C3%A3o)
- [Rest with Node and Express](https://www.robinwieruch.de/node-express-server-rest-api)
- [Middleware [Node js Design Patterns]](https://www.youtube.com/watch?v=lI2MiMEn9HQ)