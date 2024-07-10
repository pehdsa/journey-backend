import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function listTrip(app: FastifyInstance) {
    app.get("/listar", async () => {
        const trips = await prisma.trip.findMany();
        return trips
    })
}