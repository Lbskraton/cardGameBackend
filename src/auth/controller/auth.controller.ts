import { NextFunction, Request, Response } from "express"
import AuthService from "../service/auth.service"
import jwt from "jsonwebtoken";

const TOKEN_PASSWORD = process.env.TOKEN_PASSWORD || 'pass'

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

        console.log('Login requested')


        try {
            //consulto user exists
            const userData=req.body //vienen por post en el cuerpo de la peticion

            const { token, user } = await AuthService.login(userData.email, userData.password)
            //TODO inyectar cookie al cliente
            console.log(token, user)

            const validSameSiteValues = ["none", "lax", "strict"] as const; // Valores permitidos

            const sameSiteValue: "none" | "lax" | "strict" = validSameSiteValues.includes(process.env.COOKIE_SAME_SITE as "none" | "lax" | "strict")
            ? (process.env.COOKIE_SAME_SITE as "none" | "lax" | "strict")
            : "none"; // Si no es válido, usa "none" por defecto

            console.log(sameSiteValue)


            res.cookie('token', token, {
                maxAge: 60 * 60 * 1000 * 3, // 3 horas de caducidad
                httpOnly: true, // no se puede accerder mediante js
                secure: process.env.COOKIE_SECURE ? process.env.COOKIE_SECURE === "true" : true,// solo se envia si usas https
                sameSite: sameSiteValue, // Evita ataques CSRF

            })
            res.status(201).json({ message: 'Login successfully:', user })

            /*
            const token=await AuthService.login(userData.email,userData.password)
            //generar token autenticacion como cookie
            res.cookie('token',token,{
                maxAge: 60*60*1000,
                httpOnly:true, // no accesible por js
                secure: false, //solo se activa si usas hhtps
                sameSite: 'strict' //solo valido si = sitio (= dominio back+front)(seguro csrf)
            })
            res.status(201).json({message:"Login succesfull",token})*/
            
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

    static async getAuthenticatedUser (req: Request, res: Response, next: NextFunction){
        try {
            const token = req.cookies.token;
            if (!token)  res.status(401).json({ message: "No autenticado" });
            const decoded = jwt.verify(token, TOKEN_PASSWORD);
            res.status(200).json(decoded)
        } catch (error) {
            next(error)
        }
    };

  
    
}

export default AuthController