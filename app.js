const express = require("express");
const cookieParser = require("cookie-parser");

const logger = require("./utils/logger");
const connectDB = require("./database");
const { addResponseHandlers, errorHandler } = require("./middlewares/response");
const logTime = require("./middlewares/logTime");
const { csrfMiddleware } = require("./middlewares/csrf");
const { port, cookieSecret } = require("./config");

const runServer = async () => {
    try {
        logger.info("Server initiated");

        const app = express();

        await connectDB();

        app.use(express.json());
        app.use(cookieParser(cookieSecret));
        app.use(logTime);
        app.use(addResponseHandlers); // Apply success response middleware
        app.use(csrfMiddleware); // Apply CSRF middleware to routes that need protection
        app.use("/api", require("./routes")); // Routes are required here so that the code in routes/index.js runs after db connection
        app.use(errorHandler); // Apply error handler middleware

        app.listen(port, () => logger.success(`Server successfully running on port ${port}`));
    } catch (error) {
        logger.warn(`Server failed`);
        logger.error(error);
        process.exit(0); // Graceful exit on error
    }
};

runServer();
