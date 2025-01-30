const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const calendarsConfig = require("./calendars.config");
const { toEnum } = require("../../utils/objects.utils");

const calendarsSchema = new mongoose.Schema(
    {
        stay: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Stays",
            required: true,
        },
        basePrice: {
            type: Number,
            required: true,
        },
        bookedDates: [
            {
                from: {
                    type: Number,
                    required: true,
                },
                to: {
                    type: Number,
                    required: true,
                },
                bookingId: mongoose.Schema.Types.ObjectId,
                source: {
                    type: Number,
                    enum: toEnum(calendarsConfig.sources),
                    default: calendarsConfig.sources.oneclickstays.value,
                },
            },
        ],
        updatedDates: [
            {
                from: {
                    type: Number,
                    required: true,
                },
                to: {
                    type: Number,
                    required: true,
                },
                newPrice: {
                    type: Number,
                    required: true,
                },
                reason: {
                    type: Number,
                    enum: toEnum(calendarsConfig.priceUpdateReasons),
                    default: calendarsConfig.priceUpdateReasons.festival.value,
                },
                changePercentage: {
                    type: Number,
                    required: true,
                },
            },
        ],
        month: {
            type: Number,
            required: true,
            min: 1,
            max: 12,
        },
        year: {
            type: Number,
            required: true,
            min: new Date().getFullYear(),
        },
    },
    {
        timestamps: true,
    }
);

/* Middleware to automatically populate relational fields

calendarsSchema.pre('find', function(next) {
    this.populate('key1');
    next();
});

calendarsSchema.pre('findOne', function(next) {
    this.populate(['key1', 'key2']);
    next();
});
*/

calendarsSchema.plugin(mongoosePaginate);
module.exports = calendarsSchema;
