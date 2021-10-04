# Bloco 26 - Introdução ao desenvolvimento Web com NodeJS

## Express: Middlewares

*Middlewares* são funções que recebem e tratam requisições, por fim passando para o próximo *middleware*. As *callbacks* que estavamos utilizando são *middlewares*. Eles recebem 3 parâmetros: `req`,`res` e `next`. Podendo retornar qualquer coisa, inclusive *promises*. Exemplo:

```
// ...
app.post('/recipes', 
function (req, res, next) {
  const { name } = req.body;
  if (!name || name === '') return res.status(400).json({ message: 'Invalid data!'}); // 1

  next(); // 2
},
function (req, res) { // 3
  const { id, name, price } = req.body;
  recipes.push({ id, name, price});
  res.status(201).json({ message: 'Recipe created successfully!'});
});
// ...
```

No exemplo existem 2 *middlewares*. O primeiro valida se o conteúdo de `name` não está vazio, se estiver retorna um `400`, caso não chama o próximo *middleware* (no `next();`). O segundo adiciona a informação ao *array*.
**O *middleware* sequinte só é executado caso o anterior o chame com o `next()`.**

Uma das vantagens do uso de *middlewares*, é a possibilidade de reaproveitar código. Chamando um mesmo *middleware* em mais de uma rota. Exemplo:

```
// ...
function validateName(req, res, next) {
  const { name } = req.body;
  if (!name || name === '') return res.status(400).json({ message: 'Invalid data!'});

  next(); 
};

app.post('/recipes', validateName, function (req, res) {
  const { id, name, price } = req.body;
  recipes.push({ id, name, price});
  res.status(201).json({ message: 'Recipe created successfully!'});
});

app.put('/recipes/:id', validateName, function (req, res) {
  const { id } = req.params;
  const { name, price } = req.body;
  const recipesIndex = recipes.findIndex((r) => r.id === parseInt(id));

  if (recipesIndex === -1)
    return res.status(404).json({ message: 'Recipe not found!' });

  recipes[recipesIndex] = { ...recipes[recipesIndex], name, price };

  res.status(204).end();
});
// ...
```

Tambem é possível aplicar um *middleware* a todas as rotas utilizando o `app.use();`. Ele recebe como parâmetro um *middleware*(*callback*), que será **executado em todas as rotas que estiverem abaixo** dele no código.

### Passando valores entre middlwares com objeto req

*Middlewares* podem manipular o objto `req`, e as mudenças são recebidas pelo *middleware* seguinte. Seria algo assim: `req.user = 'Usuario'`, assim o próximo teria acesso a `req.user`. **Tome cuidado para não sobrescrever um atributo que já exista!** (`req.body`, `req.headers`, `req.params`, `req.query`, etc).

### Router middleware

O *Router* é um *middleware* que agrupa várias rotas. Exemplo:

```
/* index.js */ 
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Esta rota não passa pelo middleware de autenticação!
app.get('/open', function (req, res) {
  res.send('open!')
});

app.use(authMiddleware);

const recipesRouter = require('./recipesRouter');

/* Todas as rotas com /recipes/<alguma-coisa> entram aqui e vão para o roteador. */
app.use('/recipes', recipesRouter);

// app.all('*', function (req, res) {
//  return res.status(404).json({ message: `Rota '${req.path}' não existe!`});
// });

app.listen(3001, () => { console.log('Ouvindo na porta 3001'); });
```

O arquivo `/recipesRouter`, seria +- assim:

```
/* recipesRouter.js */ 
const express = require('express');
const router = express.Router();

const recipes = [
  { id: 1, name: 'Lasanha', preco: 40.0, tempoDePreparo: 30 },
  { id: 2, name: 'Macarrão a Bolonhesa', preco: 35.0, tempoDePreparo: 25 },
  { id: 3, name: 'Macarrão com molho branco', preco: 35.0, tempoDePreparo: 25 },
];

function validateName(req, res, next) {
  const { name } = req.body;
  if (!name || name === '') return res.status(400).json({ message: 'Invalid data!'});

  next(); 
};

router.get('/', function (req, res) {
  res.status(200).json(recipes);
});

// ...

router.delete('/:id', function (req, res) {
  const { id } = req.params;
  const recipeIndex = recipes.findIndex((r) => r.id === parseInt(id));

  if (recipeIndex === -1) return res.status(500).json({ message: 'Recipe not found!' });

  recipes.splice(recipeIndex, 1);

  res.status(204).end();
});

module.exports = router;
```

**OBS.:** O `app.use`recebe dois parâmetros no primeiro arquivo, o primeiro é o caminho, e o outro é o *middleware* que será executado nos métodos daquela rota. Repare que nos egundo arquivo a rota `recipes` é omitida de cada método.

O *Route* aceita importações, como:

```
/* recipesRouter.js */ 
// const express = require('express');
// const router = express.Router();

const authMiddleware = require('./auth-middleware');
router.use(authMiddleware);

// ...

// module.exports = router;
```

### Middleware de erro

A diferença dos demais é que sua arrinatura recebe 4 parâmetros: `(err, req, res, next)`. Exemplo:
```
app.use(middleware1);
app.get('/', */ ... */);
app.use(function (err, req, res, next) {
  res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`);
});
```
Suas especificações são:
* **Sempre devem vir depois de rotas e outros *middlewares*.**
* **Sempre recebem quatro parâmetros.**
  * É assim que o *Express* identifica esse *middlewares*, ou seuja, precisa dos 4 mesmo que não use.

É possível encadeá-los, como os *middlewares* comuns.

```
app.use(function logErrors(err, req, res, next) {
  console.error(err.stack);
  /* passa o erro para o próximo middleware */
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(500);
  res.json({ error: err });
});
```
**OBS.:** Ao passarmos o erro como parÂmetro do `next()`, falamos ao *Express* que ele só deve executar *middlewares* de erro após ele.

Para não acabar derrubando a aplicação toda, **sempre é necessário tratar os erros**. Outro ponto a se ter cuidado é que o *Express* não faz `catch` das *Promises*, sendo necessário capturar o erro e passar pelo `next`.

### Pacote express-rescue

Pacote elimina a necessidade de ficar criando `try/catch` para todas as rotas. [Documentação do express-rescue](https://www.npmjs.com/package/express-rescue). É necessário sua instalação:

```
npm i express-rescue
```

Com ele instalado, basta passar o *middleware* para a função `rescue`. Exemplo:

```
/* errorHandlerExample.js */
const express = require('express');
const rescue = require('express-rescue');
const fs = require('fs/promises');

const app = express();

app.get(
  '/:fileName',
  rescue(async (req, res) => {
    const file = await fs.readFile(`./${req.params.fileName}`);
    res.send(file.toString('utf-8'));
  })
);

app.use((err, req, res, next) => {
  res.status(500).json({ error: `Erro: ${err.message}` });
});

app.listen(3002);
```

#### Erro genérico

É uma boa prática ter um *middleware* de erro genérico, e outros que convertem erros para esse formato genérico. Como:

```
/* errorMiddleware.js */

module.exports = (err, req, res, next) => {
  if (err.code && err.status) {
    return res.status(err.status).json({ message: err.message, code: err.code });
  }

  return res.status(500).json({ message: err.message });
}
```

No exemplo acima, o erro específico é o contido no `if`que analisa se existe um código e status. O genérico é o ultimo.

**É possível passar um *array* de *middlewares* ao invés de passar cada um como um parâmetro da rota/método.**
