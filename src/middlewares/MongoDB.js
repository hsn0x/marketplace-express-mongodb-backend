import mongoStore from "../db/mongoStore.js"
import { sessionConfig } from "../config/index.js"
import session from "express-session"

import { Router } from "express"

const router = Router()

sessionConfig.store = mongoStore
router.use(session(sessionConfig))

export default router
