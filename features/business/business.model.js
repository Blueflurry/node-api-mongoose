const mongoose = require("mongoose");

const businessSchema = require("./business.schema");

module.exports = mongoose.model(
    'Business',
    businessSchema
);