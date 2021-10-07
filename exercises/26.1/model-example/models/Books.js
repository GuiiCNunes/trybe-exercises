const connection = require('./connection');
const { ObjectID } = require('mongodb');
const Author = require('./Author');

const getByAuthorId = async (authorId) => {
  return connection()
    .then((db) => db.collection('books').find({ author_id: parseInt(authorId) }).toArray());
};

const getBookId = async (bookId) => {
  if (!ObjectID.isValid(bookId)) {
      return null;
  }

  const bookData = await connection()
    .then((db) => db.collection('books').findOne(new ObjectID(bookId)));

  if (!bookData) return null;
  return bookData;
};

const getAll = async () => {
  return connection()
    .then((db) => db.collection('books').find().toArray());
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

const createBook = async (title, author_id) => connection()
  .then((db) => db.collection('books').insertOne({ title, author_id }));

module.exports = {
  getAll,
  getByAuthorId,
  getBookId,
  isValidBook,
  createBook,
};
