import { Router } from "express";
import AuthService from "../service/auth.service";
import { isAuthenticate } from "../../middleware/auth.middleware";

const router=Router()

router.post('/login',isAuthenticate,AuthService.login)
router.post('/register',isAuthenticate,AuthService.register)

export default router
