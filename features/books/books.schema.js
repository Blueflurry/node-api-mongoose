const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const booksSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

booksSchema.pre("find", function () {
    this.populate("author");
});

booksSchema.pre("findOne", function () {
    this.populate("author");
});

booksSchema.plugin(mongoosePaginate);
module.exports = booksSchema;
