// Importar Express
const express = require('express');

// Configurar Express
const app = express();
app.use('/', (req, res) => {
    res.send('Hola Mundo en NodeJS');
});

app.listen(3000);