const express = require('express');
const router = express.Router();
const Produto = require('../models/produto');

// CRUD PRODUTOS
// Busca todos os produtos de um restaurante
router.get('/produtos/:IDRestaurante', (req, res) => {
	Produto.findOne({IDRestaurante: req.params.IDRestaurante}).then((produtos) => {
		res.send(produtos);
	});
});

// Insere um novo produto
router.post('/produtos', (req, res) => {
	Produto.create(req.body).then((produto) => {
		res.send(produto);
	});
});

// Atualiza um produto
router.put('/produtos/:IDProduto', (req, res) => {
	Produto.findByIdAndUpdate({_id: req.params.IDProduto}, req.body).then(() => {
		Produto.findOne({_id: req.params.IDProduto}).then((produto) => {
			res.send(produto);
		});
	});});

// Exclui um produto
router.delete('/produtos/:IDProduto', (req, res) => {
	Produto.findByIdAndRemove({_id: req.params.IDProduto}).then((produto) => {
		res.send(produto);
	});
});

module.exports = router;