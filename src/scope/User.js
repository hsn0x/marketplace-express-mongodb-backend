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
        },
        {
            path: "Reviews",
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
