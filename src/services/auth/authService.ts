import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { BadRequestError } from "../../models/exceptions";
import { appDataSource } from "../../database/dataSource";
import { User } from "../../database/entities/User";
import { env } from "../../env";

const JWT_SECRET = env.JWT_SECRET!;

interface LoginPayload {
  email: string;
  password: string;
}

export class AuthService {
  async login({ email, password }: LoginPayload) {
    const user = await appDataSource.manager.findOne(User, {
      where: { email },
    });

    if (!user) {
      throw new BadRequestError("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestError("Invalid credentials");
    }

    const token = jwt.sign({ uid: user.uid, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return {
      token,
      userData: {
        uid: user.uid,
        full_name: user.full_name,
        email: user.email,
      },
    };
  }
}

export const authService = new AuthService();
