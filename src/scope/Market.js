export default {
    all: [
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

        {
            path: "Products",
            populate: [
                [
                    {
                        path: "Images",
                    },
                    {
                        path: "User",
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

                    {
                        path: "Likes",
                    },
                    {
                        path: "Votes",
                    },
                    {
                        path: "Favorites",
                    },
                ],
            ],
        },
    ],
}
