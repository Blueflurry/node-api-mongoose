const mongoose = require("mongoose");

const jobsSchema = require("./jobs.schema");

module.exports = mongoose.model(
    'Jobs',
    jobsSchema
);