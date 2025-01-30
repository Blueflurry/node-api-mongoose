const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const authConfig = require("./auth.config");
const { toEnum } = require("../../utils/objects.utils");

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: {
        first: { type: String, required: [true, "First name is required!"] },
        middle: String,
        last: String,
    },
    role: {
        type: Number,
        enum: toEnum(authConfig.userRoles),
        default: authConfig.userRoles.user.value,
    },
    status: {
        type: Number,
        enum: toEnum(authConfig.userStatus),
        default: authConfig.userStatus.active.value,
    },
    phone: {
        type: String,
        match: [/^\d{10}$/, "Please provide a valid 10-digit phone number"],
        required: [true, "Phone number is required!"],
    },
    countryCode: {
        type: String,
        match: [/^\+?\d{1,4}$/, "Please provide a valid country code (1 to 4 digits)"],
        required: [true, "Country code is required!"],
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
