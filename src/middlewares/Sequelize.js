import { sequelizeStore } from "../db/session.js";
import { sessionConfig } from "../config/index.js";
import session from "express-session";

import { Router } from "express";

const router = Router();

sessionConfig.store = sequelizeStore;
router.use(session(sessionConfig));

export default router;
