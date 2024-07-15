import fastify from "fastify";
import cors from "@fastify/cors";
import { createTrip } from "./routes/create-trip";
import { confirmTrip } from "./routes/confirm-trip";
import { confirmParticipant } from "./routes/confirm-participant";
import { listTrip } from "./routes/list-trip";
import { createActivity } from "./routes/create-activities";
import { getActivities } from "./routes/get-activities";
import { createLink } from "./routes/create-links";
import { getLinks } from "./routes/get-links";
import { getParticipants } from "./routes/get-participants";
import { createInvite } from "./routes/create-invite";
import { updateTrip } from "./routes/update-trip";
import { getTripDetails } from "./routes/get-trip-details";
import { getParticipant } from "./routes/get-participant";
import { validatorCompiler, serializerCompiler } from "fastify-type-provider-zod"
import { errorHandler } from './error-handler'
import { env } from './env'

const app = fastify();

app.register(cors, {
    origin: '*'
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler(errorHandler)

app.register(createTrip);
app.register(confirmTrip);
app.register(listTrip);
app.register(updateTrip)
app.register(confirmParticipant)
app.register(createActivity)
app.register(getActivities)
app.register(createLink)
app.register(getLinks)
app.register(getParticipants)
app.register(createInvite)
app.register(getTripDetails)
app.register(getParticipant)


app.listen({ 
    port: env.PORT,
    host: '0.0.0.0'
}).then(() => {
    //@ts-ignore
    console.log('server running')
})