import { isAdmin } from "../../middleware/isAdmin.middleware";
import { isAuthenticate } from "../../middleware/auth.middleware";
import { ValidationMiddleware } from "../../middleware/validation.middleware";
import { Router } from "express";
import scoreController from "../controller/score.controller";

const router=Router()


//paso la id del juego como parametro al add un score
router.post('/:idgame',isAuthenticate,ValidationMiddleware,scoreController.create)

//Borrar un game , el id va como ruta
router.delete('/:idgame',isAuthenticate,isAdmin,scoreController.delete)

router.put('/:idgame',isAuthenticate,scoreController.update)

export default router
