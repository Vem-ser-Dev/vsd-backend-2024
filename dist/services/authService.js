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
exports.authService = exports.AuthService = void 0;
const JWT_SECRET = process.env.JWT_SECRET;
class AuthService {
    // { email, password }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            //   const user = await User.findOne({ where: { email } });
            //   if (!user) {
            //     throw new BadRequestError("Invalid credentials");
            //   }
            //   const isPasswordValid = await bcrypt.compare(password, user.password);
            //   if (!isPasswordValid) {
            //     throw new BadRequestError("Invalid credentials");
            //   }
            //   const token = jwt.sign(
            //     {
            //       userId: user.id,
            //       email: user.email,
            //     },
            //     JWT_SECRET,
            //     { expiresIn: "24h" }
            //   );
            //   return {
            //     token,
            //     user: {
            //       id: user.id,
            //       name: user.name,
            //       email: user.email,
            //     },
            //   };
        });
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
