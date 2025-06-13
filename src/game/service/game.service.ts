import { Game, Round, Score } from '@prisma/client'
import { prisma } from "../../database/database"
import { httpException } from '../../exceptions/httpException'

export default class GameService{

    static async createGame(userId:number,game:Game){
        return await prisma.game.create( {data: {
            ...game,idUserCreator:userId
          }})

    }

    static async deleteGame(id:number){
        const foundGame=await prisma.game.findUnique({where:{id}})
        if(!foundGame) throw new httpException(404,'Game not found')
        return await prisma.gameType.delete({where:{id}})
    }

    static async updateGame(id:number,game:Game){
         const foundGame=await prisma.game.findUnique({where:{id}})
        if(!foundGame) throw new httpException(404,'Game not found')
        return await prisma.game.update({where:{id},data:{...foundGame}})
        
    }

    static async addGamePlayers(userId:number,game:Game){
        //compruebo que el juego exista
        const gameId=game.id
        const foundGame=await prisma.game.findUnique({where:{id:gameId}})
        if(!foundGame) throw new httpException(404,'Game not found')
        
        const participant = await prisma.gameParticipant.create({
            data: {
                userId: userId,
                gameId: gameId,
            },
        });
        return participant;

        
    }

    static async createRound(userId:number,gameId:number,round:Round){
        const foundGame=await prisma.game.findUnique({where:{id:gameId}})
        if(!foundGame) throw new httpException(404,'Game not found')

        return await prisma.round.create({
            data: {
                ...round,
                gameid: gameId

            },
        });

        
    }

    static async updateRound(id:number,game:Game){
         const foundGame=await prisma.game.findUnique({where:{id}})
        if(!foundGame) throw new httpException(404,'Game not found')

            
        return await prisma.game.update({where:{id},data:{...foundGame}})
        
    }

    static async createScore(userId:number,round:Round,score:Partial<Score>){
        const foundRound=await prisma.round.findUnique({where:{id:round.id}})
        if(!foundRound) throw new httpException(404,'Game not found')

        return await prisma.score.create({
            data: {
                ...round,
                idGameParticipant: userId,
                idRound:round.id

            },
        });


    }

    

}