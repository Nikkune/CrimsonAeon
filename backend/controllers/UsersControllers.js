const keyGen = require('../utils/KeyGen');

const editJsonFile = require("edit-json-file");
const User = require('../models/Users');
const getLogger = require("../utils/Logger");

const file = editJsonFile(`${__dirname}/../jsons/Users.json`);


module.exports = {
    create: function (req, res) {
        const apiKey = req.headers['x-api-key'];
        const logger = getLogger(apiKey);

        const {username, email, password} = req.body;

        const id = keyGen(10);

        const newUser = new User(id, username, email, sha1(password));

        file.set(id, newUser);
        file.save();

        logger.info(`La requête ${req.method.charAt(0).toUpperCase()}${req.method.substr(1).toLowerCase()} ${req.url} a réussi !`);
        res.status(201).json(newUser);
    },
    read: function (req, res) {
        const apiKey = req.headers['x-api-key'];
        const logger = getLogger(apiKey);

        logger.info(`La requête ${req.method.charAt(0).toUpperCase()}${req.method.substr(1).toLowerCase()} ${req.url} a réussi !`);
        res.json(file.get());
    },
    readByID: function (req, res) {
        const apiKey = req.headers['x-api-key'];
        const logger = getLogger(apiKey);

        const id = req.params.id;

        logger.info(`La requête ${req.method.charAt(0).toUpperCase()}${req.method.substr(1).toLowerCase()} ${req.url} a réussi !`);
        res.json(file.get(id));
    },
    update: function (req, res) {
        const apiKey = req.headers['x-api-key'];
        const logger = getLogger(apiKey);

        const id = req.params.id;
        const {username, email, password} = req.body;

        const updateUser = new User(id, username, email, password);

        if (file.get(id) !== undefined) {
            file.set(id, updateUser);
            file.save();

            logger.info(`La requête ${req.method.charAt(0).toUpperCase()}${req.method.substr(1).toLowerCase()} ${req.url} a réussi !`);
            res.status(201).json(updateUser);
        } else {
            logger.error(`La requête ${req.method.charAt(0).toUpperCase()}${req.method.substr(1).toLowerCase()} ${req.url} a échoué : User Not Fond !`);
            res.status(404).send("User Not Fond");
        }


    },
    del: function (req, res) {
        const apiKey = req.headers['x-api-key'];
        const logger = getLogger(apiKey);

        const id = req.params.id;

        file.unset(id);
        file.save();

        logger.info(`La requête ${req.method.charAt(0).toUpperCase()}${req.method.substr(1).toLowerCase()} ${req.url} a réussi !`);
        res.status(204).send();
    },
    connect: function (req, res) {
        const apiKey = req.headers['x-api-key'];
        const logger = getLogger(apiKey);

        const {email, password} = req.body;
        const users = file.get();
        for (const userID in users) {
            const user = file.get(userID);
            if (user.email === email) {
                if (user.passwordHash === password) {
                    logger.info(`La requête ${req.method.charAt(0).toUpperCase()}${req.method.substr(1).toLowerCase()} ${req.url} a réussi !`);
                    res.status(200).send("Logged In");
                }else {
                    logger.error(`La requête ${req.method.charAt(0).toUpperCase()}${req.method.substr(1).toLowerCase()} ${req.url} a échoué : Wrong Password !`);
                    res.status(404).send("Wrong Password");
                }
            }else{
                logger.error(`La requête ${req.method.charAt(0).toUpperCase()}${req.method.substr(1).toLowerCase()} ${req.url} a échoué : User Not Found !`);
                res.status(404).send("User Not Found");
            }
        }
    }
}
