import { httpException } from "../exceptions/httpException";
import { NextFunction,Response,Request } from "express";
import { validationResult } from "express-validator";

export const ValidationMiddleware=(req:Request,res:Response,next:NextFunction):any=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        //next(throw httpException(400,errors.array().redu))
        return res.status(400).json({error:errors.array()})
    }
    next()
}