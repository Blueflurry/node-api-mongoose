const BaseController = require("../../utils/base.controller");
const AuthService = require("./auth.service");
const jwt = require("jsonwebtoken");

class AuthController extends BaseController {
    constructor() {
        super(AuthService);
    }

    registerUser = async (req, res, next) => {
        try {
            const { user, workspace, auth } = await this.service.registerUser(req.body);
            const _user = this.service.createUser(user, workspace, auth);
            const accessToken = this.service.generateAccessToken(workspace);
            const refreshToken = this.service.generateRefreshToken(workspace);
            res.cookie("jwt", refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: "Strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            res.success({ user: _user, accessToken }, 201, "User created successfully");
        } catch (err) {
            res.error(err, 500, err.message);
        }
    };

    login = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const { user, workspace, auth } = await this.service.validateCredentials(email, password);
            const _user = this.service.createUser(user, workspace, auth);
            const accessToken = this.service.generateAccessToken(workspace);
            const refreshToken = this.service.generateRefreshToken(workspace);
            res.cookie("jwt", refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: "Strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            res.success({ user: _user, accessToken }, 200, "User logged in successfully");
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
