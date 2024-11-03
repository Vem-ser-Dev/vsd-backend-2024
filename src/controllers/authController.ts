import { FastifyReply, FastifyRequest } from "fastify";
import { authService } from "../services/authService";
import { z } from "zod";

async function loginValidation(request: FastifyRequest) {
  const loginBodySchema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
      ),
  });

  const result = await loginBodySchema.parseAsync(request.body);

  return result;
}

export class AuthController {
  async login(request: FastifyRequest, reply: FastifyReply) {
    const res = await loginValidation(request);

    // const result = await authService.login(res);

    // return result;

    return reply.code(200).send({
      hello: "world",
    });
  }
}

export const authController = new AuthController();
