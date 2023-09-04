const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config');

const app = express();

// Middleware
// Middleware pour autoriser les requêtes depuis les domaines autorisés
app.use(cors({
    origin: config.allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Middleware pour analyser le corps des requêtes au format JSON
app.use(bodyParser.json());

// Middleware pour analyser les cookies
app.use(cookieParser());


app.listen(config.port, () => {
    config.logger.info(`Serveur en écoute sur le port ${config.port}`);
});