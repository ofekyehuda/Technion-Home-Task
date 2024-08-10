const { NotFoundError } = require("../customErrors");
const { getDb } = require("../dbService");

const COLLECTION_NAME = "slides";

const createSlide = async (slide) => {
    const db = await getDb();
    const result = await db.collection(COLLECTION_NAME).insertOne(slide);

    return {
        _id: result.insertedId,
        ...slide
    }
}

const deleteSlide = async (presentationTitle, index) => {
    const db = await getDb();
    const result = await db.collection(COLLECTION_NAME).deleteOne({ presentationTitle, index });

    return Boolean(result.deletedCount);
}

const updateSlide = async (presentationTitle, index, updatedFields) => {
    const db = await getDb();
    const result = await db.collection(COLLECTION_NAME).updateOne(
        { presentationTitle, index },
        {
            $set: {
                ...updatedFields
            }
        }
    );

    return Boolean(result.modifiedCount);
}

module.exports = {
    createSlide,
    deleteSlide,
    updateSlide
}
