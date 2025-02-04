const express = require("express");
const authController = require("./auth.controller");

const router = express.Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.login);
router.get("/csrf", authController.generateCSRFToken);
router.get("/refresh-token", authController.refreshToken);

module.exports = router;
