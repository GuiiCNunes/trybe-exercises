// hello-msc/index.js

const express = require('express');
const bodyParser = require('body-parser');

const Author = require('./controllers/Author');
const errorMiddleware = require('./middlewares/error');

const app = express();

app.use(bodyParser.json());

app.get('/authors', Author.getAll);
app.get('/authors/:id', Author.findById);
app.post('/authors', Author.create);

app.get('/books', async (req, res) => {
  const { author_id } = req.query;

  if (author_id) {
    const books = await Books.getByAuthorId(author_id);
    return res.status(200).json(books);
  }

  const books = await Books.getAll();
  res.status(200).json(books);
});

app.get('/books/:id', async (req, res) => {
  const { id } = req.params;
  const books = await Books.getBookId(id);
  if (!books) return res.status(404).json({ message: 'Not found' });
  return res.status(200).json(books);
});

app.post('/books', (req, res) => {
  const { title, author_id} = req.body;

  if (Books.isValidBook(title, author_id)) return res.status(400).json({ message: 'Dados inválidos' });
  Books.createBook(title, author_id);
  res.status(201).json({ message: 'Livro criado com sucesso! '});
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
