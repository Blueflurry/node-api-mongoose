const csrf = require("csrf");
const config = require("../../config");

const BaseController = require("../../utils/base.controller");
const AuthService = require("./auth.service");

class AuthController extends BaseController {
    constructor() {
        super(AuthService);
    }

    register = async (req, res, next) => {
        try {
            const user = await this.service.register(req.body);
            const accessToken = this.service.generateAccessToken(user);
            const refreshToken = this.service.generateRefreshToken(user);
            res.cookie("jwt", refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: "Strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            res.success({ id: user.id, accessToken }, 201, "User created successfully");
        } catch (err) {
            res.error(err, 500, err.message);
        }
    };

    login = async (req, res, next) => {
        try {
            const { username, password } = req.body;
            const { user, accessToken, refreshToken } = await this.service.login(username, password);
            res.cookie("jwt", refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: "Strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            res.success({ id: user.id, accessToken }, 200, "User logged in successfully");
        } catch (err) {
            res.error(err, 401, "Invalid credentials.");
        }
    };

    generateCSRFToken = async (req, res, next) => {
        try {
            // config.csrfSecret
            const tokens = new csrf();
            const csrfToken = tokens.create(config.csrfSecret); // Generate CSRF token
            const csrfTokenExpiry = 60 * 60 * 1000;
            res.cookie("csrf", csrfToken, {
                httpOnly: true,
                secure: false,
                sameSite: "Strict",
                maxAge: csrfTokenExpiry,
            });
            res.success({ csrfTokenExpiry }, 200, "Token generated successfully"); // Send the token in the response body
        } catch (err) {
            res.error(err, 500, err.message);
        }
    };

    refreshToken = async (req, res, next) => {
        try {
            if (!req.cookies?.jwt) throw new Error("No refresh token found");
            const refreshToken = req.cookies.jwt;
            const decoded = jwt.verify(refreshToken, config.refreshTokenSecret);
            const accessToken = this.service.generateAccessToken({ _id: decoded.id });
            res.success({ accessToken }, 200, "Token generated successfully");
        } catch (err) {
            res.error(err, 403, "Forbidden");
        }
    };
}

module.exports = new AuthController();
