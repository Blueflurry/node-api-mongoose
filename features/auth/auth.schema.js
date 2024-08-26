const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const authConfig = require("./auth.config");

const UserSchema = new mongoose.Schema({
    email: String,
    password: {
        type: String,
        required: true,
    },
    phone1: {
        type: String,
        required: true,
        unique: true,
    },
    dob: Date,
    name: {
        fist: { type: String, required: [true, "First name is required!"] },
        middle: String,
        last: String,
    },
    role: {
        type: Number,
        enum: authConfig.userRoles,
        default: authConfig.userRoles.user,
    },
    status: {
        type: Number,
        enum: authConfig.userStatus,
        default: authConfig.userRoles.user,
    },
});

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.virtual("fullName").get(function () {
    let fullName = this.name.first + " ";
    if (this.name.middle) fullName += this.name.middle + " ";
    if (this.name.last) fullName += this.name.last;

    return fullName;
});

// Ensure virtuals are included in toJSON output
UserSchema.set("toJSON", { getters: true });

module.exports = UserSchema;
