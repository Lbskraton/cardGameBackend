import { Deck } from '@prisma/client'
import { prisma } from "../../database/database"
import { httpException } from '../../exceptions/httpException'

export default class DeckService{

    static async create(deck:Deck){
        return await prisma.deck.create( {data: {
            ...deck
          }})

    }

    static async delete(id:number) {

        const foundGametype=await prisma.deck.findUnique({where:{id}})
        if(!foundGametype) throw new httpException(404,'Deck not found')
        return await prisma.deck.delete({where:{id}})      
    }

    static async update(id:number,deck:Deck){

        const foundGametype=await prisma.deck.findUnique({where:{id}})
        if(!foundGametype) throw new httpException(404,'Deck not found')
        return await prisma.deck.update({where:{id},data:{...deck}})
        
    }

    static async getAll(){
        const decks=await prisma.deck.findMany()
        console.log(decks)
        return decks
    }

    
        
    

}