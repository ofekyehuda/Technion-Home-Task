const { getPresentationByTitle } = require("../Presentations/presentationsDAL");
const { NotFoundError, BadRequestError } = require("../customErrors");
const { getDb, COLLECTIONS } = require("../dbService");

const createSlide = async (slide) => {
    const presentation = await getPresentationByTitle(slide.presentationTitle);

    if (!presentation) {
        throw new BadRequestError("Cant create slide since its presentationTitle doesn't exist", {
            presentationTitle: slide.presentationTitle
        });
    }

    const db = await getDb();

    try {
        const result = await db.collection(COLLECTIONS.SLIDES).insertOne(slide);
    
        return {
            _id: result.insertedId,
            ...slide
        }
    } catch (err) {
        throw new BadRequestError("The combination of 'presentationTitle' and 'index' fields must be unique", { 
            presentationTitle: slide.presentationTitle, 
            index: slide.index 
        });
    }
}

const deleteSlide = async (presentationTitle, index) => {
    const db = await getDb();
    const result = await db.collection(COLLECTIONS.SLIDES).deleteOne({ presentationTitle, index });

    return Boolean(result.deletedCount);
}

const updateSlide = async (presentationTitle, index, updatedFields) => {
    const db = await getDb();
    const result = await db.collection(COLLECTIONS.SLIDES).updateOne(
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
