const Joi = require('joi');
const rescue = require('express-rescue');
const Books = require('../services/Book')

const getAll = rescue(async (req, res) => {
  const { author_id } = req.query;

  if (author_id) {
    const books = await Books.getByAuthorId(author_id);
    return res.status(200).json(books);
  }

  const books = await Books.getAll();
  res.status(200).json(books);
});

const getBookId = rescue(async (req, res, next) => {
  const { id } = req.params;
  const books = await Books.getBookId(id);

  if (books.error) return next(books.error);

  if (!books) return res.status(404).json({ message: 'Not found' });
  return res.status(200).json(books);
});

const createBook = rescue(async (req, res, next) => {
  const { title, author_id} = req.body;

  const { error } = Joi.object({
    title: Joi.string().not().empty().required(),
    author_id: Joi.number().not().empty().required(),
  }).validate(req.body);

  if (error) {
    return next(error);
  }
  
  Books.createBook(title, author_id);
  res.status(201).json({ message: 'Livro criado com sucesso! '});
});

module.exports = {
  getAll,
  getBookId,
  createBook,
};
