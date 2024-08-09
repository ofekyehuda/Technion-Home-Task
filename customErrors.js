class CustomError extends Error {
    data;

    constructor(message, data) {
        super(message);
        this.data = data;
    }
}
class BadRequestError extends CustomError {};
class NotFoundError extends CustomError {};

module.exports = {
    BadRequestError,
    NotFoundError
}