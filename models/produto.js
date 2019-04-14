const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiasPromocaoSchema = new Schema ({
	primeiroDia: String,
	ultimoDia: String,
	horarioInicio: String,
	horarioFim: String,
});

const PromocaoSchema = new Schema ({
	descricao: String,
	preco: Number,	
	diasPromocao: [DiasPromocaoSchema],
});

const ProdutoSchema = new Schema ({
	nome: String,
	preco: Number,
	categoria: String,
	IDRestaurante: {type: mongoose.ObjectId, ref: 'Restaurante'},
	promocao: PromocaoSchema,
});

const Produto = mongoose.model('produtos', ProdutoSchema);

module.exports = Produto;