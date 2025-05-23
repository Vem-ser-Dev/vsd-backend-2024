import { config } from "dotenv";
import { z } from "zod";

if (process.env.NODE_ENV === "test") {
  config({ path: ".env.test" });
} else {
  config({ path: ".env" });
}

const envSchema = z.object({
  PROJECT_ENV: z.enum(["DEV", "PRD"]),

  INITIAL_CATEGORIES: z.string(),
  JWT_SECRET: z.string(),
  APP_PORT: z.coerce.number().default(5001),

  DB_HOST: z.string(),
  DB_PORT: z.coerce.number().default(5432),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),

  // DB_URL: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("Invalid environment variables!", _env.error.format());

  throw new Error("Invalid environment variables.");
}

export const env = _env.data;
