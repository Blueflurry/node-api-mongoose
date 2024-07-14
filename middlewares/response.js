// Success Response Middleware
const successResponse = (req, res, next) => {
    res.success = (data, statusCode = 200) => {
        res.status(statusCode).json({
            status: "success",
            data: data,
        });
    };
    next();
};

// Error Response Middleware
const errorHandler = (err, req, res, next) => {
    console.error(err);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        status: "error",
        message: err.message,
        details: err.details || null,
    });
};

module.exports = { successResponse, errorHandler };
