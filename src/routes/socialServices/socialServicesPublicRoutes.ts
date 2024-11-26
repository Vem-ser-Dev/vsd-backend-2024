import { FastifyInstance } from "fastify";
import { socialServicesController } from "../../controllers/socialService/socialServicesController";
import { serviceCategoryController } from "../../controllers/serviceCategory/serviceCategoryController";

export function socialServicesPublicRoutes(app: FastifyInstance) {
  app.get("/socialServices", socialServicesController.findManyPublicProjects);

  app.get("/socialServices/:uid", socialServicesController.getPublicProject);

  app.get("/serviceCategory", serviceCategoryController.findManyCategories);
}
