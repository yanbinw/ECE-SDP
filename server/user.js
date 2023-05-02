import { database } from "./connect.js";

class User {
    constructor() {
        this.database = database;
    }

    async init() {
        if (!this.database.init.connectionStatus) {
            try {
                await this.database.init.connect();
            }
            catch (error) {
                console.error(error);
            }
        }
    }
    
    async validateUser(username, password) {
        const data = await this.database.init.userTable_getUserByName(username);
        if (data.length === 0) {
            return "INVALID_USER";
        }

        const userData = data[0];
        if (userData.password !== password) {
            return "INVALID_PASSWORD";
        }

        return userData;
    }

    async addUser(username, email, password, role) {
        const usernameCheck = await this.database.init.userTable_getUserByName(username);
        if (usernameCheck.length === 0) {
            const emailCheck = await this.database.init.userTable_getUserByEmail(email);
            if (emailCheck.length === 0) {
                await this.database.init.userTable_addUser(username, email, password, role);
                return "SUCCESS";
            }
            return "REGISTERED_EMAIL";
        }
        return "REGISTERED_USER";
    }
}

const user = new User();
await user.init();

export { user };
