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

// Chama as rotas da API
app.use('/api', require('./routes/restaurantes'));
app.use('/api', require('./routes/produtos'));


// Define a porta da API. 3000 é a porta arbitrária para o dev
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API iniciada na porta ${port}`))