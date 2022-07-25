import { User } from "../models/index.js"

export default {
    registerUserQuery: async (user) => {
        const registerdUser = await User.create(user)

        delete registerdUser.dataValues.password
        delete registerdUser.dataValues.passwordHash
        delete registerdUser.dataValues.passwordSalt

        return registerdUser
    },
}
