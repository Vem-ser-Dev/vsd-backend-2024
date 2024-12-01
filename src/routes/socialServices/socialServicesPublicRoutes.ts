import { FastifyInstance } from "fastify";
import { socialServicesController } from "../../controllers/socialService/socialServicesController";

export function socialServicesPublicRoutes(app: FastifyInstance) {
  app.get("/socialServices", socialServicesController.findManyPublicProjects);

  app.get("/socialServices/:uid", socialServicesController.getPublicProject);
}
