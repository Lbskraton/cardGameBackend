import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const TOKEN_PASSWORD=process.env.TOKEN_PASSWORD || 'pass'

export const isAuthenticate=(req:Request,res:Response,next:NextFunction):any=>{
    const token=req.cookies.token
    //const token=req.headers.authorization?.split(" ")[1]
    if(!token) return res.status(401).json({error:'Access denied'})
    
    try {
        const tokenDecoded = jwt.verify(token, TOKEN_PASSWORD)
        //req.headers.user=tokenDecoded
        req.body.user=tokenDecoded
        //pasar el testigo al siguiente middleware
        next()
    } catch (error) {
        res.status(401).json({error:'Invalid token'})
    }

}