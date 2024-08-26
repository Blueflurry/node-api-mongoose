const mongoose = require("mongoose");
const validationErrorsPlugin = require("./validation.plugin");
const logger = require("../utils/logger");

const connectDB = async () => {
    logger.info(`Database connection initiated.`);

    // register global plugins
    mongoose.plugin(validationErrorsPlugin);

    // Apply the global transformation for toJSON and toObject
    mongoose.set("toJSON", { virtuals: true });
    mongoose.set("toObject", { virtuals: true });

    await mongoose.connect(process.env.MONGO_URI);

    logger.success(`Database connection successful.`);
};

module.exports = connectDB;
