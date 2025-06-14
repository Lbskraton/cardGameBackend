import { NextFunction, Request, Response } from "express"
import DeckService from "../services/deck.service"

class DeckController {
    
    static async listDecks(req:Request,res:Response,next:NextFunction) {
        
        try {
               const decks=await DeckService.getAll()
               res.status(200).json(decks)
               
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
              //Saco el creador del deck del user que va en la request (auth middleware)
            const idUserCreator=req.user.id
            //Y el propio deck del body
            const deckRegister=req.body
            const nDeck=DeckService.create(idUserCreator,deckRegister)
            res.status(201).json({message:"Deck registered succesfully",nDeck})
        }catch(error){
            next(error)
            
        }
    }
}

export default DeckController