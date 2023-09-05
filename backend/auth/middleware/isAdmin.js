const jwt = require('jsonwebtoken');
const config = require('../../config.js');

const isAdmin = (req, res, next) => {
    const token = req.cookies.jwtToken;

    // Vérifier si le token existe
    if (!token) {
        return res.status(401).json({message: 'Unauthorized'});
    }

    try {
        // Vérifier la validité du token et extraire les données
        const decodedToken = jwt.verify(token, config.jwtSecret);

        // Vérifier si l'utilisateur a le rôle d'admin
        if (decodedToken.role !== 'admin') {
            return res.status(403).json({message: 'Forbidden'});
        }

        // Passer au middleware suivant
        return next();
    } catch (error) {
        return res.status(401).json({message: 'Unauthorized'});
    }
};

module.exports = isAdmin;
