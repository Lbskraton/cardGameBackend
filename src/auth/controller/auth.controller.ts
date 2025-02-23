import { NextFunction, Request, Response } from "express"
import AuthService from "../service/auth.service"

//Se comunica con el cliente
class AuthController{
    
    static async register(req:Request,res:Response,next:NextFunction){
        try {
            const userData = req.body
            const newUser = await AuthService.register(userData)
            res.status(201).json({message:'User register successfully', newUser})
        } catch (error) {
            next(error)
        }
        
    }

    static async login(req:Request,res:Response,next:NextFunction) {


        try {
            //consulto user exists
            const userData=req.body //vienen por post en el cuerpo de la peticion
            const token=await AuthService.login(userData.email,userData.password)
            //generar token autenticacion como cookie
            res.cookie('token',token,{
                maxAge: 60*60*1000,
                httpOnly:true, // no accesible por js
                secure: false, //solo se activa si usas hhtps
                sameSite: 'strict' //solo valido si = sitio (= dominio back+front)(seguro csrf)
            })
            res.status(201).json({message:"Login succesfull",token})
            
        } catch (error) {
            next(error)
        }
        
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

export default AuthController