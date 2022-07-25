// Auth middleware

import { findOneUserQuery } from "../queries/users.js";

/**
 * Check if user is logged in
 * @returns {Promise<void>}
 * @memberof Auth
 * @example
 * const isAuth = isAuth();
 */
const isAuth = (req, res, next) => {
    const auth = req.isAuthenticated();
    if (auth) {
        return next();
    } else {
        res.status(401).json({
            isAuthenticated: req.isAuthenticated(),
            message: "You need to be logged in ",
        });
    }
};

const isUserAuth = (req, res, next) => {
    const id = parseInt(req.params.id);
    const { session, user } = req;
    if (user.id !== id) {
        return res.status(401).json({
            isAuthenticated: req.isAuthenticated(),
            message: "You are not authorized to do this action",
        });
    } else {
        next();
    }
};

/**
 * Check if username is taken in the database with the same username
 * If username is taken, return error
 * If username is not taken, return next()
 * @param {string} username
 * @returns {Promise<void>}
 * @memberof Auth
 */
const isUsernameTaken = async (req, res, next) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ message: "Username is required" });
    }

    const isUsernameTaken = await findOneUserQuery({ username });
    if (isUsernameTaken) {
        return res.status(401).json({
            message: `Username ${username} is already taken`,
        });
    } else {
        return next();
    }
};

/**
 * Check if user already exists in the database with the same email address
 * If user exists, return error
 * If user does not exist, return next()
 * @param {string} email
 * @returns {Promise<void>}
 * @memberof Auth
 */
const isEmailExist = async (req, res, next) => {
    const { email } = req.body;

    const isEmailExist = await findOneUserQuery({ email });
    if (isEmailExist) {
        return res.status(401).json({
            message: `User with email ${email} already exist`,
        });
    } else {
        return next();
    }
};

/**
 * Check if user is logged in and has the correct role to access the resource
 * @param {string} roleName
 * @returns {Promise<void>}
 * @memberof Auth
 * @example
 * const isAdmin = isRole("ADMIN");
 * const isModerator = isRole("MODERATOR");
 * const isUser = isRole("USER");
 * const isGuest = isRole("GUEST");
 * const isAdminOrModerator = isRole("ADMIN", "MODERATOR");
 */
const isAdmin = (req, res, next) => {
    const auth = req.isAuthenticated();

    const roles = req.user.Roles;
    if (auth) {
        const isAdmin =
            roles.length > 0 && roles.some((role) => role.name === "ADMIN");
        if (isAdmin) {
            return next();
        } else {
            return res.status(401).json({
                message: "You need to be an admin to do this action",
            });
        }
    } else {
        return res.status(401).json({
            message: "You need to be logged in to do this action",
        });
    }
};

/**
 * Check if user is logged in and has the correct role to access the resource
 * @param {string} roleName
 * @returns {Promise<void>}
 * @memberof Auth
 */
const isModerator = (req, res, next) => {
    const auth = req.isAuthenticated();

    const roleName = req.user.Roles[0].name;
    const hasModeratorRole = roleName === "ADMIN" || roleName === "MODERATOR";

    if (auth && hasModeratorRole) {
        return next();
    } else {
        res.status(401).json({
            message: `Only ${[
                "ADMIN",
                "MODERATOR",
            ]} are authorized to view this resource`,
        });
    }
};

/**
 * Check if user is logged in and has the correct role to access the resource
 * @param {string} roleName
 * @returns {Promise<void>}
 * @memberof Auth
 *
 */
const isGuest = (req, res, next) => {
    const auth = req.isAuthenticated();

    if (!auth) {
        return next();
    } else {
        res.status(401).json({
            message: "You are already logged in",
        });
    }
};

export {
    isAuth,
    isAdmin,
    isModerator,
    isGuest,
    isEmailExist,
    isUsernameTaken,
    isUserAuth,
};
