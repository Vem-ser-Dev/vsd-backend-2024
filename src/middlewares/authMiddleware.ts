import { FastifyReply, FastifyRequest } from "fastify";
import * as jwt from "jsonwebtoken";

export const authMiddleware = (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const token = request.headers.authorization?.split(" ")[1];
  if (!token) {
    return reply.status(401).send({ message: "Unauthorized" });
  }
  jwt.verify(token, process.env.JWT_SECRET as string, (err) => {
    if (err) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
  });
};
