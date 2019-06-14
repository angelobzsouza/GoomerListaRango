const app = require('./server/server');
// Define a porta da API. 3000 é a porta arbitrária para o dev
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API iniciada na porta ${port}`));