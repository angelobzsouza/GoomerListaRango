const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema do horario de funcionamento dos restaurantes
const FuncionamentoSchema = new Schema ({
	primeiroDia: String,
	ultimoDia: String,
	horarioInicio: String,
	horarioFim: String,	
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