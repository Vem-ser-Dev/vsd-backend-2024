import { FastifyInstance } from "fastify";
import { DataSource, DataSourceOptions } from "typeorm";
import { env } from "../env";
import { User } from "./entities/User";

export async function handleDatabaseConnection(app: FastifyInstance) {
  const typeOrmConnectionOptions: DataSourceOptions = {
    type: "postgres",
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DB,
    entities: [User],
    migrations: ["src/database/migrations/*.ts"],
  };

  const db = new DataSource(typeOrmConnectionOptions);

  await db.initialize();
  console.log("Connected to the database successfully");

  app.decorate("db", db);
}
