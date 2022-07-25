// initalize sequelize with session store
import session from "express-session"
import MongoStore from "connect-mongo"
import { mongodbConfig } from "../config/index.js"

const mongoStore = MongoStore.create({ mongoUrl: mongodbConfig.mongoUrl })

export default { mongoStore }
