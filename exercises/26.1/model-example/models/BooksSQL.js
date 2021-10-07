const connection = require('./connection');
const Author = require('./Author');

const getByAuthorId = async (authorId) => {
  const [books] = await connection.execute(`SELECT * FROM books WHERE author_id = ?`, [authorId]);
  return books;
};

const getBookId = async (bookId) => {
  const query = 'SELECT * FROM books WHERE id = ?';

  const [book] = await connection.execute(query, [bookId]);

  if (book.length === 0) return null;

  return book;
};

const getAll = async () => {
  const [books] = await connection.execute('SELECT * FROM books;');

  return books;
};

const isValidAuthor = async (author_id) => {
  const author = await Author.findById(author_id);
  return author ? true : false;
};

const isValidBook = (title, author_id) => {
  if (!title || title.length < 3) return false;
  if (!author_id || isValidAuthor(author_id)) return false;

  return true;
};

const createBook = (title, author_id) => connection.execute(
  'INSERT INTO model_example.books (title, author_id) VALUES (?, ?)',
  [title, author_id]
);

module.exports = {
  getAll,
  getByAuthorId,
  getBookId,
  isValidBook,
  createBook,
};
