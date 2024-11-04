import { app } from "./app";
import { appDataSource } from "./database/dataSource";
import { env } from "./env";

export async function initServer() {
  try {
    await appDataSource.initialize();
    console.log("Data Source has been initialized!");

    await app.listen({ port: env.PORT });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

initServer();
