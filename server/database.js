import pg from "pg";

// Get the Pool class from the pg module.
const { Pool } = pg;

// https://www.thisdot.co/blog/connecting-to-postgresql-with-node-js
export class Database {
    constructor(database, user, password, port) {
        this.credentials = {
            user: user,
            host: "localhost",
            database: database,
            password: password,
            port: port
        };
    }

    async connect() {
        this.pool = new Pool(this.credentials);

        // Create the pool.
        this.client = await this.pool.connect();
    }
}
