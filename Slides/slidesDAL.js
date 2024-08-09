const { NotFoundError } = require("../customErrors");

let slides = [];

const createSlide = async (slide) => {
    slides.push(slide);
    return slide;
}

const deleteSlide = async (presentationTitle, index) => {
    const slidesCount = slides.length;
    slides = slides.filter(s => (s.presentationTitle != presentationTitle && s.index != index));
    return Boolean(slidesCount - slides.length);
}

const updateSlide = async (presentationTitle, index, updatedFields) => {
    const arrIndex = slides.findIndex(s => (s.presentationTitle == presentationTitle && s.index == index));

    if (arrIndex == -1) {
        throw new NotFoundError("Failed to update slide since one with this presentationTitle and index was not found", {
            presentationTitle,
            index
        });
    }

    slides[arrIndex] = {
        ...slides[arrIndex],
        ...updatedFields
    };

    return slides[arrIndex]
}

module.exports = {
    createSlide,
    deleteSlide,
    updateSlide
}
