import { Router } from "express";
import { isAdmin } from "../../middleware/isAdmin.middleware";
import { isAuthenticate } from "../../middleware/auth.middleware";
import DeckController from "../controller/deck.controller";
import { ValidationMiddleware } from "../../middleware/validation.middleware";
import { deckValidation } from "../../middleware/validator.middleware";

const router=Router()

router.get('/',isAuthenticate,DeckController.listDecks)
router.get('/:id',isAuthenticate,DeckController.getDeckCards)
router.put('/:id',isAuthenticate,isAdmin,deckValidation,ValidationMiddleware,DeckController.update)

//add un deck, datos van en el body
router.post('/',isAuthenticate,isAdmin,ValidationMiddleware,DeckController.create)

//Borrar un deck , el id va como ruta
router.delete('/:id',isAuthenticate,isAdmin,DeckController.delete)

export default router