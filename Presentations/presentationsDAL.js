const { BadRequestError } = require("../customErrors");
const { getDb, COLLECTIONS } = require("../dbService");

const getAllPresentations = async () => {
    const db = await getDb();
    const presentations = await db.collection(COLLECTIONS.PRESENTATIONS).find({}).toArray();
    return presentations;
}

const createPresentation = async (presentation) => {
    const db = await getDb();
    
    try {
        const result = await db.collection(COLLECTIONS.PRESENTATIONS).insertOne(presentation);
    
        return {
            _id: result.insertedId,
            ...presentation
        }
    } catch (err) {
        throw new BadRequestError("The 'title' field must be unique", { title: presentation.title });
    }
}

const deletePresentation = async (title) => {
    const db = await getDb();
    const result = await db.collection(COLLECTIONS.PRESENTATIONS).deleteOne({ title });

    return Boolean(result.deletedCount);
}

const getPresentationByTitle = async (title) => {
    const db = await getDb();
    const presentation = await db.collection(COLLECTIONS.PRESENTATIONS).findOne({ title });
    return presentation;
}

const updatePresentation = async (title, updatedFields) => {
    const db = await getDb();
    const result = await db.collection(COLLECTIONS.PRESENTATIONS).updateOne(
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
