import { ResourceModel } from "../models/index.js"
import { RESOURCES } from "../constants/index.js"
import { permissionsQueries } from "../queries/index.js"

export const createResources = async () => {
    console.log(`Creating ${RESOURCES.length} resources ...`)

    const resources = []
    for (let index = 0; index < RESOURCES.length; index++) {
        const RESOURCE = RESOURCES[index]
        const resource = new ResourceModel({
            name: RESOURCE.name,
            description: RESOURCE.description,
        })
        resources.push(resource)
    }

    const permissions = await permissionsQueries.findAllQuery()
    for (
        let permissionIndex = 0;
        permissionIndex < permissions.length;
        permissionIndex++
    ) {
        const permission = permissions[permissionIndex]
        for (
            let resourceIndex = 0;
            resourceIndex < resources.length;
            resourceIndex++
        ) {
            const resource = resources[resourceIndex]

            await permissionsQueries.findOneAndUpdate(
                { _id: permission._id },
                {
                    $push: {
                        Resources: resource._id,
                    },
                }
            )
        }
    }

    await ResourceModel.bulkSave(resources)

    console.log(`Created ${RESOURCES.length} resources`)
}
