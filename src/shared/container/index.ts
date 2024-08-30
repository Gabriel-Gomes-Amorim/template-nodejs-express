import { PrismaUsersRepository } from "@modules/users/infra/repositories/prisma/prisma-users-repository";
import { UsersRepository } from "@modules/users/infra/repositories/users-repository";
import { container } from "tsyringe";

container.registerSingleton<UsersRepository>(
  "UsersRepository",
  PrismaUsersRepository
);
