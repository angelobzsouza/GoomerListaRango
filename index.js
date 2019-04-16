const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Inicia uma aplicação expess
const app = express();

// Conexão com o banco
mongoose.connect('mongodb://localhost/GoomerListaRangoDB', {
	useNewUrlParser: true,
});
mongoose.Promise = global.Promise;

// Configura middlewares
app.use(bodyParser.json());

// Garante acesso para aplicações de outros servers
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', '*');
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
		return res.status(200).send({});
	}
	next();
})

// Chama as rotas da API
app.use('/api/restaurantes', require('./routes/restaurantes'));
app.use('/api/produtos', require('./routes/produtos'));

// Trata erros de rotas inválidas
app.use((req, res, next) => {
	const error = new Error('Rota não encontrada');
	error.status = 404;
	next(error);
});
// Tratamento de todos os erros
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.send({
		Erro: error.message,
	});
});

// Garante que a pasta de uploads seja acessível para as aplicações
app.use('/uploads', express.static('uploads'));

// Define a porta da API. 3000 é a porta arbitrária para o dev
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API iniciada na porta ${port}`))