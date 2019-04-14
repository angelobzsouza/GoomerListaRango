// Modules
const express = require('express');
const multer = require('multer');
const fs = require('fs')
// Inicia configurações para uploads de imagens
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
router.post('/restaurantes', upload.single("foto"),(req, res) => {
	// Adiciona o caminho da foto do restaurante ao objeto para ser inserido no banco
	req.body.foto = req.file.path;
	// Salva o novo restaurante
	Restaurante.create(req.body).then((restaurante) => {
		res.send(restaurante);
	});
});

// Atualiza um restaurante
router.put('/restaurantes/:IDRestaurante', upload.single("foto"), (req, res) => {
	// Se alguma foto estiver sendo enviada, busca o restaurante para apagar o arquivo antigo
	if (req.file !== undefined) {
		Restaurante.findOne({_id: req.params.IDRestaurante}).then((restaurante) => {
			if (restaurante.foto !== undefined) {
				fs.unlink(restaurante.foto, (err) => {
					if (err) console.log(err);
				})
			}
		});
		// Adiciona o nome da nova foto ao documento do restaurante e atualiza
		req.body.foto = req.file.path;
	}
	Restaurante.findByIdAndUpdate({_id: req.params.IDRestaurante}, req.body).then(() => {
		Restaurante.findOne({_id: req.params.IDRestaurante}).then((restaurante) => {
			res.send(restaurante);
		});
	});
});

// Exclui um restaurante
router.delete('/restaurantes/:IDRestaurante', (req, res) => {
	Restaurante.findOne({_id: req.params.IDRestaurante}).then((restaurante) => {
		// Se o restaurante tiver uma foto salva no server, exclui o arquivo antes de apagar o restaurante
		if (restaurante.foto !== undefined) {
			// Se houver algum erro ao excluir o arquivo, apresenta o mesmo no console
			fs.unlink(restaurante.foto, (err) => {
				if (err) console.log(err);
			})
		}
	});
	Restaurante.findByIdAndRemove({_id: req.params.IDRestaurante}).then((restaurante) => {
		res.send(restaurante);
	});
});

module.exports = router;