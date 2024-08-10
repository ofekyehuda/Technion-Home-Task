const { z } = require("zod");

const createPresentationBodySchema = z.object({
    title: z.string(),
    authorsList: z.array(z.string()),
    dateOfPublishment: z.coerce.date()
})

const patchPresentationBodySchema = z.object({
    authorsList: z.array(z.string()),
})

module.exports = {
    createPresentationBodySchema,
    patchPresentationBodySchema
}