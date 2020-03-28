const express = require('express')
const router = express.Router();

const Viaje = require('../models/Viajes');
const Testimonial = require('../models/Testimoniales');

module.exports = function() {
    router.get('/', (req, res) => {
        const promises = [];
        
        promises.push(Viaje.findAll({
            limit: 3
        }))

        promises.push(Testimonial.findAll({
            limit: 3
        }))

        // Pasar el promise y ejecutarlo
        const resultado = Promise.all(promises);
        
        resultado.then(resultado => res.render('index', {
            pagina: 'Próximos Viajes',
            clase: 'home',
            viajes : resultado[0],
            testimoniales : resultado[1]
        }))
        .catch(error => console.log(error))
    }); // Página de Inicio

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
        Testimonial.findAll()
            .then(testimoniales => res.render('testimoniales', {
                pagina: 'Testimoniales',
                testimoniales
            }))
    }); // Testimoniales GET

    router.post('/testimoniales', (req, res) => {
        // Validar que todos los campos estén llenos
        let {nombre, correo, mensaje} = req.body;

        let errores = [];
        if (!nombre) {
            errores.push({'mensaje' : 'Agrega tu nombre'})
        }
        if (!correo) {
            errores.push({'mensaje' : 'Agrega tu correo'})
        }
        if (!mensaje) {
            errores.push({'mensaje' : 'Agrega tu mensaje'})
        }

        // Revisar por errores
        if (errores.length > 0) {
            // Muestra la vista con errores
            res.render('testimoniales', {
                errores,
                nombre,
                correo,
                mensaje
            })
        } else {
            // Almacenarlo en la BD
            Testimonial.create({
                nombre,
                correo,
                mensaje
            })
            .then(testimonial => res.redirect('/testimoniales'))
            .catch(error => console.log(error))
        }
    }); // Testimoniales POST

    return router;
}