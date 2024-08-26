const logger = require("../utils/logger");

const logTime = (req, res, next) => {
    const startTime = new Date().getTime();

    logger.info(`${req.method} ${req.url} [${req.ip} ${req.get("User-Agent")}] requesting`);

    res.on("finish", () => {
        const endTime = new Date().getTime();
        logger.info(`${req.method} ${req.url} [${req.ip} ${req.get("User-Agent")}] finished (${endTime - startTime}ms).`);
    });

    next();
};

module.exports = logTime;
