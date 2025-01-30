const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const businessConfig = require("./business.config");
const { toEnum } = require("../../utils/objects.utils");

const businessSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        logo: String,
        businessType: {
            type: Number,
            enum: toEnum(businessConfig.businessType),
            default: businessConfig.businessType.stay.value,
        },
        status: {
            type: Number,
            enum: toEnum(businessConfig.businessStatus),
            default: businessConfig.businessStatus.active.value,
        },
        earningMode: {
            type: Number,
            enum: toEnum(businessConfig.earningMode),
            default: businessConfig.earningMode.comission.value,
        },
        defaultEarningValue: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

/* Middleware to automatically populate relational fields

businessSchema.pre('find', function(next) {
    this.populate('key1');
    next();
});

businessSchema.pre('findOne', function(next) {
    this.populate(['key1', 'key2']);
    next();
});
*/

businessSchema.plugin(mongoosePaginate);
module.exports = businessSchema;
