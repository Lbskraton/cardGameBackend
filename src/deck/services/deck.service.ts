import { Deck } from '@prisma/client'
import { prisma } from "../../database/database"
import { httpException } from '../../exceptions/httpException'

export default class DeckService{

    static async create(userId:number,deck:Deck){
        return await prisma.deck.create( {data: {
            ...deck,
            idUserCreator:userId
          }})

    }

    static async getDeckById(id:number) {
        const foundDeck=await prisma.deck.findUnique({where:{id}})
        if(!foundDeck) throw new httpException(404,'Deck not found')
        return await prisma.deck.findUnique({where:{id}})      
    }

    static async getDecksByName(name:string) {
        const foundDecks=await prisma.deck.findMany({
            where: name ?{  //meto una ternaria para filtrar
                name: {
                    contains: name
                }
            }:{},
            orderBy:{
                name: "desc"
                
            }
        })
        
        if(!foundDecks) throw new httpException(404,'Decks not found by name '+name)
        return foundDecks      
    }

     static async getSuites(id:number) {
        const foundDeck=await prisma.deck.findUnique({where:{id}})
        if(!foundDeck) throw new httpException(404,'Deck not found')
        //Obtengo las suites presentes en la baraja
        return await prisma.card.findUnique({where:{id},select:{ suit:true }})
    }



    static async getDeckCards(id:number) {
        const foundDeck=await prisma.deck.findUnique({where:{id}})
        if(!foundDeck) throw new httpException(404,'Deck not found')
        //Obtengo las cartas junto con el deck
        return await prisma.deck.findUnique({where:{id},include:{Cards: true}})
    }

    static async delete(id:number) {

        const foundDeck=await prisma.deck.findUnique({where:{id}})
        if(!foundDeck) throw new httpException(404,'Deck not found')
        return await prisma.deck.delete({where:{id}})      
    }

    static async update(id:number,deck:Deck){

        const foundDeck=await prisma.deck.findUnique({where:{id}})
        if(!foundDeck) throw new httpException(404,'Deck not found')
        return await prisma.deck.update({where:{id},data:{...deck}})
        
    }

    static async getAll(){
        const decks=await prisma.deck.findMany()
        console.log(decks)
        return decks
    }

    
        
    

}