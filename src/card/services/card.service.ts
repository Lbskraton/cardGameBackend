import { Card } from '@prisma/client'
import { prisma } from "../../database/database"
import { httpException } from '../../exceptions/httpException'
import DeckService from '../../deck/services/deck.service'

export default class CardService{

    static async create(userId:number,card:Card){
        const foundDeck=DeckService.getDeckById(card.deckId)
        if(!foundDeck) throw new httpException(404,'Card Respective Deck not found or not exists')
        return await prisma.card.create( {data: {
            ...card,
            idUserCreator:userId
          }})

    }

    static async getCardById(id:number) {
        const foundCard=await prisma.card.findUnique({where:{id}})
        if(!foundCard) throw new httpException(404,'Card not found')
        return await prisma.card.findUnique({where:{id}})      
    }

   

    static async delete(id:number) {

        const foundDeck=await prisma.deck.findUnique({where:{id}})
        if(!foundDeck) throw new httpException(404,'Deck not found')
        return await prisma.deck.delete({where:{id}})      
    }

    static async update(id:number,card:Card){

        const foundCard=await prisma.deck.findUnique({where:{id}})
        if(!foundCard) throw new httpException(404,'Deck not found')
        return await prisma.card.update({where:{id},data:{...card}})
        
    }

    static async getAll(){
        const cards=await prisma.card.findMany()
        //console.log(cards)
        return cards
    }

    
        
    

}