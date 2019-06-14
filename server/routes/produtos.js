// Modules
const express = require('express');

//Controllers
const produtos = require('../controllers/Produtos.js');

// Inicia o router
const router = express.Router();

// CRUD PRODUTOS
// Busca todos os produtos de um restaurante
router.get('/:IDRestaurante', produtos.getProduct);

// Insere um novo produto
router.post('/', produtos.createProduct);

// Atualiza um produto
router.put('/:IDProduto', produtos.updateProduct);

// Exclui um produto
router.delete('/:IDProduto',produtos.deleteProduct);

module.exports = router;