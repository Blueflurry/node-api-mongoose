const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const jobsSchema = new mongoose.Schema({
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

jobsSchema.pre('find', function(next) {
    this.populate('key1');
    next();
});

jobsSchema.pre('findOne', function(next) {
    this.populate(['key1', 'key2']);
    next();
});
*/

jobsSchema.plugin(mongoosePaginate);
module.exports = jobsSchema;