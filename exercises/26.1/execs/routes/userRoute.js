var express = require('express');
const { isValidDataUser, createUser, getAllUsers, getUserById } = require('../model/User');
var router = express.Router()

router.get('/', async (_req, res) => {
  const response = await getAllUsers();
  res.status(200).json(response);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await getUserById(id);

  if (!response) return res.status(404).json(
    {
      "error": true,
      "message": "Usuário não encontrado"
    }
  );

  return res.status(200).json(response);
});

router.post('/', async (req, res) => {
  if (!isValidDataUser(req.body)) return res.status(400).json(
    {
      "error": true,
      "message": "O campo 'password' deve ter pelo menos 6 caracteres"
    }
  );

  const response = await createUser(req.body);
  res.status(201).json(response);
});

module.exports = router;