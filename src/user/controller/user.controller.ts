import { NextFunction, Request, Response } from "express"
import { UserService } from "../service/user.service"


class UserController{

    static async profile(req:Request,res:Response,next:NextFunction){

        try{
            const email=req.user.email
            const user=await UserService.getUserByEmail(email)
            res.status(200).json(user)
        }catch(error){
            next(error)
        }
        
        
    }

    static async listUsers(req:Request,res:Response,next:NextFunction){
        try{
            const users=await UserService.listAll()

        res.status(200).json(users)
        }catch(error){
            next(error)
            
        }
        

    }


}


export default UserController