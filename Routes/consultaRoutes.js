// Routes/consultaRoutes.js
const express = require('express');
const router = express.Router();
const Consulta = require('../models/Consulta');

// Criar uma nova consulta
router.post('/', async (req, res) => {
  try {
    const consulta = new Consulta(req.body);
    await consulta.save();
    res.status(201).send(consulta);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Listar todas as consultas de um usuário
router.get('/:userId', async (req, res) => {
  try {
    const consultas = await Consulta.find({ userId: req.params.userId });
    res.send(consultas);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Atualizar uma consulta
router.put('/:id', async (req, res) => {
  try {
    const consulta = await Consulta.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!consulta) {
      return res.status(404).send();
    }
    res.send(consulta);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Deletar uma consulta
router.delete('/:id', async (req, res) => {
  try {
    const consulta = await Consulta.findByIdAndDelete(req.params.id);
    if (!consulta) {
      return res.status(404).send();
    }
    res.send(consulta);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
