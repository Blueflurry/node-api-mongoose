const BaseController = require("../../utils/base.controller");
const AuthService = require("./auth.service");

class AuthController extends BaseController {
    constructor() {
        super(AuthService);
    }

    register = async (req, res, next) => {
        try {
            const user = await this.service.register(req.body);
            const token = this.service.generateToken(user);
            res.success({ id: user.id, token }, 201);
        } catch (err) {
            next(err);
        }
    };

    login = async (req, res, next) => {
        try {
            const { username, password } = req.body;
            const { user, token } = await this.service.login(
                username,
                password
            );
            res.success({ id: user.id, token });
        } catch (err) {
            next(err);
        }
    };
}

module.exports = new AuthController();
