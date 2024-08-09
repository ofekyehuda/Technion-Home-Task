const SlidesDAL = require("./slidesDAL");

const createSlide = async (presentationTitle, slide) => {
    slide.presentationTitle = presentationTitle;
    const newSlide = await SlidesDAL.createSlide(slide)
    return newSlide
}

module.exports = {
    ...SlidesDAL,
    createSlide
}
