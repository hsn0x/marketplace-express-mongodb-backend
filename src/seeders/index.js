import { createFakeUsers, creates } from "./users.js"
import { createFakeProducts } from "./products.js"
import { createFakeMarkets } from "./markets.js"
import { createFakeImages } from "./Image.js"
import { createFakeComments } from "./comments.js"
import { createRoles } from "./roles.js"
import { createPermissions } from "./permissions.js"
import { createResources } from "./resources.js"
import { seedersConfig } from "../config/index.js"
import { createFakeCategories } from "./categories.js"
import { createFakeReviews } from "./review.js"

const RECORD = seedersConfig.amount

/**
 *
 */
const dbSeed = async () => {
    console.log(`Seeding ${RECORD} records ...`)

    await createRoles()
    await createPermissions()
    await createResources()
    await creates()

    console.log(`Seeding ${RECORD} records ... DONE`)
}

const dbSeedFake = async () => {
    console.log(`Seeding fake ${RECORD} records ...`)

    await createFakeUsers(RECORD)
    await createFakeCategories(RECORD)
    await createFakeMarkets(RECORD)
    await createFakeProducts(RECORD)
    // await createFakeComments(RECORD)
    // await createFakeReviews(RECORD)

    console.log(`Seeding fake ${RECORD} records ... DONE`)
}

export { dbSeed, dbSeedFake }
