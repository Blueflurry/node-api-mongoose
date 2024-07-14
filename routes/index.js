const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Automatically load feature routes
const featuresPath = path.join(__dirname, "../features");
fs.readdirSync(featuresPath).forEach((feature) => {
    process.stdout.write(`Loading feature: ${feature} ... `);
    const featureRoutes = path.join(
        featuresPath,
        feature,
        `${feature}.routes.js`
    );
    if (fs.existsSync(featureRoutes)) {
        router.use(`/${feature}`, require(featureRoutes));
        console.log("success!");
    }
});

module.exports = router;
