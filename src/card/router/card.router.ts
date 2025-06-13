import { isAdmin } from "../../middleware/isAdmin.middleware";
import { isAuthenticate } from "../../middleware/auth.middleware";
import { ValidationMiddleware } from "../../middleware/validation.middleware";
import { deckValidation } from "../../middleware/validator.middleware";
import { Router } from "express";
import CardController from "../controller/card.controller";

const router=Router()

//add un card, datos van en el body
router.post('/',isAuthenticate,isAdmin,ValidationMiddleware,CardController.create)

//Borrar un card , el id va como ruta
router.delete('/:id',isAuthenticate,isAdmin,CardController.delete)

router.put('/:id',isAuthenticate,isAdmin,CardController.update)

export default router

