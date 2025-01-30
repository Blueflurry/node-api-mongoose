const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const financeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

/* Middleware to automatically populate relational fields

financeSchema.pre('find', function(next) {
    this.populate('key1');
    next();
});

financeSchema.pre('findOne', function(next) {
    this.populate(['key1', 'key2']);
    next();
});
*/

financeSchema.plugin(mongoosePaginate);
module.exports = financeSchema;