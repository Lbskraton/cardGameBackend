import { Request,Response,NextFunction} from "express";



export function isAdmin(req:Request,res:Response,next:NextFunction):any{
    const {role}=req.body.user
    //const token=req.headers.authorization?.split(" ")[1]
        
     try {

        if(role!='admin') return res.status(401).json({error:'You not have permission to see this'})
            
        
        next()
    } catch (error) {
            res.status(401).json({error})
    }
    

}