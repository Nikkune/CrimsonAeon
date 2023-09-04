const express = require('express');
const authController = require('./controllers/authController.js');

const router = express.Router();

// Route d'inscription
router.post('/signup', authController.signup);

// Route de connexion
router.post('/login', authController.login);

module.exports = router;