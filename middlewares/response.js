const { debug } = require("../config");
const { HttpError } = require("../utils/error.model");
const logger = require("../utils/logger");

// Success Response Middleware
const successResponse = (req, res, next) => {
    res.success = (data, statusCode = 200, message) => {
        res.status(statusCode).json({ status: "success", data, message });
    };
    next();
};

// Error Response Middleware
const errorHandler = (err, req, res, next) => {
    logger.error(err);

    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    if (err.statusCode) statusCode = err.statusCode;

    const response = { status: "error", message: err.message };

    if (debug) response.error = err.stack;

    res.status(statusCode).json(response);
};

module.exports = { successResponse, errorHandler };
