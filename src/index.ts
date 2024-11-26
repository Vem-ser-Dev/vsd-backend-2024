import { app } from "./app";
import { appDataSource } from "./database/dataSource";
import { createInitialCategories } from "./database/seeds/createInitialCategories";
import { createUser } from "./database/seeds/createUser";
import { env } from "./env";

export async function initServer() {
  try {
    const dataSource = await appDataSource.initialize();

    await createUser(dataSource);

    await createInitialCategories(dataSource);

    console.log("Data Source has been initialized!");

    await app.listen({ port: env.APP_PORT });
  } catch (err) {
    console.log("err", err);
    process.exit(1);
  }
}

initServer();
