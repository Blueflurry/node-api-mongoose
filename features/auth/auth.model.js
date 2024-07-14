const mongoose = require("mongoose");

const UserSchema = require("./auth.schema");

module.exports = mongoose.model("User", UserSchema);
