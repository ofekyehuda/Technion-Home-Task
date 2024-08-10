const { MongoClient } = require("mongodb");

const CONN_STRING = "mongodb://root:example@localhost:27017/";
const DB_NAME = "TechnionProject";
const COLLECTIONS = {
    PRESENTATIONS: "presentations",
    SLIDES: "slides"
}

let db;

const getDb = async () => {
    try {
        if (!db) {
            db = await createDb();
        }

        return db;
    } catch (err) {
        console.error(err);
    }
}

const createDb = async () => {
    const client = new MongoClient(CONN_STRING);
    const newDb = client.db(DB_NAME);

    // Create unique indexes to enforce it for presentations by title, and for slides by the combination of presentationTitle and index
    await newDb.collection(COLLECTIONS.PRESENTATIONS).createIndex({ title: 1 }, { unique: true });
    await newDb.collection(COLLECTIONS.SLIDES).createIndex({ presentationTitle: 1, index: 1 }, { unique: true });

    console.log("MongoDB Connected");

    return newDb;
}

module.exports = {
    getDb,
    COLLECTIONS
}