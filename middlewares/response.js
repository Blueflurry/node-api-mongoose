const { HttpError } = require("../utils/error.model");

// Success Response Middleware
const successResponse = (req, res, next) => {
    res.success = (data, statusCode = 200, message) => {
        res.status(statusCode).json({ status: "success", data, message });
    };
    next();
};

// Error Response Middleware
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    if (err instanceof HttpError) statusCode = err.statusCode;
    res.status(statusCode).json({
        status: "error",
        message: err.message,
        details: err.details || null,
    });
};

module.exports = { successResponse, errorHandler };
