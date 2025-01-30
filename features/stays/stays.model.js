const mongoose = require("mongoose");

const staysSchema = require("./stays.schema");

module.exports = mongoose.model(
    'Stays',
    staysSchema
);