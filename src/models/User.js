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
    },
    { timestamps: true }
)

export default mongoose.model("User", schema)
