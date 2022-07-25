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
    await createRoles()
    await createPermissions()
    await createResources()
    await creates()
}

/**
 *
 */
const dbSeedFake = async () => {
    await createFakeUsers(RECORD)
    await createFakeMarkets(RECORD)
    await createFakeProducts(RECORD)
    await createFakeCategories(RECORD)
    await createFakeComments(RECORD)
    await createFakeReviews(RECORD)
}

export { dbSeed, dbSeedFake }
