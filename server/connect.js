import { Database } from "./database.js";

import "dotenv/config";

// TODO: move to .env, ignore before commit
const credentials = {
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    host: process.env.DB_HOST,
};

const db = new Database(credentials);
const database = { init: db }

export { database };
