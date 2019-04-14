const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema do horario de funcionamento dos restaurantes
const FuncionamentoSchema = new Schema ({
	primeiroDia: String,
	ultimoDia: String,
	horarioAbertura: String,
	horarioFechamento: String,	
});

// Schema dos restaurantes
const RestauranteSchema = new Schema ({
	nome: String,
	endereco: String,
	foto: String,
	funcionamento: [FuncionamentoSchema],
});

const Restaurante = mongoose.model('restaurantes', RestauranteSchema);

module.exports = Restaurante;