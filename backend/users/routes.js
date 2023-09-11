const express = require('express');
const userController = require('./controllers/userController.js');

const router = express.Router();

// Route de suppression
router.delete('/delete', userController.deleteUser);

// Route pour obtenir les contacts de l'utilisateur
router.get('/contacts', userController.getContacts);

// Route pour obtenir les notifications de l'utilisateur
router.get('/notifications', userController.getNotifications);

// Route pour obtenir le mode de l'utilisateur
router.get('/mode', userController.getMode);

// Route pour obtenir la langue de l'utilisateur
router.get('/lang', userController.getLang);

// Route pour ajouter un contact à l'utilisateur
router.post('/contacts', userController.addContact);

// Route pour ajouter une notification à l'utilisateur
router.post('/notifications', userController.addNotification);

// Route pour mettre à jour le mode de l'utilisateur
router.put('/mode', userController.toggleMode);

// Route pour mettre à jour la langue de l'utilisateur
router.put('/lang', userController.updateLang);

// Route pour supprimer un contact de l'utilisateur
router.delete('/contacts/:contactId', userController.deleteContact);

// Route pour supprimer une notification de l'utilisateur
router.delete('/notifications/:notificationId', userController.deleteNotification);

module.exports = router;