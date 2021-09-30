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

## Links

- [Exemplos de Headers](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers)
- [Node.js Foundation](https://openjsf.org/)