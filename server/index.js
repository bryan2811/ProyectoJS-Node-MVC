// Importar Express y Rutas
const express = require('express');
const path = require('path');
const routes = require('./routes');

// Importando config/index.js
const configs = require('./config');

// Importando base de datos
const db = require('./config/database');

// Probando base de datos
db.authenticate()
    .then(() => console.log('DB Conectada'))
    .catch(error => console.log(error))

// Configurar Express
const app = express();

// Habilitar Pug
app.set('view engine', 'pug');

// Importando los archivos estáticos (public)
app.use(express.static('public'));

// Validar si estamos en desarrollo o producción
const config = configs[app.get('env')]; // Obtener el ambiente (Desarrollo o Producción)

// Creamos la variable para el sitio web
app.locals.titulo = config.nombresitio;

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