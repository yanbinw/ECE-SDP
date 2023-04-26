import pg from "pg";
import "dotenv/config";

// get the Pool class from the pg module
const { Pool } = pg;

export class Database {
    constructor(credentials) {
        this.connectionStatus = false;

        const pool = Object.values(credentials).includes(undefined) ? undefined : new Pool(credentials);
        this.getPool = (dbToken) => dbToken === process.env.DB_TOKEN ? pool : undefined;
    }

    async connect() {
        // create the pool
        try {
            this.client = await this.getPool(process.env.DB_TOKEN).connect();
            this.connectionStatus = true;
            console.log("Database Successfully Connected!");
        }
        catch (error) {
            console.error(error);
        }
    }

    async userTable_initialize() {
        const queryText = `
            CREATE TABLE IF NOT EXISTS userTable (
                username VARCHAR(30) PRIMARY KEY,
                email TEXT NOT NULL UNIQUE,
                password VARCHAR(30) NOT NULL,
                role VARCHAR(30) NOT NULL
            );
        `;
        await this.client.query(queryText);
    }

    async userTable_findUser(name) {
        try {
            const queryText = `SELECT * FROM userTable WHERE name = '${name}';`;
            const res = await this.client.query(queryText);
            return res.rows;
        }
        catch (error) {
            return [];
        }
    }

    async itemTable_initialize() {
        const queryText = `
            CREATE TABLE IF NOT EXISTS itemTable (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100),
                binid VARCHAR(8),
                datasheet TEXT,
                image TEXT,
                description TEXT
            );
        `;
        await this.client.query(queryText);
    }

    async itemTable_findItem(name) {
        try {
            const queryText = `SELECT * FROM itemTable WHERE name = '${name}';`;
            const res = await this.client.query(queryText);
            return res.rows;
        }
        catch (error) {
            return [];
        }
    }

    async categoryTable_initialize() {
        const queryText = `
            CREATE TABLE IF NOT EXISTS categoryTable (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100)
            );
        `;
        await this.client.query(queryText);
    }

    async categoryTable_getAllName() {
        try {
            const queryText = `SELECT name FROM categorytable;`;
            const res = await this.client.query(queryText);
            return res.rows;
        }
        catch (error) {
            return [];
        }
    }

    // JOIN

    async getItemByCategory(category) {
        try {
            const queryText = `
                SELECT item.name 
                FROM itemTable AS item 
                JOIN itemCategory AS ic ON item.id = ic.itemid 
                JOIN categoryTable AS category ON category.id = ic.categoryid 
                WHERE category.name = '${category}';
            `;
            const res = await this.client.query(queryText);
            return res.rows;
        }
        catch (error) {
            return [];
        }
    }
}
