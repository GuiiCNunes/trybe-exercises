// /* index.js */ 
// const express = require('express');
// const bodyParser = require('body-parser');
// const authMiddleware = require('./auth-middleware');

// const app = express();
// app.use(bodyParser.json());


// // Esta rota não passa pelo middleware de autenticação!
// app.get('/open', function (req, res) {
//   res.send('open!')
// });

// // Esta rota passa pelo middleware de autenticação!
// app.get('/fechado', authMiddleware, function (req, res) {
//   res.send('closed!')
// });

// // app.use(authMiddleware);

// const recipesRouter = require('./recipesRouter');

// /* Todas as rotas com /recipes/<alguma-coisa> entram aqui e vão para o roteador. */
// app.use('/recipes', recipesRouter);

// // app.all('*', function (req, res) {
// //  return res.status(404).json({ message: `Rota '${req.path}' não existe!`});
// // });

// app.listen(3001, () => { console.log('Ouvindo na porta 3001'); });

// --------------------------
/* index.js */
const express = require('express');
const rescue = require('express-rescue');
const errorMiddleware = require('./errorMiddleware');

const app = express();

app.get('/:fileName', [
  rescue(async (req, res) => {
    const file = await fs.readFile(`./${req.params.fileName}`);
    res.send(file.toString('utf-8'));
  }),
  (err, req, res, next) => {
    if (err.code ==- 'ENOENT') {
      const newError = new Error(err.message);
      newError.code = 'file_not_found';
      newError.status = 404;
      return next(newError);
    }

    return next(err);
  },
]);

app.use(errorMiddleware);