export interface customJwtPayload{
    id:number,name:string,email:string,role:string
}


declare global{
    namespace Express{
        interface Request{
            user: customJwtPayload
        }
    }
}