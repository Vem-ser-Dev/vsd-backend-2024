import { app } from "./app";
import { appDataSource } from "./database/dataSource";
import { env } from "./env";
import { createUser } from "./seed";

export async function initServer() {
  try {
    const dataSource = await appDataSource.initialize();

    await createUser(dataSource);

    console.log("Data Source has been initialized!");

    await app.listen({ port: env.PORT });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

initServer();
