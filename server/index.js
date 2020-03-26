// Importar Express y Rutas
const express = require('express');
const path = require('path');
const routes = require('./routes');

// Configurar Express
const app = express();

// Habilitar Pug
app.set('view engine', 'pug');

// Añadir las vistas
app.set('views', path.join(__dirname, './views'));

// Cargar las rutas
app.use('/', routes());

app.listen(3000);