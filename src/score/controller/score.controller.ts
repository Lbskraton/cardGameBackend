import { NextFunction, Request, Response } from "express"
import scoreService from "../services/score.service"

class scoreController{

    static async getScoresByUserAndGame(req:Request,res:Response,next:NextFunction) {
            
        try {
                const idUser=req.user.id
                const idGame=Number.parseInt(req.params.idgame)
                const scores=await scoreService.getScoresByUserAndGame(idUser,idGame)
                res.status(200).json(scores)
                   
        } catch (error) {
                next(error)
        }
    
    }


    static async create(req:Request,res:Response,next:NextFunction){

        try {
            const idUser=req.user.id
            const idGame=Number.parseInt(req.params.idgame)
            const score=req.body

            const nScore=scoreService.create(idUser,idGame,score)
            res.status(201).json({message:"nScore registered succesfully",nScore})
        } catch (error) {
                next(error)
        }
    
    }

    static async update(req:Request,res:Response,next:NextFunction){
        try {
                const idUser=req.user.id
                const idGame=Number.parseInt(req.params.idgame)
                const score=req.body
                const nScore=await scoreService.update(idUser,idGame,score)
                res.status(200).json(nScore)
                       
        } catch (error) {
                next(error)
        }
    }


    static async delete(req:Request,res:Response,next:NextFunction){

         try {
                 const idUser=req.user.id
                const idGame=Number.parseInt(req.params.idgame)
                const nScore=await scoreService.delete(idUser,idGame)
                res.status(200).json(nScore)
                       
        } catch (error) {
            next(error)
        }
    }
}

export default scoreController