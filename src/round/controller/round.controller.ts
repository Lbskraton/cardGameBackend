import { NextFunction, Request, Response } from "express"
import roundService from "../services/round.service"

class roundController{

    
    static async create(req:Request,res:Response,next:NextFunction){

        try {
            const idGame=Number.parseInt(req.params.idgame)
            const round=req.body

            const nRound=roundService.create(idGame,round)
            res.status(201).json({message:"nRound registered succesfully",nRound})
        } catch (error) {
                next(error)
        }
    
    }

    static async update(req:Request,res:Response,next:NextFunction){
        try {
            const idGame=Number.parseInt(req.params.idgame)
            const round=req.body
            const nRound=roundService.update(idGame,round)
            res.status(201).json({message:"nRound updated succesfully",nRound})
        } catch (error) {
                next(error)
        }
    
    }


    static async delete(req:Request,res:Response,next:NextFunction){

        try {
            const idGame=Number.parseInt(req.params.idgame)
            const round=req.body
            const nRound=roundService.update(idGame,round)
            res.status(201).json({message:"nRound updated succesfully",nRound})
        } catch (error) {
                next(error)
        }
    }

    static async getAllGameRounds(req:Request,res:Response,next:NextFunction){
         try {
            const idGame=Number.parseInt(req.params.idgame)
            const Rounds=roundService.getAllGameRounds(idGame)
            res.status(201).json({message:"Rondas no encontradas",Rounds})
        } catch (error) {
                next(error)
        }

    }

    static async getLatestRoundId(req:Request,res:Response,next:NextFunction){
         try {
            const idGame=Number.parseInt(req.params.idgame)
            const Roundid=roundService.getLatestRoundId(idGame)
            res.status(201).json({message:"Ultima ronda no encontrada",Roundid})
        } catch (error) {
                next(error)
        }

    }
}

export default roundController