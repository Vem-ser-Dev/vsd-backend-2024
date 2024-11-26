import { FastifyInstance } from "fastify";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { socialServicesController } from "../../controllers/socialService/socialServicesController";

export function socialServicesPrivateRoutes(app: FastifyInstance) {
  app.post(
    "/create",
    { preHandler: [authMiddleware] },
    socialServicesController.createService
  );

  app.put(
    "/:uid",
    { preHandler: [authMiddleware] },
    socialServicesController.updateService
  );

  app.get(
    "/",
    { preHandler: [authMiddleware] },
    socialServicesController.findManyServices
  );
}
