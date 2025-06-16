import { NextFunction, Request, Response } from "express"
import GameTypeService from "../service/gameType.service"

class gameTypeController{

    static async create(req:Request,res:Response,next:NextFunction) {
            try{
                    //Saco el creador de ls card del user que va en la request (auth middleware)
                    const idUserCreator=req.user.id
                    //Y el propio deck del body
                    const gameTypeRegister=req.body
               
                    const nGameType=GameTypeService.create(idUserCreator,gameTypeRegister)
                    res.status(201).json({message:"Deck registered succesfully",nGameType})
            }catch(error){
                    next(error)
                    
            }
    }

    static async delete(req:Request,res:Response,next:NextFunction){
        try {  
                //Recibo el id de la carta a borrar por parametro
                const gameTypeId=Number.parseInt(req.params.id)
                const card=await GameTypeService.delete(gameTypeId)
                res.status(200).json(card)
                               
        } catch (error) {
                next(error)
        }
    }


    static async update(req:Request,res:Response,next:NextFunction) {
        try {
                const gameTypeId=Number.parseInt(req.params.id)
                const gameType=req.body
                const upDeck=await GameTypeService.update(gameTypeId,gameType)
                res.status(200).json(upDeck)
                       
        } catch (error) {
                       next(error)
        }
    }

    static async getAll(req:Request,res:Response,next:NextFunction) {
            
            try {

                   const gameTypes=await GameTypeService.getAll()
                   res.status(200).json(gameTypes)
                   
            } catch (error) {
                   next(error)
            }
    
        }

        static async getById(req:Request,res:Response,next:NextFunction) {
            
            try {
                const id=Number.parseInt(req.params.id)
                const gameTypes=await GameTypeService.getByID(id)
                res.status(200).json(gameTypes)
                   
            } catch (error) {
                   next(error)
            }
    
        }

}

export  default gameTypeController