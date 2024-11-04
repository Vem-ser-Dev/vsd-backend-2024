import { FastifyReply, FastifyRequest } from "fastify";
import { authService } from "../../services/auth/authService";
import { loginValidation } from "./validations/authValidation";

class AuthController {
  async login(request: FastifyRequest, reply: FastifyReply) {
    const res = await loginValidation(request);

    const result = await authService.login(res);

    return reply.code(200).send(result);
  }

  async createUser(request: FastifyRequest, reply: FastifyReply) {
    const result = await authService.createUser();

    return reply.code(201).send(result);
  }
}

export const authController = new AuthController();