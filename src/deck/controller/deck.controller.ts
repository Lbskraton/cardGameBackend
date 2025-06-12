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
        try {
               const deckId=Number.parseInt(req.params.id)
               const cat=await DeckService.getDeckCards(deckId)
               res.status(200).json(cat)
               
        } catch (error) {
               next(error)
        }
    }

    static async delete(req:Request,res:Response,next:NextFunction) {
        try {
               const deckId=Number.parseInt(req.params.id)
               const cat=await DeckService.delete(deckId)
               res.status(200).json(cat)
               
        } catch (error) {
               next(error)
        }
    }

    static async update(req:Request,res:Response,next:NextFunction) {
        try {
               const deckId=Number.parseInt(req.params.id)
               const deck=req.body
               const upDeck=await DeckService.update(deckId,deck)
               res.status(200).json(upDeck)
               
        } catch (error) {
               next(error)
        }
    }

    static async create(req:Request,res:Response,next:NextFunction) {
          try{
            const id=Number.parseInt(req.params.id)
            const deckRegister=req.body
            const nDeck=DeckService.create(deckRegister)
            res.status(201).json({message:"Deck registered succesfully",nDeck})
        }catch(error){
            next(error)
            
        }
    }
}

export default DeckController