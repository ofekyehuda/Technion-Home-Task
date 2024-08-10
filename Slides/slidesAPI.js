const express = require("express");
const slidesRouter = express.Router({ mergeParams: true });
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../customErrors");
const { validateRequest } = require("../middlewares/validateRequest");
const {
    alteringSlideBodySchema,
    createSlideBodySchema
} = require("./slideValidation")

const SlidesBL = require("./slidesBL");

// Creating a slide
slidesRouter.post('/',
    validateRequest(createSlideBodySchema),
    async (req, res, next) => {
        try {
            const slide = await SlidesBL.createSlide(req.params.presentationTitle, req.body);
            res.status(StatusCodes.OK).json(slide);
        } catch (err) {
            next(err);
        }
    })

// Deleting a slide by its index
slidesRouter.delete('/:index', async (req, res, next) => {
    try {
        const isDeleted = await SlidesBL.deleteSlide(
            req.params.presentationTitle, 
            parseInt(req.params.index)
        );

        if (!isDeleted) {
            throw new NotFoundError("Failed to delete slide since one with this title was not found", {
                title: req.params.presentationTitle,
                index: req.params.index
            });
        }

        res.status(StatusCodes.OK).send(isDeleted)
    } catch (err) {
        next(err);
    }
})

// Altering a Slide 
slidesRouter.put('/:index',
    validateRequest(alteringSlideBodySchema),
    async (req, res, next) => {
        try {
            const slide = await SlidesBL.updateSlide(
                req.params.presentationTitle, 
                parseInt(req.params.index), 
                req.body
            );

            res.status(StatusCodes.OK).send(slide)

        } catch (err) {
            next(err);
        }
    })

module.exports = {
    slidesRouter
}