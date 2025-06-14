import { Game, Round, Score } from '@prisma/client'
import { prisma } from "../../database/database"
import { httpException } from '../../exceptions/httpException'


export default class scoreService{

    static async create(userId:number,roundId:number,score:Partial<Score>){
        const foundRound=await prisma.round.findUnique({where:{id:roundId}})
        if(!foundRound) throw new httpException(404,'Round not found')

        return await prisma.score.create({
            data: {
                ...score,
                idGameParticipant: userId,
                idRound:roundId

            },
        });


    }

    static async update(idGameParticipant:number,idRound:number,score:Score){
        const foundScore=await prisma.score.findUnique({where: {
                    idRound_idGameParticipant: {
                    idRound,
                    idGameParticipant,
                }
            }
        })
        if(!foundScore) throw new httpException(404,'Score not found')
        return await prisma.score.update({where:{idRound_idGameParticipant:{idRound,idGameParticipant}},data:{...score}})

    }

    static async delete(idGameParticipant:number,idRound:number){
         const foundScore=await prisma.score.findUnique({where: {
                    idRound_idGameParticipant: {
                    idRound,
                    idGameParticipant,
                }
            }
        })
        if(!foundScore) throw new httpException(404,'Score not found')
        return await prisma.score.delete({where:{idRound_idGameParticipant:{idRound,idGameParticipant}}})
    }


    static async getScoresByUserAndGame(userId: number, gameId: number) {
        // Busco el GameParticipant asociado al usuario en ese juego
        const participant = await prisma.gameParticipant.findUnique({
            where: {
                gameId_userId: { 
                    gameId,
                    userId,
                }
            },
            include: {
            scores: {
                include: { round: true } // Incluye información de la ronda si lo deseas
            }
            }
         });

        if (!participant) throw new httpException(404,'User not present in this game when searching scores')// si no encuentro nada, no eres un participante lanzo error


        return participant.scores;
    }
}