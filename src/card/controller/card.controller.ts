import { NextFunction, Request, Response } from "express"
import CardService from "../services/card.service"

class CardController{

    // Problema usercreator
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
}


export default CardController