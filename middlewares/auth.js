const jwt = require("jsonwebtoken");
const User = require("../features/auth/auth.model");

const protect = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (err) {
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};

// Middleware to check if the user is an admin
const admin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({
            status: "error",
            message: "Forbidden, admin only",
        });
    }
};

module.exports = { protect, admin };

/**
 * Use this middleware to create protected routes at the route level
 *
 * Eg: (inside feature.routes.js)
 * const { protect, admin } = require('../middlewares/auth');
 * router.get('/:id', protect, featureController.getOne);
 * router.delete('/:id', protect, admin, featureController.delete);
 *
 * This allows you to protect individual routes instead of blocking the entire controller
 */
