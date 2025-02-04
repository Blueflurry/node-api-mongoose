const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const { User, Workspace, Auth } = require("../../schemas");
const HttpError = require("../../utils/error.model");
const authConfig = require("./auth.config");
const { UserModel, WorkspaceModel, AuthModel } = require("./auth.model");
const logger = require("../../utils/logger");

class AuthService {
    constructor() {
        this.Users = UserModel;
        this.Workspaces = WorkspaceModel;
        this.Auths = AuthModel;
    }

    generateAccessToken(workspace) {
        return jwt.sign({ id: workspace._id }, config.accessTokenSecret, { expiresIn: "30m" });
    }
    generateRefreshToken(workspace) {
        return jwt.sign({ id: workspace._id }, config.refreshTokenSecret, { expiresIn: "7d" });
    }

    _createUserData(data) {
        const value = {};

        Object.keys(User).forEach((key) => {
            if (data[key] !== null && data[key] !== undefined) {
                if (typeof data[key] === "object") value[key] = { ...data[key] };
                else value[key] = data[key];
            }
        });

        return value;
    }

    _createWorkspaceData(data) {
        const dataCopy = _.cloneDeep(data);
        // const value = { password: data.password, admin: data.admin, type: data.type, scope: data.scope };
        const value = {};

        if (data.legal && typeof data.legal === "object") value.legal = { ...data.legal };

        Object.keys(Workspace).forEach((key) => {
            if (data[key] !== null && data[key] !== undefined) {
                if (typeof data[key] === "object") value[key] = { ...data[key] };
                else value[key] = data[key];
                delete dataCopy[key];
            }
        });

        value.data = this._createMetaData(dataCopy);

        return value;
    }

    _createAuthData(data) {
        const value = {};

        Object.keys(Auth).forEach((key) => {
            if (data[key] !== null && data[key] !== undefined) {
                if (typeof data[key] === "object") value[key] = { ...data[key] };
                else value[key] = data[key];
            }
        });

        console.log(value);

        return value;
    }

    _createMetaData(data) {
        const dataCopy = _.cloneDeep(data);
        const userData = this._createUserData(data);
        const authData = this._createAuthData(data);
        const combinedData = { ...userData, ...authData };
        Object.keys(combinedData).forEach((key) => (dataCopy[key] ? delete dataCopy[key] : null));
        return dataCopy;
    }

    async _getProfileAuth(data) {
        return await this.Auths.findOne({
            ...data,
            type: authConfig.workspaceTypes.profile,
            scope: authConfig.workspaceScopes.profile,
            role: authConfig.userWorkspaceRoles.admin,
        });
    }

    createUser(user, workspace, auth) {
        return {
            id: user._id,
            name: user.name,
            fullName: user.fullName,
            phone1: user.phone1,
            phone2: user.phone2,
            dob: user.dob,
            age: user.age,
            address: user.address,
            fullAddress: user.fullAddress,
            email: auth.email,
            username: auth.username,
            oAuth: { ...auth.oAuth },
            legal: { ...workspace.legal },
            status: workspace.status,
            ...workspace.data,
        };
    }

    async registerUser(data) {
        const user = await this.Users.create(this._createUserData(data));
        const workspace = await this.Workspaces.create(
            this._createWorkspaceData({
                admin: user.id,
                type: authConfig.workspaceTypes.profile,
                scope: authConfig.workspaceScopes.profile,
                ...data,
            })
        );
        const auth = await this.Auths.create(
            this._createAuthData({
                user: user.id,
                workspace: workspace.id,
                type: authConfig.workspaceTypes.profile,
                scope: authConfig.workspaceScopes.profile,
                role: authConfig.userWorkspaceRoles.admin,
                ...data,
            })
        );
        return { user, workspace, auth };
    }

    async validateCredentials(email, password) {
        try {
            // const auth = await this.Auths.findOne({ email, type: authConfig.workspaceTypes.profile });
            const auth = await this._getProfileAuth({ email });

            console.log(auth);

            if (!auth || !(await auth.matchPassword(password))) throw new Error();

            const user = await this.Users.findOne({ _id: auth.user });
            const workspace = await this.Workspaces.findOne({ _id: auth.workspace });

            return { user, workspace, auth };
        } catch (err) {
            throw new HttpError(401, "Invalid Credentials");
        }
    }

    async getUser(data) {
        let user, workspace, auth;

        user = await this.Users.findOne(data);
        workspace = await this.Workspaces.findOne({ ...data, type: authConfig.workspaceTypes.profile, scope: authConfig.workspaceScopes.profile });
        auth = await this._getProfileAuth(data);

        if (user && workspace && auth) {
            // Handle case where `user`, `workspace`, and `auth` are true
            return { user, workspace, auth };
        } else if (user && workspace && !auth) {
            // Handle case where `user` and `workspace` are true
            auth = await this.Auths.findOne({ user: user._id, workspace: workspace._id });
        } else if (user && !workspace && auth) {
            // Handle case where `user` and `auth` are true
            workspace = await this.Workspaces.findOne({ _id: auth.workspace });
        } else if (user && !workspace && !auth) {
            // Handle case where only `user` is true
            auth = await this._getProfileAuth({ user: user._id });
            workspace = await this.Workspaces.findOne({ _id: auth.workspace });
        } else if (!user && workspace && !auth) {
            // Handle case where only `workspace` is true
            user = await this.Users.findOne({ _id: workspace.admin });
            auth = await this.Auths.findOne({ workspace: workspace._id, user: user._id });
        } else if (!user && workspace && auth) {
            // Handle case where `workspace` and `auth` are true
            user = await this.Users.findOne({ _id: auth.user });
        } else if (!user && !workspace && auth) {
            // Handle case where only `auth` is true
            user = await this.Users.findOne({ _id: auth.user });
            workspace = await this.Workspaces.findOne({ _id: auth.workspace });
        } else {
            // Handle case where all conditions are false
            return false;
        }

        return { user, workspace, auth };
    }
}

module.exports = new AuthService();
