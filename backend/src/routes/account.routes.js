import { Router } from "express";
import { balance } from '../controllers/account.controllers.js'
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()

router.route('/balance').get(verifyJWT, balance)
router.route('/transfer').post(verifyJWT, transfer)

export default router;