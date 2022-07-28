export { default as usersSeeders } from "./users.js"

export { default as productsSeeders } from "./products.js"
export { default as marketsSeeders } from "./markets.js"

export { default as imageSeeders } from "./image.js"

export { default as rolesSeeders } from "./roles.js"
export { default as permissionsSeeders } from "./permissions.js"
export { default as resourcesSeeders } from "./resources.js"

export { default as categoriesSeeders } from "./categories.js"

export { default as commentsSeeders } from "./comments.js"
export { default as reviewsSeeders } from "./reviews.js"

import usersSeeders from "./users.js"

import productsSeeders from "./products.js"
import marketsSeeders from "./markets.js"

import imageSeeders from "./image.js"

import rolesSeeders from "./roles.js"
import permissionsSeeders from "./permissions.js"
import resourcesSeeders from "./resources.js"

import categoriesSeeders from "./categories.js"

import commentsSeeders from "./comments.js"
import reviewsSeeders from "./reviews.js"

import likesSeeders from "./likes.js"
import favoritesSeeders from "./favorites.js"
import votesSeeders from "./votes.js"

import { seedersConfig } from "../config/index.js"

const RECORD = seedersConfig.amount

const dbSeed = async () => {
    console.log(`Seeding ${RECORD} records ...`)

    await rolesSeeders.create()
    await permissionsSeeders.create()
    await resourcesSeeders.create()
    await usersSeeders.create()

    console.log(`Seeding ${RECORD} records ... DONE`)
}

const dbSeedFake = async () => {
    console.log(`Seeding fake ${RECORD} records ...`)

    await usersSeeders.createFake(RECORD)
    await categoriesSeeders.createFake(RECORD)
    await marketsSeeders.createFake(RECORD)
    await productsSeeders.createFake(RECORD)

    await commentsSeeders.createFake(RECORD)
    await reviewsSeeders.createFake(RECORD)

    await likesSeeders.createFake(RECORD)
    await favoritesSeeders.createFake(RECORD)
    await votesSeeders.createFake(RECORD)

    console.log(`Seeding fake ${RECORD} records ... DONE`)
}

export { dbSeed, dbSeedFake }
