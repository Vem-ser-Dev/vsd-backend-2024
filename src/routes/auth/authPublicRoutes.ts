import { FastifyInstance } from "fastify";
import { authController } from "../../controllers/auth/authController";

export function authPublicRoutes(app: FastifyInstance) {
  app.post("/login", authController.login);
  app.get("/create-user", authController.createUser);
}
