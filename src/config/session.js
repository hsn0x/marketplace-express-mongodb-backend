export default {
    secret: process.env.SESSION_SECRET,
    name: process.env.SESSION_NAME,
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: true, // if you do SSL outside of node.
    saveUninitialized: false, // create a session even if there is no cookie
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        secure: process.env.NODE_ENV !== "development", // cookie only works over https in production
        httpOnly: true, // only works over http in production
        sameSite: process.env.NODE_ENV == "production" ? "none" : "lax", // prevents cross-site scripting
    },
}
