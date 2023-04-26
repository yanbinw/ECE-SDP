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
        const data = await this.database.init.userTable_findUser(username);
        if (data.length === 0) {
            return "INVALID_USER";
        }

        const userData = data[0];
        if (userData.password !== password) {
            return "INVALID_PASSWORD";
        }

        return userData;
    }

    addUser(username, email, password, role) {}
}

const user = new User();
await user.init();

export { user };
