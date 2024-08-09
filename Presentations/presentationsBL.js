const PresentationsDAL = require("./presentationsDAL");

const updateAuthorList = async (title, authorsList) => {
    const updatedPresentation = await PresentationsDAL.updatePresentation(title, { authorsList });
    return updatedPresentation;
}

module.exports = {
    ...PresentationsDAL,
    updatePresentation: undefined,
    updateAuthorList,
}