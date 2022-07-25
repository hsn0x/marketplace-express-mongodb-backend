import { Router } from "express"

const router = Router()

router.get("/", function (req, res) {
    res.status(200).json({
        message: "Node.js, Express, and Postgre API",
    })
})

export default router
