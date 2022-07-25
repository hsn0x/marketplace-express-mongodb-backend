export { default as CategoryMiddleware } from "./Category.js"
export { default as CommentMiddleware } from "./Comment.js"
export { default as FavoriteMiddleware } from "./Favorite.js"
export { default as LikeMiddleware } from "./Like.js"
export { default as MarketMiddleware } from "./Market.js"
export { default as ProductMiddleware } from "./Product.js"
export { default as ReviewMiddleware } from "./Review.js"
export { default as VoteMiddleware } from "./Vote.js"

import { Router } from "express"
import bodyParser from "./BodyParser.js"
import passport from "./Passport.js"
import sequelize from "./Sequelize.js"
import cors from "cors"

const router = Router()

const corsConfig = {
    origin: true,
    credentials: true,
}

router.use(cors(corsConfig))
router.options("*", cors(corsConfig))
router.use(sequelize)
router.use(bodyParser)
router.use(passport)

export default router
