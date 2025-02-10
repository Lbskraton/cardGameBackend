import { Router } from "express";
import AuthService from "../service/auth.service";
import { isAuthenticate } from "../../middleware/auth.middleware";
import AuthController from "../controller/auth.controller";

const router=Router()

router.post('/login',AuthController.login)
router.post('/register',AuthController.register)

export default router
