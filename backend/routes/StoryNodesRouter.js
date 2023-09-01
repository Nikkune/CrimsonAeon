const express = require('express');
const StoryNodesControllers = require('../controllers/StoryNodesControllers')

exports.router = (function () {
    const storyNodesRouter = express.Router();

    storyNodesRouter.route("/").get(StoryNodesControllers.read);
    storyNodesRouter.route("/").put(StoryNodesControllers.update);

    return storyNodesRouter;
})();