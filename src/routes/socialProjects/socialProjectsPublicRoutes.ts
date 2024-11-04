import { FastifyInstance } from "fastify";
import { socialProjectsController } from "../../controllers/socialProjects/socialProjectsController";

export function socialProjectsPublicRoutes(app: FastifyInstance) {
  app.get("/socialProjects", socialProjectsController.findManyPublicProjects);
}
