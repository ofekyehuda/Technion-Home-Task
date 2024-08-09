const express = require("express");
const { StatusCodes } = require("http-status-codes");

const presentationsRouter = express.Router();
const PresentationsBL = require("./presentationsBL");
const { NotFoundError } = require("../customErrors");

// Get all presentations
presentationsRouter.get('/', async (req, res, next) => {
    try {
        const allPresentations = await PresentationsBL.getAllPresentations();
        res.status(StatusCodes.OK).json(allPresentations);
    } catch (err) {
        next(err);
    }
});

// Creating a new presentation
presentationsRouter.post('/', async (req, res, next) => {
    try {
        const presentation = {
            title: req.body.title,
            authorsList: req.body.authorsList,
            dateOfPublishment: new Date(req.body.dateOfPublishment)
        };

        const newPresentation = await PresentationsBL.createPresentation(presentation);
        res.status(StatusCodes.OK).json(newPresentation);
    } catch (err) {
        next(err);
    }
});

// Deleting a presentation by its title
presentationsRouter.delete('/:title', async (req, res, next) => {
    try {
        const isDeleted = await PresentationsBL.deletePresentation(req.params.title);

        if (!isDeleted) {
            throw new NotFoundError("Failed to delete presentation since one with this title was not found", {
                title: req.params.title
            });
        }

        res.status(StatusCodes.OK).send(isDeleted);
    }
    catch (err) {
        next(err);
    }
});

// Fetching a Presentation by title 
presentationsRouter.get('/:title', async (req, res, next) => {
    try {
        const presentation = await PresentationsBL.getPresentationByTitle(req.params.title);

        if (!presentation) {
            throw new NotFoundError("Failed to get presentation since one with this title was not found", {
                title: req.params.title
            });
        }

        res.status(StatusCodes.OK).send(presentation);
    } catch (err) {
        next(err);
    }
});

// Altering the Authors List
presentationsRouter.patch('/:title', async (req, res, next) => {
    try {
        const updatedPresentation = await PresentationsBL.updateAuthorList(req.params.title, req.body.authorsList);
        res.status(StatusCodes.OK).send(updatedPresentation);
    }
    catch (err) {
        next(err);
    }
});

module.exports = {
    presentationsRouter
}