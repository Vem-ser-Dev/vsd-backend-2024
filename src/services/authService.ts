import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { BadRequestError } from "../models/exceptions";

const JWT_SECRET = process.env.JWT_SECRET!;

export class AuthService {
  // { email, password }
  async login() {
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
  }
}

export const authService = new AuthService();
