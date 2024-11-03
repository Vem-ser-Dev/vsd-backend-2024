import { FastifyInstance } from "fastify";
import { authController } from "../../controllers/authController";

export function authPublicRoutes(app: FastifyInstance) {
  app.post("/login", authController.login);
}
