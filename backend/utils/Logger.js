const winston = require('winston');
const config = require('../config');

const loggers = {};

function getLogger(apiKey) {
    if (!loggers[apiKey]) {
        loggers[apiKey] = winston.createLogger({
            level: 'info', // Niveau de log par défaut
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.printf(info => `${apiKey} > ${info.message}`)
            ),
            transports: [
                new winston.transports.File({filename: `${config.logDirectory}/${apiKey}_api.log`}), // Crée un fichier de log distinct par clé d'API
            ],
        });
    }
    return loggers[apiKey];
}

module.exports = getLogger;
