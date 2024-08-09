const express = require("express");

const presentationsRouter = express.Router();
const PresentationsBL = require("./presentationsBL");

// Get all presentations
presentationsRouter.get('/', async (req, res) => {
    const allPresentations = await PresentationsBL.getAllPresentations();
    res.json(allPresentations);
});

// Creating a new presentation
presentationsRouter.post('/', async (req, res) => {
    const presentation = {
        title: req.body.title,
        authorsList: req.body.authorsList,
        dateOfPublishment: new Date(req.body.dateOfPublishment)
    };

    const newPresentation = await PresentationsBL.createPresentation(presentation);
    res.json(newPresentation);
});

// Deleting a presentation by its title
presentationsRouter.delete('/:title', async (req, res) => {
    const isDeleted = await PresentationsBL.deletePresentation(req.params.title);
    res.send(isDeleted);
});

// Fetching a Presentation by title 
presentationsRouter.get('/:title', async (req, res) => {
    const presentation = await PresentationsBL.getPresentationByTitle(req.params.title);
    res.send(presentation);
});

// Altering the Authors List
presentationsRouter.patch('/:title', async (req, res) => {
    const updatedPresentation = await PresentationsBL.updateAuthorList(req.params.title, req.body.authorsList);
    res.send(updatedPresentation);
});

module.exports = {
    presentationsRouter
}