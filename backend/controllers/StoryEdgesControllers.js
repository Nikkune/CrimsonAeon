const editJsonFile = require("edit-json-file");
const getLogger = require("../utils/Logger");

const file = editJsonFile(`${__dirname}/../jsons/StoryEdges.json`);

module.exports = {
    read: function (req, res) {
        const apiKey = req.headers['x-api-key'];
        const logger = getLogger(apiKey);

        const result = [];
        for (const edge of file.get().edges) {
            result.push(edge);
        }

        logger.info(`La requête ${req.method.charAt(0).toUpperCase()}${req.method.substr(1).toLowerCase()} ${req.url} a réussi !`);
        res.json(result)
    },
    update: function (req, res) {
        const apiKey = req.headers['x-api-key'];
        const logger = getLogger(apiKey);

        const {edges} = req.body
        file.set("edges", JSON.parse(edges));
        file.save();

        logger.info(`La requête ${req.method.charAt(0).toUpperCase()}${req.method.substr(1).toLowerCase()} ${req.url} a réussi !`);
        res.send(file.get());
    }
}