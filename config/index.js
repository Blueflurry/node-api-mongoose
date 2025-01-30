const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    mongoURI: process.env.MONGO_URI,
    port: process.env.PORT || 5000,
    debug: process.env.DEBUG === "true" || true,
    csrfSecret: process.env.CSRF_SECRET,
    cookieSecret: process.env.COOKIE_SECRET,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
};
