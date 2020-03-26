// Importar Express y Rutas
const express = require('express');
const routes = require('./routes');

// Configurar Express
const app = express();

// Cargar las rutas
app.use('/', routes());

app.listen(3000);