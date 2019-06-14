const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema do horario de funcionamento dos restaurantes
const FuncionamentoSchema = new Schema ({
	primeiroDia: {
		type: String,
		required: [true, "O campo primeiroDia é obrigatório"]
	},
	ultimoDia: {
		type: String,
		required: [true, "O campo ultimoDIa é obrigatório"]
	},
	horarioInicio: {
		type: String,
		required: [true, "O campo horarioInicio é obrigatório"]
	},
	horarioFim: {
		type: String,
		required: [true, "O campo horarioFim é obrigatório"]
	},
});

// Schema dos restaurantes
const RestauranteSchema = new Schema ({
	nome: {
		type: String,
		required: [true, "O campo nome é obrigatório"]
	},

	endereco: {
		type: String,
		required: [true, "O enderco é obrigatório"]
	},

	foto: String,

	funcionamento: {
		type: [FuncionamentoSchema],
	}
});

function arrayMinlength(array) {
	return array.length > 0;
}

const Restaurante = mongoose.model('restaurantes', RestauranteSchema);

module.exports = Restaurante;