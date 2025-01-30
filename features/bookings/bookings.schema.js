const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const bookingsConfig = require("./bookings.config");
const { toEnum } = require("../../utils/objects.utils");

const bookingsSchema = new mongoose.Schema(
    {
        dates: {
            from: Date,
            to: Date,
        },
        selectedStays: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Stays",
            },
        ],
        guests: {
            men: Number,
            women: Number,
            children: Number,
            pets: Number,
        },
        amenities: [],
        attractions: [],
        proposedStays: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Stays",
            },
        ],
        searchPrompt: String,
        contact: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: Number,
            enum: toEnum(bookingsConfig.bookingsStatus),
            default: bookingsConfig.bookingsStatus.active.value,
        },
        payments: [
            {
                amount: Number,
                source: {
                    type: Number,
                    enum: toEnum(bookingsConfig.paymentSources),
                    default: bookingsConfig.paymentSources.upi.value,
                },
                meta: Object,
                date: Date,
            },
        ],
        price: {
            base: Number,
            total: Number,
            markup: Number,
            comission: Number,
        },
    },
    {
        timestamps: true,
    }
);

/* Middleware to automatically populate relational fields

bookingsSchema.pre('find', function(next) {
    this.populate('key1');
    next();
});

bookingsSchema.pre('findOne', function(next) {
    this.populate(['key1', 'key2']);
    next();
});
*/

bookingsSchema.plugin(mongoosePaginate);
module.exports = bookingsSchema;
