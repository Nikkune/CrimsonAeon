const editJsonFile = require("edit-json-file");
const config = require("../../config.js");

class User {
    constructor(id, username, email, password, role) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    static async findById(id) {
        const usersData = await readUsersData();
        if (!Array.isArray(usersData)) {
            // Gérer le cas où les données ne sont pas un tableau
            return null;
        }
        return usersData.find(user => user.id === id);
    }

    static async findByEmail(email) {
        const usersData = await readUsersData();
        if (!Array.isArray(usersData)) {
            // Gérer le cas où les données ne sont pas un tableau
            return null;
        }
        return usersData.find(user => user.email === email);
    }

    static async deleteUser(id) {
        const usersData = await readUsersData();
        const userIndex = usersData.findIndex(user => user.id === id);
        if (userIndex !== -1) {
            usersData.splice(userIndex, 1);
            await writeUsersData(usersData);
        }
    }

    static async save(newUser) {
        let usersData = await readUsersData();
        if (!Array.isArray(usersData)) {
            usersData = [];
        }
        usersData.push(newUser);
        await writeUsersData(usersData);
    }
}

async function readUsersData() {
    const file = editJsonFile(config.database.usersPath);
    return file.get("db");
}

async function writeUsersData(data) {
    const file = editJsonFile(config.database.usersPath);
    file.set("db", data);
    file.save();
}

module.exports = User;