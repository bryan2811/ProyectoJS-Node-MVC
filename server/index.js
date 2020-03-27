// Importar Express y Rutas
const express = require('express');
const path = require('path');
const routes = require('./routes');

// Configurar Express
const app = express();

// Habilitar Pug
app.set('view engine', 'pug');

// Importando los archivos estáticos (public)
app.use(express.static('public'));

// Muestra el año actual en el footer
app.use( (req, res, next) => {
    // Crear una nueva fecha
    const fecha = new Date();
    res.locals.fechaActual = fecha.getFullYear();
    return next();
});

// Añadir las vistas
app.set('views', path.join(__dirname, './views'));

// Cargar las rutas
app.use('/', routes());

app.listen(3000);