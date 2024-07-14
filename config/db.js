const mongoose = require("mongoose");

const connectDB = () => {
    try {
        process.stdout.write(`Connecting to database ... `);
        mongoose.connect(process.env.MONGO_URI);
        console.log("success!");
    } catch (err) {
        console.log("error!");
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
