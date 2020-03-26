const express = require('express')
const router = express.Router();

module.exports = function() {
    router.get('/', (req, res) => {
        res.render('index'); // Inicio
    });

    router.get('/nosotros', (req, res) => {
        res.render('nosotros'); // Nosotros
    });

    return router;
}