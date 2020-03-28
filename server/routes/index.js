const express = require('express')
const router = express.Router();

const Viaje = require('../models/Viajes');

module.exports = function() {
    router.get('/', (req, res) => {
        res.render('index'); // Inicio
    });

    router.get('/nosotros', (req, res) => {
        res.render('nosotros', {
            pagina: 'Sobre Nosotros'
        });
    }); // Nosotros

    router.get('/viajes', (req, res) => {
        Viaje.findAll()
            .then(viajes => res.render('viajes', {
                pagina: 'Próximos Viajes',
                viajes
            }))
            .catch(error => console.log(error))
    }); // Viajes

    router.get('/viajes/:id', (req, res) => {
        Viaje.findByPk(req.params.id)
            .then(viaje => res.render('viaje', {
                viaje
            }))
            .catch(error => console.log(error))
    }); // Viaje c/u

    router.get('/testimoniales', (req, res) => {
        res.render('testimoniales', {
            pagina: 'Testimoniales'
        });
    }); // Testimoniales

    return router;
}