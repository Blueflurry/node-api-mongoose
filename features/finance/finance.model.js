const mongoose = require("mongoose");

const financeSchema = require("./finance.schema");

module.exports = mongoose.model(
    'Finance',
    financeSchema
);