const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const config = require('../../config.js');
const Notifications = require("../models/notifications");

exports.getContacts = async (req, res) => {
    const token = req.cookies.jwtToken;

    try {
        const decodedToken = jwt.verify(token, config.jwtSecret);
        const userId = decodedToken.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const contacts = user.contacts;
        return res.status(200).json(contacts);
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
};

exports.getNotifications = async (req, res) => {
    const token = req.cookies.jwtToken;

    try {
        const decodedToken = jwt.verify(token, config.jwtSecret);
        const userId = decodedToken.userId;

        const notifications = await User.getNotifications(userId);
        return res.status(200).json(notifications);
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
};

exports.getMode = async (req, res) => {
    const token = req.cookies.jwtToken;

    try {
        const decodedToken = jwt.verify(token, config.jwtSecret);
        const userId = decodedToken.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const mode = user.mode;
        return res.status(200).json({mode});
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
};

exports.getLang = async (req, res) => {
    const token = req.cookies.jwtToken;

    try {
        const decodedToken = jwt.verify(token, config.jwtSecret);
        const userId = decodedToken.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const lang = user.lang;
        return res.status(200).json({lang});
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
};

exports.addContact = async (req, res) => {
    const token = req.cookies.jwtToken;
    const {contact} = req.body;

    try {
        const decodedToken = jwt.verify(token, config.jwtSecret);
        const userId = decodedToken.userId;

        await User.addContact(userId, contact);
        return res.status(200).json({message: 'Contact added successfully'});
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
};

exports.addNotification = async (req, res) => {
    const token = req.cookies.jwtToken;
    const {level, message} = req.body;

    try {
        const decodedToken = jwt.verify(token, config.jwtSecret);
        const userId = decodedToken.userId;

        await User.addNotification(userId, new Notifications(crypto.randomUUID(), level, message));
        return res.status(200).json({message: 'Notification added successfully'});
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
};

exports.toggleMode = async (req, res) => {
    const token = req.cookies.jwtToken;

    try {
        const decodedToken = jwt.verify(token, config.jwtSecret);
        const userId = decodedToken.userId;

        await User.toggleMode(userId);
        return res.status(200).json({message: 'Mode updated successfully'});
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
};

exports.updateLang = async (req, res) => {
    const token = req.cookies.jwtToken;
    const {newLang} = req.body;

    try {
        const decodedToken = jwt.verify(token, config.jwtSecret);
        const userId = decodedToken.userId;

        await User.updateLang(userId, newLang);
        return res.status(200).json({message: 'Language updated successfully'});
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
};

exports.deleteContact = async (req, res) => {
    const token = req.cookies.jwtToken;
    const {contactId} = req.params;

    try {
        const decodedToken = jwt.verify(token, config.jwtSecret);
        const userId = decodedToken.userId;

        await User.deleteContact(userId, contactId);
        return res.status(200).json({message: 'Contact deleted successfully'});
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
};

exports.deleteNotification = async (req, res) => {
    const token = req.cookies.jwtToken;
    const {notificationId} = req.params;

    try {
        const decodedToken = jwt.verify(token, config.jwtSecret);
        const userId = decodedToken.userId;

        await User.deleteNotification(userId, notificationId);
        return res.status(200).json({message: 'Notification deleted successfully'});
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
};

exports.deleteUser = async (req, res) => {
    const token = req.cookies.jwtToken; // Récupérer le token JWT depuis le cookie

    try {
        const decodedToken = jwt.verify(token, config.jwtSecret); // Décoder le token
        const userId = decodedToken.userId; // Récupérer l'ID de l'utilisateur du token

        const user = await User.findById(userId); // Trouver l'utilisateur par ID
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        // Vérifier si l'utilisateur du token est le même que l'utilisateur à supprimer
        if (user.id !== userId) {
            return res.status(403).json({message: 'Unauthorized'});
        }

        await User.deleteUser(user.id);

        return res.status(200).json({message: 'User deleted successfully'});
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
}