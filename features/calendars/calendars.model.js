const mongoose = require("mongoose");

const calendarsSchema = require("./calendars.schema");

module.exports = mongoose.model(
    'Calendars',
    calendarsSchema
);