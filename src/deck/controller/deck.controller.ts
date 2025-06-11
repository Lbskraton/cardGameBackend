import { NextFunction, Request, Response } from "express"
import DeckService from "../services/deck.service"

class DeckController {
    
    static async listDecks(req:Request,res:Response,next:NextFunction) {
        
        try {
               const deckId=Number.parseInt(req.params.id)
               const cat=await DeckService.getDeckById(deckId)
               res.status(200).json(cat)
               
        } catch (error) {
               next(error)
        }



    }

    static async getDeckCards(req:Request,res:Response,next:NextFunction) {

    }
}