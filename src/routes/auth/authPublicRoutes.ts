import { FastifyInstance } from "fastify";
import { authController } from "../../controllers/auth/authController";

export function authPublicRoutes(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    reply.code(200).send({
      hello: "world",
    });
  });

  app.post("/login", authController.login);
}
