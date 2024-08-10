const { getDb } = require("../dbService");

const COLLECTION_NAME = "presentations";

const getAllPresentations = async () => {
    const db = await getDb();
    const presentations = await db.collection(COLLECTION_NAME).find({}).toArray();
    return presentations;
}

const createPresentation = async (presentation) => {
    const db = await getDb();
    const result = await db.collection(COLLECTION_NAME).insertOne(presentation);

    return {
        _id: result.insertedId,
        ...presentation
    }
}

const deletePresentation = async (title) => {
    const db = await getDb();
    const result = await db.collection(COLLECTION_NAME).deleteOne({ title });

    return Boolean(result.deletedCount);
}

const getPresentationByTitle = async (title) => {
    const db = await getDb();
    const presentation = await db.collection(COLLECTION_NAME).findOne({ title });
    return presentation;
}

const updatePresentation = async (title, updatedFields) => {
    const db = await getDb();
    const result = await db.collection(COLLECTION_NAME).updateOne(
        { title },
        {
            $set: {
                ...updatedFields
            }
        }
    );

    return Boolean(result.modifiedCount);
}

module.exports = {
    getAllPresentations,
    createPresentation,
    deletePresentation,
    getPresentationByTitle,
    updatePresentation,
}
