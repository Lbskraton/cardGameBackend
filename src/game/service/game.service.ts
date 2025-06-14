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

    

    

    

}