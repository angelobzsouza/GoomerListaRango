const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Cria o esquema e o model de restaurantes
const RestauranteSchema = new Schema ({
	nome: {
		type: String,
		required: [true, "O campo \"nome\" é obrigatório"]
	},
	endereco: {
		type: String,
		required: [true, "O campo \"endereco\" é obrigatório"]
	}
});

const Restaurante = mongoose.model('restaurantes', RestauranteSchema);

module.exports = Restaurante;