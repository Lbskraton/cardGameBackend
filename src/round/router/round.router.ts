import { isAdmin } from "../../middleware/isAdmin.middleware";
import { isAuthenticate } from "../../middleware/auth.middleware";
import { ValidationMiddleware } from "../../middleware/validation.middleware";
import { Router } from "express";
import roundController from "../controller/round.controller";

const router=Router()

//paso la id del juego como parametro al add un round
router.post('/:idgame',isAuthenticate,ValidationMiddleware,roundController.create)

//Borrar un game , el id va como ruta
router.delete('/:idgame',isAuthenticate,isAdmin,roundController.delete)

router.put('/:idgame',isAuthenticate,roundController.update)

//Obtener todas las rondas de un game dado
router.get('/:idgame',isAuthenticate,roundController.getAllGameRounds)

router.get('/:idgame',isAuthenticate,roundController.getLatestRoundId)

export default router