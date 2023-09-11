const editJsonFile = require("edit-json-file");
const config = require("../../config.js");

class User {
    constructor(id, username, email, password, role, mode, lang, contacts, notifications) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.mode = mode;
        this.lang = lang;
        this.contacts = contacts;
        this.notifications = notifications;
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

    static async getNotifications(userId) {
        const user = await this.findById(userId);
        if (user) {
            return user.notifications;
        } else {
            return [];
        }
    }

    static async getContacts(userId) {
        const user = await this.findById(userId);
        if (user) {
            return user.contacts;
        } else {
            return [];
        }
    }

    static async addNotification(userId, notification) {
        const usersData = await readUsersData();
        const user = usersData.find(user => user.id === userId);
        if (user) {
            user.notifications.push(notification);
            await writeUsersData(usersData);
        }
    }

    static async deleteNotification(userId, notificationId) {
        const usersData = await readUsersData();
        const user = usersData.find(user => user.id === userId);
        if (user) {
            const notificationIndex = user.notifications.findIndex(notification => notification.id === notificationId);
            if (notificationIndex !== -1) {
                user.notifications.splice(notificationIndex, 1);
                await writeUsersData(usersData);
            }
        }
    }

    static async toggleMode(userId) {
        const usersData = await readUsersData();
        const user = usersData.find(user => user.id === userId);
        if (user) {
            user.mode = user.mode === "dark" ? "light" : "dark";
            await writeUsersData(usersData);
        }
    }

    static async updateLang(userId, newLang) {
        const usersData = await readUsersData();
        const user = usersData.find(user => user.id === userId);
        if (user) {
            user.lang = newLang;
            await writeUsersData(usersData);
        }
    }

    static async addContact(userId, contact) {
        const usersData = await readUsersData();
        const user = usersData.find(user => user.id === userId);
        if (user) {
            user.contacts.push(contact);
            await writeUsersData(usersData);
        }
    }

    static async deleteContact(userId, contactId) {
        const usersData = await readUsersData();
        const user = usersData.find(user => user.id === userId);
        if (user) {
            const contactIndex = user.contacts.findIndex(contact => contact.id === contactId);
            if (contactIndex !== -1) {
                user.contacts.splice(contactIndex, 1);
                await writeUsersData(usersData);
            }
        }
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