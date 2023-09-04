const jwt = require('jsonwebtoken');
const config = require('../../config.js');

const isAuthenticated = (req, res, next) => {
    const token = req.cookies.jwtToken;

    // Vérifier si le token existe
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // Vérifier la validité du token et extraire les données
        const decodedToken = jwt.verify(token, config.jwtSecret);

        // Ajouter les données du token à l'objet de demande pour une utilisation ultérieure
        req.userData = decodedToken;

        // Passer au middleware suivant
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = isAuthenticated;