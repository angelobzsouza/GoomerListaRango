const express = require('express');
const router = express.Router();
const Restaurante = require('../models/restaurante');

// CRUD RESTAURANTES
// Busca todos os restaurantes
router.get('/restaurantes', (req, res) => {
	Restaurante.find().then((restaurantes) => {
		res.send(restaurantes);
	});
});

// Busca um restaurante pelo ID
router.get('/restaurantes/:IDRestaurante', (req, res) => {
	Restaurante.findOne({_id: req.params.IDRestaurante}).then((restaurante) => {
		res.send(restaurante);
	});
});

// Insere um novo restaurante
router.post('/restaurantes', (req, res) => {
	Restaurante.create(req.body).then((restaurante) => {
		res.send(restaurante);
	});
});

// Atualiza um restaurante
router.put('/restaurantes/:IDRestaurante', (req, res) => {
	Restaurante.findByIdAndUpdate({_id: req.params.IDRestaurante}, req.body).then(() => {
		Restaurante.findOne({_id: req.params.IDRestaurante}).then((restaurante) => {
			res.send(restaurante);
		});
	});
});

// Exclui um restaurante
router.delete('/restaurantes/:IDRestaurante', (req, res) => {
	Restaurante.findByIdAndRemove({_id: req.params.IDRestaurante}).then((restaurante) => {
		res.send(restaurante);
	});
});

module.exports = router;