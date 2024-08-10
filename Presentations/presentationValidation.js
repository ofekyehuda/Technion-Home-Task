const { z } = require("zod");

const createPresentationBodySchema = z.object({
    title: z.string(),
    authorsList: z.array(z.string()),
    dateOfPublishment: z.coerce.date()
}).strict();

const patchPresentationBodySchema = z.object({
    authorsList: z.array(z.string()),
}).strict();

module.exports = {
    createPresentationBodySchema,
    patchPresentationBodySchema
}