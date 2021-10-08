const Book = require('../models/Book');
const Author = require('../models/Author');

const isValidBook = (title, author_id) => {
  if (!title || title.length < 3) return false;
  if (!author_id || isValidAuthor(author_id)) return false;

  return true;
};

const getAll = async () => Book.getAll();
const getByAuthorId = async (id) => {
  const author = await Author.findById(id)
  
  if (author.error) {
    return {
      error: {
        code: 'notFound',
        message: `Não foi possível encontrar um autor com o id ${id}`,
      },
    };
  }

  return Book.getByAuthorId(id);
}
const getBookId = async (id) => {
  const book = await Book.getBookId(id);
  
  if (!book) {
    return {
      error: {
        code: 'notFound',
        message: `Não foi possível encontrar um livro com o id ${id}`,
      },
    };
  }

  return book;
}
const createBook = async (title, author_id) => createBook(title, author_id);

module.exports = {
  getAll,
  getByAuthorId,
  getBookId,
  createBook,
};
