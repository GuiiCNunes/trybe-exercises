const isValidEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.([a-z]+))?$/i;
const isValidPassword = /(\d){4,8}/i;

const validUser = (req, res, next) => {
  const { username, email, password } = req.body;

  if(
    username.length <= 3
    // // || isValidEmail.test(email)
    // || typeof password !== 'number'
    || !isValidPassword.test(password)
  ) return res.status(400).json({ "message": "invalid data" });
};

module.exports = validUser;
