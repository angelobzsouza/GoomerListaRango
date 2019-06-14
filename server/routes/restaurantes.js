// Modules
const express = require('express');

//Controllers
const restaurantes = require('../controllers/Restaurantes.js');

// Inicializações
const router = express.Router();

// CRUD RESTAURANTES
// Busca todos os restaurantes
router.get('/', restaurantes.getRestaurants);

// Busca um restaurante pelo ID
router.get('/:IDRestaurante', restaurantes.getRestaurant);

// Insere um novo restaurante
router.post('/', restaurantes.createRestaurant);

// Atualiza um restaurante
router.put('/:IDRestaurante', restaurantes.updateRestaurant);

// Exclui um restaurante
router.delete('/:IDRestaurante', restaurantes.deleteRestaurant);

module.exports = { router };