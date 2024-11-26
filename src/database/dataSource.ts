import {
  DataSource,
  DataSourceOptions,
} from "../../node_modules/typeorm/index";
import { env } from "../env";
import { ServiceCategory } from "./entities/ServiceCategory";
import { SocialService } from "./entities/SocialService";
import { User } from "./entities/User";

export const typeOrmConnectionOptions: DataSourceOptions = {
  type: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  synchronize: env.DB_HOST === "localhost" ? true : false,
  entities: [User, SocialService, ServiceCategory],
  migrations: [__dirname + "migrations/*.js"],
  migrationsTableName: "migration_table",
};

export const appDataSource = new DataSource(typeOrmConnectionOptions);
