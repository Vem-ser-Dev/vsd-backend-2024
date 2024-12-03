import {
  DataSource,
  DataSourceOptions,
} from "../../node_modules/typeorm/index";
import { ServiceCategory } from "./entities/ServiceCategory";
import { SocialService } from "./entities/SocialService";
import { User } from "./entities/User";
import { UpdateDescriptionColumnType1733189301036 } from "./migrations/1733189301036-updateDescriptionColumnType";

const typeOrmConnectionOptions: DataSourceOptions = {
  type: "postgres",
  // url: "",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "main",
  synchronize: false,
  entities: [User, SocialService, ServiceCategory],
  migrations: [UpdateDescriptionColumnType1733189301036],
};

const appDataSource = new DataSource(typeOrmConnectionOptions);

module.exports = appDataSource;
