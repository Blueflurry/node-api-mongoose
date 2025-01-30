const mongoose = require("mongoose");

const bookingsSchema = require("./bookings.schema");

module.exports = mongoose.model(
    'Bookings',
    bookingsSchema
);