import { DataSource } from "typeorm";
import { env } from "../../env";
import { ECategoryStatus } from "../../models/ECategoryStatus";
import { ServiceCategory } from "../entities/ServiceCategory";
import { User } from "../entities/User";

export async function createInitialCategories(appDataSource: DataSource) {
  const categoryList = env.INITIAL_CATEGORIES.split(", ");

  for await (const categoryName of categoryList) {
    const serviceCategory = new ServiceCategory();
    serviceCategory.name = categoryName;
    serviceCategory.status = ECategoryStatus.ENABLED;
    serviceCategory.created_at = new Date();

    const userExist = await appDataSource.manager.findOneBy(ServiceCategory, {
      name: serviceCategory.name,
    });

    if (!userExist) {
      await appDataSource.manager.save(serviceCategory);

      console.log(`create category: "${categoryName}" with success!`);
    }
  }

  console.log("createInitialCategories seed conclusion!");
}
