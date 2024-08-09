const express = require("express");
const slidesRouter = express.Router({ mergeParams: true })

const SlidesBL = require("./slidesBL");

// Creating a slide
slidesRouter.post('/', async (req, res) => {
    const slide = await SlidesBL.createSlide(req.params.presentationTitle, req.body);
    res.json(slide);
})

// Deleting a slide by its index
slidesRouter.delete('/:index', async (req, res) => {
    const isDeleted = await SlidesBL.deleteSlide(req.params.presentationTitle, req.params.index)
    res.send(isDeleted)
})

// Altering a Slide 
slidesRouter.put('/:index', async (req, res) => {
    const slide = await SlidesBL.updateSlide(req.params.presentationTitle, req.params.index, req.body)

    res.send(slide)
})

module.exports = {
    slidesRouter
}