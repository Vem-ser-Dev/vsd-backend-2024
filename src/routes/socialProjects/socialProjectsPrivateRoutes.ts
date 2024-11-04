import { FastifyInstance } from "fastify";
import { socialProjectsController } from "../../controllers/socialProjects/socialProjectsController";
import { authMiddleware } from "../../middlewares/authMiddleware";

export function socialProjectsPrivateRoutes(app: FastifyInstance) {
  app.post(
    "/create",
    { preHandler: [authMiddleware] },
    socialProjectsController.createProject
  );

  app.put(
    "/:uid",
    { preHandler: [authMiddleware] },
    socialProjectsController.updateProject
  );

  app.get(
    "/",
    { preHandler: [authMiddleware] },
    socialProjectsController.findManyProjects
  );
}
