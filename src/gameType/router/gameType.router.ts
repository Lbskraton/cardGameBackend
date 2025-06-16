import { isAdmin } from "../../middleware/isAdmin.middleware";
import { isAuthenticate } from "../../middleware/auth.middleware";
import { ValidationMiddleware } from "../../middleware/validation.middleware";
import { Router } from "express";
import gameTypeController from "../controller/gameType.controller";

const router=Router()

//add un gameType, datos van en el body
router.post('/',isAuthenticate,ValidationMiddleware,gameTypeController.create)

//Borrar un gametype , el id va como ruta
router.delete('/:id',isAuthenticate,isAdmin,gameTypeController.delete)

router.put('/:id',isAuthenticate,gameTypeController.update)

//obtener todos los gametype por la id del mismo
router.get('/',isAuthenticate,gameTypeController.getAll)

//Obtener 1 por la id de este
router.get('/:id',isAuthenticate,gameTypeController.getById)

export default router