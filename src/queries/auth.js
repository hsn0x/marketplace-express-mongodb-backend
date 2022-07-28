import { UserModel } from "../models/index.js"

export default {
    registerQuery: async (user) => {
        const registerdUser = await UserModel.create(user)

        return registerdUser
    },
}
