import { app } from "./app";
import { appDataSource } from "./database/dataSource";

export async function initServer() {
  try {
    await appDataSource.initialize();

    // await createUser(dataSource);

    // await createInitialCategories(dataSource);

    console.log("Data Source has been initialized!");

    await app.listen({ port: 5001, host: "0.0.0.0" });
  } catch (err) {
    console.log("err", err);
    process.exit(1);
  }
}

initServer();
