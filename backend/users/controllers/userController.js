const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const config = require('../../config.js');

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