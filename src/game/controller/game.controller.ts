import { NextFunction, Request, Response } from "express"
import GameService from "../service/game.service"


//Se comunica con el cliente
class GameController{

    static async getById(req:Request,res:Response,next:NextFunction){
        try {
            const id=Number.parseInt(req.params.id)
            const game=await GameService.getById(id)
            res.status(200).json(game)
            
        } catch (error) {
            next(error)
        }
    }

    static async getAllByUser(req:Request,res:Response,next:NextFunction){
        try{
            const idUser=req.user.id
            const games=await GameService.getAllByUser(idUser)
            res.status(200).json(games)
        }catch (error) {
            next(error)
        }
        
    }

    static async create(req:Request,res:Response,next:NextFunction) {
            try{
                  //Saco el creador del deck del user que va en la request (auth middleware)
                const idUserCreator=req.user.id
                //Y el propio deck del body
                const gameRegister=req.body
                const nGame=GameService.create(idUserCreator,gameRegister)
                res.status(201).json({message:"Game registered succesfully",nGame})
            }catch(error){
                next(error)
                
            }
    }


    static async update(req:Request,res:Response,next:NextFunction) {
            try {
                   const gameId=Number.parseInt(req.params.id)
                   const game=req.body
                   const upGame=await GameService.update(gameId,game)
                   res.status(200).json(upGame)
                   
            } catch (error) {
                   next(error)
            }
    }

    static async delete(req:Request,res:Response,next:NextFunction) {
            try {
                   const gameId=Number.parseInt(req.params.id)
                   const game=await GameService.delete(gameId)
                   res.status(200).json(game)
                   
            } catch (error) {
                   next(error)
            }
    }

    static async addSelfGamePlayer(req:Request,res:Response,next:NextFunction){
         try {
                   const gameId=Number.parseInt(req.params.id)
                   const idUser=req.user.id
                   const gameParticipant=await GameService.addGamePlayers(idUser,gameId)
                   res.status(200).json(gameParticipant)
                   
            } catch (error) {
                   next(error)
            }
    }

    static async addGamePlayer(req:Request,res:Response,next:NextFunction){
         try {
                const gameId=Number.parseInt(req.params.id)
                const idUser=Number.parseInt(req.params.newPlayer)
                const gameParticipant=await GameService.addGamePlayers(idUser,gameId)
                res.status(200).json(gameParticipant)
                   
            } catch (error) {
                   next(error)
            }
    }

    

    
    
    
        
    

  
    
}

export default GameController