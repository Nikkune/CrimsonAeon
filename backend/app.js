const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const getLogger = require('./utils/Logger');
const keyGen = require('./utils/KeyGen');
const StoryNodesRouter = require('./routes/StoryNodesRouter').router;
const StoryEdgesRouter = require('./routes/StoryEdgesRouter').router;
const UsersRouter = require('./routes/UsersRouter').router;

const corsOptions = {
    origin: config.allowedOrigins, // Utilisez l'option allowedOrigins pour spécifier les domaines autorisés
};

const app = express();

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use((req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        getLogger('App').error('Tentative d\'accès sans clé API.');
    } else {
        if (!config.allowedApiKeys.includes(apiKey)) {
            getLogger('App').error('Tentative d\'accès non autorisée avec l\'API : ' + apiKey);
            return res.status(401).json({error: 'Accès non autorisé.'});
        }
    }

    const logger = getLogger(apiKey);
    if (!config.allowedRoutes[apiKey].includes(req.url.split('/')[1])) {
        logger.error(`Requête ${req.method.charAt(0).toUpperCase()}${req.method.substr(1).toLowerCase()} ${req.url} non autorisé`);
        getLogger('App').error(`Requête ${req.method.charAt(0).toUpperCase()}${req.method.substr(1).toLowerCase()} ${req.url} non autorisé pour : ${apiKey}`);
        return res.status(401).json({error: 'Accès non autorisé.'});
    }

    logger.info(`Requête ${req.method.charAt(0).toUpperCase()}${req.method.substr(1).toLowerCase()} ${req.url} autorisée`);

    next();
});

app.use('/storyNodes/', StoryNodesRouter);
app.use('/storyEdges/', StoryEdgesRouter);
app.use('/users/', UsersRouter);

app.get('/token', (req, res) => {
    res.send(keyGen(req.body.length));
})

app.listen(config.port, () => {
    getLogger('App').info(`Serveur Express écoutant sur le port ${config.port}`);
    console.log(`Serveur Express écoutant sur le port ${config.port}`);
});