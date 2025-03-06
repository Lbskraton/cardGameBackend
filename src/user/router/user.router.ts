import { Router } from "express";
import { isAdmin } from "../../middleware/isAdmin.middleware";
import { isAuthenticate } from "../../middleware/auth.middleware";
import { UserService } from "../service/user.service";
import UserController from "../controller/user.controller";

const router=Router()

router.get('/userlist',isAuthenticate,isAdmin,UserController.listUsers)
router.get('/profile',isAuthenticate,UserController.profile)

export default router