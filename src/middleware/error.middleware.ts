import { httpException } from "../exceptions/httpException";
import { NextFunction, Request,Response } from "express";

export const ErrorMiddleware=(error:httpException,req:Request,res:Response,next:NextFunction)=>{
    try {
        const status=error.status || 500
        const message=error.message || 'Something wrong happened'
        res.status(status).json({message})
    } catch (error) {
        next()
    }

}