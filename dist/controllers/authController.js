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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.AuthController = void 0;
const zod_1 = require("zod");
function loginValidation(request) {
    const loginBodySchema = zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z
            .string()
            .min(8)
            .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/),
    });
    return loginBodySchema.parse(request.body);
}
class AuthController {
    login(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            // const { email, password } = loginValidation(request);
            // const result = await authService.login();
            // return result;
            return reply.code(200).send({
                hello: "world",
            });
        });
    }
}
exports.AuthController = AuthController;
exports.authController = new AuthController();
