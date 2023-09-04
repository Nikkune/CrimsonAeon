const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../users/models/user.js');
const config = require('../../config.js');

exports.signup = async (req, res) => {
    const {username, email, password} = req.body;
    const id = crypto.randomUUID();
    const role = "user";

    // Vérifier si l'utilisateur existe déjà
    if (await User.findByEmail(email)) {
        return res.status(409).json({message: 'User already exists'});
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const newUser = new User(id, username, email, hashedPassword, role);

    // Enregistrer l'utilisateur dans la base de données
    await User.save(newUser);

    return res.status(201).json({message: 'User registered successfully'});
}

exports.login = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findByEmail(email);
    if (!user) {
        return res.status(401).json({message: 'Authentication failed'});
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({message: 'Authentication failed'});
    }

    // Créer un token JWT
    const token = jwt.sign(
        {userId: user.id, email: user.email, role: user.role},
        config.jwtSecret,
        {expiresIn: '30d'}
    );

    // Définir le cookie avec le jeton JWT
    res.cookie('jwtToken', token, {httpOnly: true});

    return res.status(200).json({message: 'Authentication successful'});
}