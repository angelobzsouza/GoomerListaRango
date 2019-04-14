// Modules
const express = require('express');
const multer = require('multer');
const fs = require('fs');
// Inicia as configurações de upload de imagem
const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, './uploads/');
	},
	filename: (req, file, callback) => {
		callback(null, new Date().toISOString() + file.originalname);
	}
});
const upload = multer({storage: storage});
// Inicia o router
const router = express.Router();
// Models
const Produto = require('../models/produto');

// CRUD PRODUTOS
// Busca todos os produtos de um restaurante
router.get('/produtos/:IDRestaurante', (req, res) => {
	Produto.findOne({IDRestaurante: req.params.IDRestaurante}).then((produtos) => {
		res.send(produtos);
	});
});

// Insere um novo produto
router.post('/produtos', upload.single("foto"),(req, res) => {
	// Adiciona o caminho da foto do produto ao objeto para ser inserido no banco
	req.body.foto = req.file.path;
	// Salva o novo produto no banco
	Produto.create(req.body).then((produto) => {
		res.send(produto);
	});
});

// Atualiza um produto
router.put('/produtos/:IDProduto', upload.single("foto"),(req, res) => {
	// Se alguma foto estiver sendo enviada, busca o produto para apagar o arquivo antigo
	if (req.file !== undefined) {
		Produto.findOne({_id: req.params.IDProduto}).then((produto) => {
			if (produto.foto !== undefined) {
				fs.unlink(produto.foto, (err) => {
					if (err) console.log(err);
				})
			}
		});
		// Adiciona o nome da nova foto ao documento do restaurante e atualiza
		req.body.foto = req.file.path;
	}
	Produto.findByIdAndUpdate({_id: req.params.IDProduto}, req.body).then(() => {
		Produto.findOne({_id: req.params.IDProduto}).then((produto) => {
			res.send(produto);
		});
	});});

// Exclui um produto
router.delete('/produtos/:IDProduto', (req, res) => {
	Produto.findOne({_id: req.params.IDProduto}).then((produto) => {
		// Se o produto tiver uma foto salva no server, exclui o arquivo antes de apagar o produto
		if (produto.foto !== undefined) {
			// Se houver algum erro ao excluir o arquivo, apresenta o mesmo no console
			fs.unlink(produto.foto, (err) => {
				if (err) console.log(err);
			})
		}
	});
	Produto.findByIdAndRemove({_id: req.params.IDProduto}).then((produto) => {
		res.send(produto);
	});
});

module.exports = router;