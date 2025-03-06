
import { PrismaClient, User } from "@prisma/client"
import { httpException } from "../../exceptions/httpException"
import { prisma } from "../../database/database"



export class UserService{

    
    static async getUserByEmail(email:string){
        const foundUser= await prisma.user.findUnique({where:{email}, omit:{password:true}})
        if(!foundUser) throw new httpException(404,'User not found')
        return foundUser
    }

    static async getUserByID(id:number){
        const foundUser= await prisma.user.findUnique({where:{id}})
        if(!foundUser) throw new httpException(404,'User not found')
        return foundUser
    }


    static async listAll(){
        const users = await prisma.user.findMany({
            omit: {password:true}
        })
        console.log(users)
        return users
    }
}