class User {
    constructor(id, username, email, passwordHash) {
        this.id = id; // Identifiant unique de l'utilisateur
        this.username = username; // Nom d'utilisateur
        this.email = email; // Adresse e-mail de l'utilisateur
        this.passwordHash = passwordHash; // Hash du mot de passe de l'utilisateur
    }
}

module.exports = User;