"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const exceptions_1 = require("../models/exceptions");
const zod_1 = require("zod");
const errorHandler = (request, reply, error) => {
    console.error("Got an error", error);
    if (error instanceof zod_1.ZodError || error instanceof exceptions_1.BadRequestError) {
        reply.status(400).send({ message: "Invalid data" });
    }
    else if (error instanceof exceptions_1.NotFoundError) {
        reply.status(404).send({ message: error.message });
    }
    // if (error instanceof NotFoundError) {
    //   reply.status(404).send({ message: err.message });
    // } else
    else {
        reply.status(500).send({ message: error });
    }
};
exports.errorHandler = errorHandler;
