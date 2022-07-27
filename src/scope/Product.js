export default {
    all: [
        {
            path: "Images",
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
            path: "User",
        },

        {
            path: "Comments",
            populate: [
                {
                    path: "User",
                    populate: [
                        {
                            path: "Avatars",
                        },
                    ],
                },
            ],
        },
        {
            path: "Reviews",
            populate: [
                {
                    path: "User",
                    populate: [
                        {
                            path: "Avatars",
                        },
                    ],
                },
            ],
        },
        {
            path: "Market",
            populate: [
                {
                    path: "Avatars",
                },
                {
                    path: "Images",
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
    ],
}
