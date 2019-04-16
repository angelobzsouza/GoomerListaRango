// Modules
const express = require('express');
const multer = require('multer');
const fs = require('fs')
const validacao = require('./validacoes');

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
router.get('/', (req, res, next) => {
	Restaurante.find().then((restaurantes) => {
		// Verifica se foi encontrado ao menos um restaurante
		if (restaurantes.length !== 0) {
			res.status(200)
				 .send(restaurantes);
		}
		else {
			res.status(404)
				 .send({
				 		Erro: "Nenhum restaurante foi encontrado."
				 });
		}
	});
});

// Busca um restaurante pelo ID
router.get('/:IDRestaurante', (req, res, next) => {
	Restaurante.findOne({_id: req.params.IDRestaurante})
		// Em caso de sucesso retorna o restaurante 
		.then((restaurante) => {
			res.status(200)
				 .send(restaurante);
		})
		// Em caso de erro, retorna o erro
		.catch((error) => {
			res.status(404)
				 .send({
						Erro: 'Restaurante não encontrado.'
				 });
		});
});

// Insere um novo restaurante
router.post('/', upload.single("foto"),(req, res, next) => {
	// Se houver foto, adiciona o path do arquivo ao restaurante
	if (req.body.foto !== undefined) {
		req.body.foto = req.file.path;
	};

	// Valida as entradas de horário
	if (Array.isArray(req.body.funcionamento) && validacao.validaDias(req.body.funcionamento) && validacao.validaHorarios(req.body.funcionamento)) {
		// Salva o novo restaurante
		Restaurante.create(req.body)
			// Em caso de sucesso retorna o restaurante
			.then((restaurante) => {
				res.status(200).send(restaurante);
			})
			// Em caso de erro cria um vetor com os mesmos e retorna
			.catch((err) => {
				var erros = [];
				Object.entries(err.errors).forEach(([key, value]) => {
					erros.push({
						Campo: key,
						Erro: value.message,
					})
				});
				res.status(400).send(erros);     
			});
	}
	// Caso os horário não sejam válidos
	else {
		res.status(400).send({
			Erro: `Horario de funcionamento inválido`
		})
	}
});

// Atualiza um restaurante
router.put('/:IDRestaurante', upload.single("foto"), (req, res, next) => {
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

	// Valida as entradas
	if (validacao.validaDias(req.body.funcionamento) && validacao.validaHorarios(req.body.funcionamento)) {
		Restaurante.findByIdAndUpdate({_id: req.params.IDRestaurante}, req.body)
			// Em caso de sucesso retorna busca o restaurante atualizado e retorna
			.then(() => {
				Restaurante.findOne({_id: req.params.IDRestaurante}).then((restaurante) => {
					res.send(restaurante);
				});
			})
			// Caso o contrário, cria um vetor de erros e envia
			.catch((err) => {
				res.status(404).send({Erro: "Restaurante não encontrado"});
			});
	}
	else {
		res.status(400).send({Erro: `Horario de funcionamento inválido`});
	}
});

// Exclui um restaurante
router.delete('/:IDRestaurante', (req, res, next) => {
	Restaurante.findOne({_id: req.params.IDRestaurante}).then((restaurante) => {
		// Se o restaurante tiver uma foto salva no server, exclui o arquivo antes de apagar o restaurante
		if (restaurante.foto !== undefined) {
			// Se houver algum erro ao excluir o arquivo, apresenta o mesmo no console
			fs.unlink(restaurante.foto, (err) => {
				if (err) console.log(err);
			})
		}
	});
	Restaurante.findByIdAndRemove({_id: req.params.IDRestaurante})
		.then((restaurante) => {
			res.status(200).send(restaurante);
		})
		.catch((err) => {
			res.status(404).send({Erro: "Restaurante não encontrado"});
		});
});

module.exports = router;