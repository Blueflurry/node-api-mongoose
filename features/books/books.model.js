const mongoose = require("mongoose");

const booksSchema = require("./books.schema");

module.exports = mongoose.model("Books", booksSchema);
