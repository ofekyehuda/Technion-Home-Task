const { z } = require("zod");

const createSlideBodySchema = z.object({
    content: z.string(),
    index: z.number()
}).strict();

const alteringSlideBodySchema = z.object({
    content: z.string()
}).strict();

module.exports = {
    createSlideBodySchema,
    alteringSlideBodySchema
}