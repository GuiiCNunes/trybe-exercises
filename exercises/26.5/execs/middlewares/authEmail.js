const regexEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const authEmail = (req, res, next) => {
  const { email, password } = req.body;
  if (!regexEmail.test(email)
    || (password.length < 4 || password.length > 8)
  ) return res.status(400).json({ message: 'email or password is incorrect' });

  next();
};

module.exports = authEmail;
