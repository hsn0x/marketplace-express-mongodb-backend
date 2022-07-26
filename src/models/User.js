import mongoose from "mongoose"

const Schema = mongoose.Schema
const model = mongoose.model

const schema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true,
            select: false,
        },
        passwordSalt: {
            type: String,
            required: true,
            select: false,
        },
        age: {
            type: Number,
        },
        gender: {
            type: String,
        },

        Avatars: [
            {
                type: Schema.Types.ObjectId,
                ref: "Avatar",
            },
        ],
        Images: [
            {
                type: Schema.Types.ObjectId,
                ref: "Image",
            },
        ],
        Roles: [
            {
                type: Schema.Types.ObjectId,
                ref: "Role",
            },
        ],

        Products: [
            {
                type: Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
        Markets: [
            {
                type: Schema.Types.ObjectId,
                ref: "Market",
            },
        ],
        Categories: [
            {
                type: Schema.Types.ObjectId,
                ref: "Category",
            },
        ],
        Posts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post",
            },
        ],

        Likes: [
            {
                type: Schema.Types.ObjectId,
                ref: "Like",
            },
        ],
        Votes: [
            {
                type: Schema.Types.ObjectId,
                ref: "Vote",
            },
        ],
        Favorites: [
            {
                type: Schema.Types.ObjectId,
                ref: "Favorite",
            },
        ],

        Comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
        Reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: "Review",
            },
        ],
    },
    { timestamps: true }
)

export default mongoose.model("User", schema)
