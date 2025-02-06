export interface customJwtPayload{
    id:number,name:string,email:string,rol:string
}


declare global{
    namespace Express{
        interface Request{
            user: customJwtPayload
        }
    }
}