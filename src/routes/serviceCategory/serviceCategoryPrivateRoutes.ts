import { FastifyInstance } from "fastify";
import { serviceCategoryController } from "../../controllers/serviceCategory/serviceCategoryController";
import { authMiddleware } from "../../middlewares/authMiddleware";

export function serviceCategoryPrivateRoutes(app: FastifyInstance) {
  app.post(
    "/create",
    { preHandler: [authMiddleware] },
    serviceCategoryController.createCategory
  );

  app.put(
    "/:uid",
    { preHandler: [authMiddleware] },
    serviceCategoryController.updateCategory
  );
}
