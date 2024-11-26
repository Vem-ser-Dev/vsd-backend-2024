import bcrypt from "bcrypt";
import { DataSource } from "typeorm";
import { User } from "../entities/User";

export async function createUser(appDataSource: DataSource) {
  const userData = new User();

  const salt = await bcrypt.genSalt(10);
  const hashed_password = await bcrypt.hash("Pecege@1", salt);

  userData.uid = "55918137-2ef4-4967-9405-66c9da7144ef";
  userData.full_name = "admin";
  userData.email = "admin@teste.com";
  userData.document = "12312312312";
  userData.password = hashed_password;
  userData.created_at = new Date();

  const userExist = await appDataSource.manager.findOne(User, {
    where: {
      uid: userData.uid,
    },
  });

  if (!userExist) {
    await appDataSource.manager.save(userData);

    console.log("create user with success!");
  }

  console.log("create user seed conclusion!");
}
