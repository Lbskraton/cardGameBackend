import { Game, Round, Score } from '@prisma/client'
import { prisma } from "../../database/database"
import { httpException } from '../../exceptions/httpException'

export default class GameService{

    static async create(userId:number,game:Game){
        return await prisma.game.create( {data: {
            ...game,idUserCreator:userId
          }})

    }

    static async delete(id:number){
        const foundGame=await prisma.game.findUnique({where:{id}})
        if(!foundGame) throw new httpException(404,'Game not found')
        return await prisma.gameType.delete({where:{id}})
    }

    static async update(id:number,game:Game){
         const foundGame=await prisma.game.findUnique({where:{id}})
        if(!foundGame) throw new httpException(404,'Game not found')
        return await prisma.game.update({where:{id},data:{...foundGame}})
        
    }

    static async addGamePlayers(userId:number,gameId:number){
        //compruebo que el juego exista
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

    static async getById(gameId:number){
        const foundGame=await prisma.game.findUnique({where:{id:gameId}})
        if(!foundGame) throw new httpException(404,'Game not found')
        return  foundGame
    }

    static async getAllByUser(userId:number){
        //Busco con la tabla de relacion gameParticipan los juegos donde participo
        const gameParticipated=await prisma.gameParticipant.findMany({
            where: { userId },
            include: {
                game: true
            }
        });
        
        //filtro para solo obtener los datos del juego
        return gameParticipated.map(gp => gp.game);
    }

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

    static async createScore(userId:number,roundId:number,score:Partial<Score>){
        const foundRound=await prisma.round.findUnique({where:{id:roundId}})
        if(!foundRound) throw new httpException(404,'Round not found')

        return await prisma.score.create({
            data: {
                ...score,
                idGameParticipant: userId,
                idRound:roundId

            },
        });


    }

    static async updateScore(idGameParticipant:number,idRound:number,score:Score){
        const foundScore=await prisma.score.findUnique({where: {
                    idRound_idGameParticipant: {
                    idRound,
                    idGameParticipant,
                }
            }
        })
        if(!foundScore) throw new httpException(404,'Score not found')
        return await prisma.score.update({where:{idRound_idGameParticipant:{idRound,idGameParticipant}},data:{...score}})

    }

    

}