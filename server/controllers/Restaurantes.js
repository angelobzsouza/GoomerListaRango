// Modules
const fs = require('fs')
const validacao = require('../validation/validacoes');
const multer = require('multer');

// Models
const Restaurante = require('../models/restaurante');

// Inicializações
const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, './uploads/');
	},
	filename: (req, file, callback) => {
		callback(null, new Date().toISOString() + file.originalname);
	}
});
const upload = multer({storage: storage});

//CRUD
const getRestaurants = (req, res) => {
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
};

const getRestaurant = (req, res) => {
	Restaurante.findOne({_id: req.params.IDRestaurante})
		// Em caso de sucesso retorna o restaurante 
		.then((restaurante) => {
			res.status(200)
				 .send(restaurante);
		})
		// Em caso de erro, retorna o erro
		.catch(() => {
			res.status(404)
				 .send({
						Erro: 'Restaurante não encontrado.'
				 });
		});
};

const createRestaurant = (req, res) => {
	//Upload da foto
	upload.single("foto")
	// Se houver foto, adiciona o path do arquivo ao restaurante
	if (req.body.foto) {
		req.body.foto = req.file.path;
	};

	// Valida as entradas de horário
	if (req.body.funcionamento != null &&
		Array.isArray(req.body.funcionamento) &&
		validacao.validaDias(req.body.funcionamento) &&
		validacao.validaHorarios(req.body.funcionamento)) {
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
};

const updateRestaurant = (req, res) => {
	//Upload da foto
	upload.single("foto");
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

	// Valida os horários
	if (Array.isArray(req.body.funcionamento)) {
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
	}
	// Se não houver um novo horário, atualiza
	else {
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
}

const deleteRestaurant = (req, res) => {
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
}

module.exports = { getRestaurants, getRestaurant, createRestaurant, updateRestaurant, deleteRestaurant };