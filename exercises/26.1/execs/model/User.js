const connection = require("./connection");
const { ObjectId } = require('mongodb');

const isValidDataUser = ({ firstName, lastName, email, password }) => {
  if (!firstName || !lastName || !email || !password) return false;
  if (password.length < 6) return false;

  return true;
};

const createUser = async ({ firstName, lastName, email, password }) => connection()
  .then((db) => db.collection('users').insertOne({ firstName, lastName, email, password }) )
  .then((response) => ({ firstName, lastName, email, password, id: response.insertedId }) );

const getAllUsers = async () => connection()
  .then((db) => db.collection('users').find().toArray())
  .then((response) => response.map(({ firstName, lastName, email, password, _id }) => (
    { firstName, lastName, email, password, id: _id }
  )));

const getUserById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const response = await connection().then((db) => db.collection('users').findOne(new ObjectId(id)));
  if (!response) return null;

  const { firstName, lastName, email, password, _id } = response;

  return { firstName, lastName, email, password, id: _id };
}

module.exports = {
  createUser,
  isValidDataUser,
  getAllUsers,
  getUserById,
};
