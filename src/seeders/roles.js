import { RoleModel } from "../models/index.js"
import { ROLES } from "../constants/index.js"

export default {
    create: async () => {
        console.log(`Creating ${ROLES.length} roles ...`)

        const roles = []
        for (let rolesIndex = 0; rolesIndex < ROLES.length; rolesIndex++) {
            const ROLE = ROLES[rolesIndex]
            const role = new RoleModel({
                name: ROLE.name,
                description: ROLE.description,
            })
            roles.push(role)
        }

        await RoleModel.bulkSave(roles)

        console.log(`Created ${ROLES.length} roles`)
    },
}
