import { FastifyRequest } from "fastify";
import { z } from "zod";

export async function loginValidation(request: FastifyRequest) {
  const loginBodySchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z
      .string()
      .min(8, "Password is required")
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must have at least 8 characters, 1 number, 1 capital letter and a symbol"
      ),
  });

  const result = await loginBodySchema.parseAsync(request.body);

  return result;
}
