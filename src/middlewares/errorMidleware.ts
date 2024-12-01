import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { BadRequestError, NotFoundError } from "../models/exceptions";
import { ZodError } from "zod";

export type HandledError = ZodError | NotFoundError | Error;

export const errorHandler = (
  request: FastifyRequest,
  reply: FastifyReply,
  error: unknown
) => {
  console.log("err", error);

  if (error instanceof ZodError || error instanceof BadRequestError) {
    reply.status(400).send({ message: "Invalid data" });
  } else if (error instanceof NotFoundError) {
    reply.status(404).send({ message: error.message });
  } else {
    reply.status(500).send({ message: error });
  }
};
