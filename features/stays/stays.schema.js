const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const staysConfig = require("./stays.config");
const { toEnum } = require("../../utils/objects.utils");

const staysSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Business",
        },
        primaryImage: String,
        images: [String],
        location: {
            street: String,
            city: String,
            state: String,
            country: String,
            pincode: String,
            lat: String,
            long: String,
        },
        geography: {
            type: { type: String, default: "Point" }, // GeoJSON "Point" type
            coordinates: {
                type: [Number], // Array of numbers [longitude, latitude]
            },
        },
        stayType: {
            type: Number,
            enum: toEnum(staysConfig.staysTypes),
            default: staysConfig.staysTypes.villa.value,
        },
        amenities: [
            {
                type: Number,
                enum: toEnum(staysConfig.amenities),
            },
        ],
        attractions: [
            {
                type: Number,
                enum: toEnum(staysConfig.attractions),
            },
        ],
        calendar: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Calendars",
        },
        extCalendar: String,
        files: [String],
        capacity: {
            rooms: Number,
            livings: { type: Number, default: 1 },
            bathrooms: Number,
            balconies: Number,
            floors: Number,
            kitchens: Number,
        },
        constraints: {
            noStags: Boolean,
            hasRooftop: Boolean,
            hasLifts: Boolean,
            hasGroundFloor: Boolean,
        },
    },
    {
        timestamps: true,
    }
);

staysSchema.pre("find", function (next) {
    this.populate("owner");
    next();
});

staysSchema.pre("findOne", function (next) {
    this.populate(["owner"]);
    next();
});

staysSchema.virtual("address").get(function () {
    let address = "";
    if (this.location.street) address += this.location.street;
    if (this.location.city) address += ", " + this.location.city;
    if (this.location.state) address += ", " + this.location.state;
    if (this.location.country) address += ", " + this.location.country;
    if (this.location.pincode) address += ", " + this.location.pincode;

    return address;
});

staysSchema.plugin(mongoosePaginate);
module.exports = staysSchema;
