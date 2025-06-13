import { NextFunction, Request, Response } from "express"
import CardService from "../services/card.service"

class CardController{

    // Problema usercreator, arreglado creo
    static async create(req:Request,res:Response,next:NextFunction) {
              try{
                 //Saco el creador de ls card del user que va en la request (auth middleware)
                const idUserCreator=req.user.id
                //Y el propio deck del body
                const cardRegister=req.body
           
                const nCard=CardService.create(idUserCreator,cardRegister)
                res.status(201).json({message:"Deck registered succesfully",nCard})
            }catch(error){
                next(error)
                
            }
    }

    static async delete(req:Request,res:Response,next:NextFunction){
         try {  
                //Recibo el id de la carta a borrar por parametro
                const cardId=Number.parseInt(req.params.id)
                const card=await CardService.delete(cardId)
                res.status(200).json(card)
                       
        } catch (error) {
            next(error)
        }
    }

    static async update(req:Request,res:Response,next:NextFunction) {
            try {
                   const cardId=Number.parseInt(req.params.id)
                   const card=req.body
                   const upDeck=await CardService.update(cardId,card)
                   res.status(200).json(upDeck)
                   
            } catch (error) {
                   next(error)
            }
    }
}


export default CardController