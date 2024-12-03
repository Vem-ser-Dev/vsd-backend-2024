import {
  DataSource,
  DataSourceOptions,
} from "../../node_modules/typeorm/index";
import { env } from "../env/index";
import { ServiceCategory } from "./entities/ServiceCategory";
import { SocialService } from "./entities/SocialService";
import { User } from "./entities/User";

export const typeOrmConnectionOptions: DataSourceOptions = {
  type: "postgres",
  // url: env.DB_URL,
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  synchronize: false,
  entities: [User, SocialService, ServiceCategory],
};

export const appDataSource = new DataSource(typeOrmConnectionOptions);
