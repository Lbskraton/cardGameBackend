import { User } from '@prisma/client'
import { httpException } from "../../exceptions/httpException";
import bcrypt from 'bcrypt'
import  jwt  from "jsonwebtoken";
import { prisma } from '../../database/database';
import { NextFunction, Request, Response } from 'express';



const client=prisma
const TOKEN_PASSWORD=process.env.TOKEN_PASSWORD || 'pass'



//Deberia ser independiente de User Service?

export default class AuthService{

    
    static async login(email: string, password: any) {

        const foundUser=await client.user.findUnique({where:{email:email}})
        if(!foundUser) throw new httpException(401,`Invalid user or password`)
        
        const isCorrectPassword=await bcrypt.compare(password,foundUser.password)
        
        
        if(!isCorrectPassword) throw new httpException(401,`Invalid user or password`)
        //inyecto token autenticacion
        const token=jwt.sign(
            {id:foundUser.id,name:foundUser.name,email:foundUser.email,rol:foundUser.role},
            TOKEN_PASSWORD,
            {expiresIn:"9h"})  

        return {token, user: { id: foundUser.id, email: foundUser.email, role: foundUser.role } }
    }

    

    static async register(user:User):Promise<any>{
        //console.log(user)
        if (!user.email) {
            throw new httpException(400, "Email is required");
        }
        
        const foundUser = await prisma.user.findUnique({where: {email: user.email}})
        if(foundUser) throw new httpException(409,`User ${user.email} already exists`)
        //encriptar el password
        const passwordEncrypted= await bcrypt.hash(user.password,10)
        user.password=passwordEncrypted //por si escaso
        //guardar el usuario en la bd
        return await client.user.create({
            data:{
            ...user,
            password: passwordEncrypted,
            role: null
        },
        omit:{
            password:true
        }
        })
        
    }

    static async logout(req: Request, res: Response, next: NextFunction) {
        try {
            res.clearCookie('token')
            res.status(204).json({ message: 'Logout successfully:' })
        } catch (error) {
            next(error)
        }
    }

}

