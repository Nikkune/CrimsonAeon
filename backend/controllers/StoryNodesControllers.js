const editJsonFile = require("edit-json-file");
const getLogger = require("../utils/Logger");

const file = editJsonFile(`${__dirname}/../jsons/StoryNodes.json`);

module.exports = {
    read: function (req, res) {
        const apiKey = req.headers['x-api-key'];
        const logger = getLogger(apiKey);

        const result = [];
        for (const node of file.get().nodes) {
            result.push(node);
        }

        logger.info(`La requête ${req.method.charAt(0).toUpperCase()}${req.method.substr(1).toLowerCase()} ${req.url} a réussi !`);
        res.json(result)
    },
    update: function (req, res) {
        const apiKey = req.headers['x-api-key'];
        const logger = getLogger(apiKey);

        const {nodes} = req.body
        file.set("nodes", JSON.parse(nodes));
        file.save();

        logger.info(`La requête ${req.method.charAt(0).toUpperCase()}${req.method.substr(1).toLowerCase()} ${req.url} a réussi !`);
        res.send(file.get());
    }
}