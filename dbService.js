const { MongoClient } = require("mongodb");

const CONN_STRING = "mongodb://root:example@localhost:27017/";
const DB_NAME = "TechnionProject";

let db;

const getDb = async () => {
    try {
        if (!db) {
            const client = new MongoClient(CONN_STRING);
            db = client.db(DB_NAME);

            console.log("MongoDB Connected");
        }

        return db;
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    getDb
}