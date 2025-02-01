import { PrismaClient,User } from '@prisma/client'
import { httpException } from "../../exceptions/httpException";
import { UserService } from "../../user/service/user.service";
import bcrypt from 'bcrypt'
import  jwt  from "jsonwebtoken";
import { createClient } from '@libsql/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';


const libsql = createClient({
    url: `${process.env.TURSO_DATABASE_URL}`,
    authToken: `${process.env.TURSO_AUTH_TOKEN}`,
  })
  
const adapter = new PrismaLibSQL(libsql)


const client=new PrismaClient({adapter})
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
            {expiresIn:"1h"})  
    }

    

    static async register(user:User):Promise<any>{
        console.log(user)
        if (!user.email) {
            throw new httpException(400, "Email is required");
        }
        
        const foundUser= await client.user.findUnique(
            {
                where: {email:user.email}
            }
        )
        if(!foundUser) throw new httpException(409,`User ${user.email} already exists`)
        //encriptar el password
        const passwordEncrypted= await bcrypt.hash(user.password,10)
        user.password=passwordEncrypted //por si escaso
        //guardar el usuario en la bd
        return await client.user.create({
            data:{...user,password:passwordEncrypted,role:null},
            omit:{password:true} //no devuelva el password
        })
        
    }

}

