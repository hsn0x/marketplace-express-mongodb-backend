import passport from "passport";
import { validateRegister } from "../validation/Auth.js";
import { authQueries } from "../queries/index.js";
import { genPassword } from "../lib/passwordUtils.js";

export default {
    login: (req, res, next) => {
        passport.authenticate("local", (err, user, info) => {
            if (err)
                return res.status(500).json({
                    message: err.message,
                });

            if (!user)
                return res.status(401).json({
                    isAuthenticated: req.isAuthenticated(),
                    message: info.message,
                });

            req.login(user, (err) => {
                if (err) {
                    return res.status(500).json({
                        isAuthenticated: req.isAuthenticated(),
                        message: err.message,
                    });
                }

                return res.status(200).json({
                    isAuthenticated: req.isAuthenticated(),
                    message: "Login successful",
                });
            });
        })(req, res, next);
    },
    register: async (req, res, next) => {
        const { firstName, lastName, username, email, password } = req.body;

        const userData = {
            firstName,
            lastName,
            username,
            email,
            password,
        };

        const hashedPassword = genPassword(userData.password);
        userData.passwordHash = hashedPassword.hash;
        userData.passwordSalt = hashedPassword.salt;

        const isRegisterValid = validateRegister(userData);

        if (!isRegisterValid.valid) {
            return res.status(401).json({
                valid: isRegisterValid.valid,
                errors: isRegisterValid.errors,
            });
        }

        const user = await authQueries.registerQuery(userData);

        if (user) {
            res.status(201).json(user);
        } else {
            res.status(500).json({
                message: `Faile to create a user`,
            });
        }
    },
    profile: async (req, res, next) => {
        return res.status(200).json({
            isAuthenticated: req.isAuthenticated(),
            user: req.user,
            message: "Profile retrieved successfully",
        });
    },
    logout: async (req, res, next) => {
        req.logout((err) => {
            if (err) {
                return res.status(500).json({
                    message: err.message,
                });

                // next(err);
            }

            // res.setHeader(
            //     "set-cookie",
            //     "connect.sid=xd; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
            // );
            return next();
        });
    },
    logoutSession: async (req, res, next) => {
        return req.session.destroy(function (err) {
            if (err) {
                return res.status(500).json({
                    message: err.message,
                });

                // next(err);
            }

            res.status(200).clearCookie("connect.sid", { path: "/" }).json({
                status: "success",
                message: "Logged out successfully",
            });
        });
    },
};
