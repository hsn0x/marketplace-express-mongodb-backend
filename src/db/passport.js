import passport from "passport"

import { usersQueries } from "../queries/index.js"
import localStrategy from "./strategies/Local.js"

passport.use(localStrategy)
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser(async (userId, done) => {
    try {
        const user = await usersQueries.findByIdQuery(userId, [
            {
                path: "Avatars",
            },
            {
                path: "Images",
            },
            {
                path: "Roles",
            },
            {
                path: "Markets",
                populate: [
                    {
                        path: "Avatars",
                    },
                    {
                        path: "Images",
                    },

                    {
                        path: "Products",
                    },
                    {
                        path: "Categories",
                    },

                    {
                        path: "Likes",
                    },
                    {
                        path: "Votes",
                    },
                    {
                        path: "Favorites",
                    },

                    {
                        path: "Comments",
                    },
                    {
                        path: "Reviews",
                    },
                ],
            },
            {
                path: "Products",
                populate: [
                    {
                        path: "Market",
                    },
                    {
                        path: "User",
                    },
                    {
                        path: "Images",
                    },
                    {
                        path: "Comments",
                    },
                    {
                        path: "Reviews",
                    },
                    {
                        path: "Categories",
                    },
                ],
            },
            {
                path: "Categories",
            },
            {
                path: "Posts",
            },
            {
                path: "Likes",
            },
            {
                path: "Votes",
            },
            {
                path: "Favorites",
            },
            {
                path: "Comments",
            },
            {
                path: "Reviews",
            },
        ])
        done(null, user)
    } catch (error) {
        done(error)
    }
})
