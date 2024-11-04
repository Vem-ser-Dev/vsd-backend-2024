import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { BadRequestError } from "../../models/exceptions";
import { appDataSource } from "../../database/dataSource";
import { User } from "../../database/entities/User";

const JWT_SECRET = process.env.JWT_SECRET!;

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

  // TODO - será substituido por uma migration.
  async createUser() {
    const userData = new User();

    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash("Pecege@1", salt);

    userData.uid = crypto.randomUUID();
    userData.full_name = "admin";
    userData.email = "admin@teste.com";
    userData.document = "12312312312";
    userData.password = hashed_password;
    userData.created_at = new Date();

    const res = await appDataSource.manager.save(userData);

    console.log("res", res);
    return "temporary create user";
  }
}

export const authService = new AuthService();
