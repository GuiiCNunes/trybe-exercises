const connection = require("./connection");

const isValidDataUser = ({ firstName, lastName, email, password }) => {
  if (!firstName || !lastName || !email || !password) return false;
  if (password.length < 6) return false;

  return true;
};

const createUser = async ({ firstName, lastName, email, password }) => connection.execute(
  'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?);',
  [firstName, lastName, email, password],
);

const getAllUsers = async () => {
  const [response] = await connection.execute('SELECT * FROM users');
  return response;
};

const getUserById = async (idUser) => {
  const [response] = await connection.execute(
    'SELECT * FROM users WHERE id = ?',
    [idUser]
  );
  if (!response[0]) return null;

  const { first_name: firstName, last_name: lastName, email, password, id } = response[0];

  return { firstName, lastName, email, password, id };
}

const updateUser = async (id, { firstName, lastName, email, password }) => {
  const user = await getUserById(id);
  if (!user) return null;

  // const response = await connection()
  //   .then((db) => db.collection('users').updateOne({ _id: new ObjectId(id) }, { $set: {
  //     firstName, lastName, email, password
  //   }}));
  await connection.execute(
    'UPDATE users SET first_name=?, last_name=?, email=?, password=? WHERE id=?',
    [firstName, lastName, email, password, id],
  );
  return { id, firstName, lastName, email, password };
};

module.exports = {
  createUser,
  isValidDataUser,
  getAllUsers,
  getUserById,
  updateUser,
};
