const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiasPromocaoSchema = new Schema ({
	primeiroDia: String,
	ultimoDia: String,
	horarioInicio: String,
	horarioFim: String,
});

const PromocaoSchema = new Schema ({
	descricao: {
		type: String,
		required: [true, "O campo descricao é obrigatório"]
	},
	preco: {
		type: Number,
		required: [true, "O campo preco promocional é obrigatório"]
	},	
	diasPromocao: {
		type: [DiasPromocaoSchema],
		required: [true, "Os dias de promoção são obrigatórios"],
		validate: [arrayMinlength, "Os dias de promoção são obrigatórios"]
	},
});

const ProdutoSchema = new Schema ({
	nome: {
		type: String,
		required: [true, "O campo nome é obrigatório"]
	},
	preco: {
		type: Number,
		required: [true, "O campo preco é obrigatório"]
	},
	categoria: {
		type: String,
		required: [true, "O campo categoria é obrigatório"]
	},
	foto: {
		type: String
	},
	IDRestaurante: {
		type: mongoose.ObjectId, 
		ref: 'Restaurante',
		required: [true, "O campo IDRestaurante é obrigatório"]
	},
	promocao: {
		type: PromocaoSchema
	},
});

function arrayMinlength(array) {
	return array.length > 0;
}

const Produto = mongoose.model('produtos', ProdutoSchema);

module.exports = Produto;