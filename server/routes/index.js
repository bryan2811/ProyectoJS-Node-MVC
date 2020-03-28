const express = require('express')
const router = express.Router();

// Importando Controladores
const homeController = require('../controllers/homeController');
const nosotrosController = require('../controllers/nosotrosController');
const viajesController = require('../controllers/viajesController');
const testimonialesController = require('../controllers/testimonialesController');

module.exports = function() {
    router.get('/', homeController.consultasHomepage); // Página de Inicio
    router.get('/nosotros', nosotrosController.infoNosotros); // Página de Nosotros
    router.get('/viajes', viajesController.mostrarViajes); // Página de Viajes
    router.get('/viajes/:id', viajesController.mostrarViaje); // Página de Viaje c/u
    router.get('/testimoniales', testimonialesController.mostrarTestimoniales); // Testimoniales GET
    router.post('/testimoniales', testimonialesController.agregarTestimonial); // Testimoniales POST
    
    return router;
}