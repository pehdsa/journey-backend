import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { env } from '../env'
import { ClientError } from "../errors/client-error"; 

export async function confirmParticipant(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().patch("/participants/:participantId/confirm", {
        schema: {
            params: z.object({
                participantId: z.string().uuid(),
            }),
            body: z.object({
                name: z.string().min(4),
                email: z.string().email()
            })
        }
    }, async (request, reply) => {
        const { participantId } = request.params;
        const { email, name } = request.body;

        const participant = await prisma.participant.findUnique({
            where: {
                id: participantId,
                email
            }
        })

        if (!participant) {
            throw new ClientError("Participant not found");
        }

        await prisma.participant.update({
            where: { id: participantId },
            data: { 
                name,
                is_confirmed: true 
            },
        })

        return { participantId: participantId }

    })
}