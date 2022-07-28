export default {
    all: [
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
            path: "Markets",
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
        {
            path: "Products",
            populate: [
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
