var express = require('express');
const authData = require('../middlewares/authData');
const { isValidDataUser, createUser, getAllUsers, getUserById, updateUser } = require('../model/User');
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

router.post('/', authData, async (req, res) => {
  const response = await createUser(req.body);
  res.status(201).json({ id: response[0].insertId, ...req.body });
});

router.put('/:id', authData, async (req, res) => {
  const { id } = req.params;
  const response = await updateUser(id, req.body);
  if (!response) return res.status(404).json({
    "error": true,
    "message": "Usuário não encontrado"
  });

  return res.status(200).json(response);
});

module.exports = router;
