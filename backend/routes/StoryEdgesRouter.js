const express = require('express');
const StoryEdgesControllers = require('../controllers/StoryEdgesControllers')

exports.router = (function () {
    const storyNodesRouter = express.Router();

    storyNodesRouter.route("/").get(StoryEdgesControllers.read);
    storyNodesRouter.route("/").put(StoryEdgesControllers.update);

    return storyNodesRouter;
})();