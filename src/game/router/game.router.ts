import { isAdmin } from "../../middleware/isAdmin.middleware";
import { isAuthenticate } from "../../middleware/auth.middleware";
import { ValidationMiddleware } from "../../middleware/validation.middleware";
import { Router } from "express";
import GameController from "../controller/game.controller";


const router=Router()

//add un game, datos van en el body
router.post('/',isAuthenticate,ValidationMiddleware,GameController.create)

//Borrar un game , el id va como ruta
router.delete('/:id',isAuthenticate,isAdmin,GameController.delete)

router.put('/:id',isAuthenticate,GameController.update)

//obtener game por la id del mismo
router.get('/:id',isAuthenticate,GameController.getById)

//obtener todos los games del usuario

router.get('/',isAuthenticate,GameController.getAllByUser)

//Add user actual al juego

router.put('/:id/entergame',isAuthenticate,GameController.addSelfGamePlayer)

export default router



