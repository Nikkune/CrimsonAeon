const express = require('express');
const UsersControllers = require('../controllers/UsersControllers')

exports.router = (function () {
    const usersRouter = express.Router();

    usersRouter.route("/").post(UsersControllers.create);
    usersRouter.route("/").get(UsersControllers.read);
    usersRouter.route("/:id").get(UsersControllers.readByID);
    usersRouter.route("/:id").put(UsersControllers.update);
    usersRouter.route("/:id").delete(UsersControllers.del);
    usersRouter.route("/auth/connect").put(UsersControllers.connect);

    return usersRouter;
})();