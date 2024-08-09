let presentaions = [];

const getAllPresentations = async () => {
    return presentaions;
}

const createPresentation = async (presentation) => {
    presentaions.push(presentation);
    return presentation;
}

const deletePresentation = async (title) => {
    const presentationsCount = presentaions.length;
    presentaions = presentaions.filter(p => p.title != title);
    return Boolean(presentationsCount - presentaions.length);
}

const getPresentationByTitle = async (title) => {
    const presentation = presentaions.find(p => p.title == title);
    return presentation;
}

const updatePresentation = async (title, updatedFields) => {
    const index = presentaions.findIndex(p => p.title == title);
    presentaions[index] = {
        ...presentaions[index],
        ...updatedFields
    };
    return presentaions[index];
}

module.exports = {
    getAllPresentations,
    createPresentation,
    deletePresentation,
    getPresentationByTitle,
    updatePresentation,
}
