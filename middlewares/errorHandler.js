const { BadRequestError, NotFoundError } = require("../customErrors");
const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
    console.error(err);
    
    if (err instanceof BadRequestError) {
        return res.status(StatusCodes.BAD_REQUEST).json(err.data);
    } else if (err instanceof NotFoundError) {
        return res.status(StatusCodes.NOT_FOUND).json(err.data);
    } else {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(
            "There was an error while handling your request"
        );
    }
}

module.exports = {
    errorHandler
}