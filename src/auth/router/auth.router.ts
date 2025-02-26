import { Router } from "express";
import AuthService from "../service/auth.service";
import { isAuthenticate } from "../../middleware/auth.middleware";
import AuthController from "../controller/auth.controller";
import { loginValidation } from "../../middleware/validator.middleware";

const router=Router()

router.post('/login',loginValidation,AuthController.login)
router.post('/register',AuthController.register)
router.post('/logout', AuthController.logout)
router.get('/user', AuthController.getAuthenticatedUser);

export default router
