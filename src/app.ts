import fastify from "fastify";
import { errorHandler } from "./middlewares/errorMidleware";
import { authPublicRoutes } from "./routes/auth/authPublicRoutes";
import { socialServicesPrivateRoutes } from "./routes/socialServices/socialServicesPrivateRoutes";
import { socialServicesPublicRoutes } from "./routes/socialServices/socialServicesPublicRoutes";
import { serviceCategoryPrivateRoutes } from "./routes/serviceCategory/serviceCategoryPrivateRoutes";

export const app = fastify();

app.addHook("preHandler", async (request) => {
  console.log(`[${request.method}] ${request.url}`);
});

app.register(authPublicRoutes);

app.register(socialServicesPrivateRoutes, {
  prefix: "socialServices",
});

app.register(serviceCategoryPrivateRoutes, {
  prefix: "serviceCategory",
});

app.register(socialServicesPublicRoutes, {
  prefix: "public",
});

app.addHook("onError", errorHandler);
