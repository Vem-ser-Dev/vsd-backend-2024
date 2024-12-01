import { FastifyInstance } from "fastify";
import { serviceCategoryController } from "../../controllers/serviceCategory/serviceCategoryController";

export function serviceCategoryPublicRoutes(app: FastifyInstance) {
  app.get("/serviceCategory", serviceCategoryController.findManyCategories);
}
