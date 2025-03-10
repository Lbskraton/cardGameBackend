import { GameType } from '@prisma/client'
import { prisma } from "../../database/database"
import { httpException } from '../../exceptions/httpException'

export default class GameService{

    static async create(gameType:GameType){
        return await prisma.gameType.create( {data: {
            ...gameType
          }})

    }

    static async delete(id:number) {

        const foundGametype=await prisma.gameType.findUnique({where:{id}})
        if(!foundGametype) throw new httpException(404,'GameType not found')
        return await prisma.gameType.delete({where:{id}})      
    }

    static async update(id:number,gameType:GameType){

        const foundGametype=await prisma.gameType.findUnique({where:{id}})
        if(!foundGametype) throw new httpException(404,'GameType not found')
        return await prisma.gameType.update({where:{id},data:{...gameType}})
        
    }

    static async getAll(){
        const gameTypes=await prisma.gameType.findMany()
        console.log(gameTypes)
        return gameTypes
    }

    
        
    

}