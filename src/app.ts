import fastify from "fastify";
import { handleDatabaseConnection } from "./database/database";
import { errorHandler } from "./middlewares/errorMidleware";
import { authPublicRoutes } from "./routes/auth/authPublicRoutes";

export const app = fastify();

app.addHook("onError", errorHandler);

app.addHook("preHandler", async (request) => {
  console.log(`[${request.method}] ${request.url}`);
});

app.register(handleDatabaseConnection);

app.register(authPublicRoutes);

// app.addHook("preHandler", authMiddleware);
