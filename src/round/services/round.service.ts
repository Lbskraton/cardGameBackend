import { Game, Round, Score } from '@prisma/client'
import { prisma } from "../../database/database"
import { httpException } from '../../exceptions/httpException'


export default class roundService{


    static async createRound(gameId:number,round:Round){
            const foundGame=await prisma.game.findUnique({where:{id:gameId}})
            if(!foundGame) throw new httpException(404,'Game not found')
    
            return await prisma.round.create({
                data: {
                    ...round,
                    gameid: gameId
    
                },
            });
            
    }
    
    static async updateRound(roundId:number,round:Round){
            const foundRound=await prisma.round.findUnique({where:{id:roundId}})
            if(!foundRound) throw new httpException(404,'Round not found')
            return await prisma.round.update({where:{id:roundId},data:{...round}})
            
    }

    static async deleteRound(id:number){
        const foundRound=await prisma.round.findUnique({where:{id}})
            if(!foundRound) throw new httpException(404,'Round not found')
            return await prisma.round.delete({where:{id}})
    }


    static async getGameRounds(idGame:number){
        const foundRounds=await prisma.round.findMany({where:{gameid:idGame}})
        if(!foundRounds) throw new httpException(404,'No rounds found')
        return foundRounds;
    }


}