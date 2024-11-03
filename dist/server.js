"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = startServer;
const fastify_1 = __importDefault(require("fastify"));
const authPublicRoutes_1 = require("./routes/auth/authPublicRoutes");
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const fastify = (0, fastify_1.default)({
            logger: true,
        });
        // fastify.addHook("preHandler", async (request) => {
        //   console.log(`[${request.method}] ${request.url}`);
        // });
        fastify.register(authPublicRoutes_1.authPublicRoutes, {
            prefix: "",
        });
        // fastify.addHook("onRequest", authMiddleware);
        // fastify.addHook("onError", errorHandler);
        try {
            yield fastify.listen({ port: 3000 });
        }
        catch (err) {
            fastify.log.error(err);
            process.exit(1);
        }
    });
}
