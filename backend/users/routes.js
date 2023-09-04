const express = require('express');
const userController = require('./controllers/userController.js');

const router = express.Router();

// Route de suppression
router.delete('/delete', userController.deleteUser);

module.exports = router;