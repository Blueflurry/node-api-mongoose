const express = require("express");
const connectDB = require("./config/db");
const { successResponse, errorHandler } = require("./middlewares/response");

const app = express();
const { port } = require("./config");

connectDB();

app.use(express.json());
app.use(successResponse); // Apply success response middleware
app.use("/api", require("./routes")); // Routes are required here so that the code in routes/index.js runs after db connection
app.use(errorHandler); // Apply error handler middleware

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
