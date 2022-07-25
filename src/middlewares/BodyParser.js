import bodyParser from "body-parser";
import { Router } from "express";

const router = Router();

router.use(bodyParser.json());
router.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

export default router;
