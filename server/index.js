// Importar Express y Rutas
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const routes = require('./routes');

// Importando config/index.js
const configs = require('./config');

// Probando base de datos
// db.authenticate()
//     .then(() => console.log('DB Conectada'))
//     .catch(error => console.log(error))

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

// Muestra el año actual en el footer y genera la ruta
app.use( (req, res, next) => {
    // Crear una nueva fecha
    const fecha = new Date();
    res.locals.fechaActual = fecha.getFullYear();
    res.locals.ruta = req.path;
    return next();
});

// Añadir las vistas
app.set('views', path.join(__dirname, './views'));

// Ejecutando Body Parser 
app.use(bodyParser.urlencoded({extended: true}));

// Cargar las rutas
app.use('/', routes());

app.listen(3000);