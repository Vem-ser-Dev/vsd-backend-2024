import fastify from "fastify";
import { errorHandler } from "./middlewares/errorMidleware";
import { authPublicRoutes } from "./routes/auth/authPublicRoutes";
import { socialProjectsPrivateRoutes } from "./routes/socialProjects/socialProjectsPrivateRoutes";
import { socialProjectsPublicRoutes } from "./routes/socialProjects/socialProjectsPublicRoutes";

export const app = fastify();

app.addHook("preHandler", async (request) => {
  console.log(`[${request.method}] ${request.url}`);
});

app.register(authPublicRoutes);

app.register(socialProjectsPrivateRoutes, {
  prefix: "socialProjects",
});

app.register(socialProjectsPublicRoutes, {
  prefix: "public",
});

app.addHook("onError", errorHandler);
