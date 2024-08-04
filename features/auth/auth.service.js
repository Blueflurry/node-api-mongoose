const config = require("../../config");
const BaseService = require("../../utils/base.service");
const { HttpError } = require("../../utils/error.model");
const UserModel = require("./auth.model");
const jwt = require("jsonwebtoken");

class AuthService extends BaseService {
    constructor() {
        super(UserModel);
    }

    generateToken(user) {
        return jwt.sign({ id: user._id }, config.secret, { expiresIn: "1h" });
    }

    async register(data) {
        return await this.create(data);
    }

    async login(username, password) {
        const user = await this.model.findOne({ username });
        if (user && (await user.matchPassword(password))) {
            return { user, token: this.generateToken(user) };
        } else {
            throw new HttpError(401, "Invalid Credentials");
        }
    }
}

module.exports = new AuthService();
