const { z } = require("zod");

const createSlideBodySchema = z.object({
    "content": z.string(),
    "index": z.number()
});

const alteringSlideBodySchema = z.object({
    content: z.string()
});

module.exports = {
    createSlideBodySchema,
    alteringSlideBodySchema
}