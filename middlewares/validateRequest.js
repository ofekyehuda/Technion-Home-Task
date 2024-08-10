const { z } = require("zod");
const { BadRequestError } = require("../customErrors");

const validateRequest = (zodSchema) => {
    return (req, res, next) => {
        const result = zodSchema.safeParse(req.body);

        if (!result.success) {
            next(new BadRequestError(
                "Bad Request: the request's body did not match the expected schema",
                result.error.flatten().fieldErrors,
            ));
        } else {
            req.body = result.data;
            next();
        }
    }
}

module.exports = {
    validateRequest
}