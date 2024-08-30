import { Router } from "express";
import { FindAllUserController } from "@modules/users/use-cases/find-all-user/find-all-user-controller";
import { CreateUserController } from "@modules/users/use-cases/create-user/create-user-controller";
import { FindByIdUserController } from "@modules/users/use-cases/find-by-id-user/find-by-id-user-controller";
import { UpdateUserController } from "@modules/users/use-cases/update-user/update-user-controller";

const createUserController = new CreateUserController();
const findByIdUserController = new FindByIdUserController();
const findAllUsersController = new FindAllUserController();
const updateUserController = new UpdateUserController();

export const usersRoutes: Router = Router();

usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/:id", findByIdUserController.handle);
usersRoutes.get("/", findAllUsersController.handle);
usersRoutes.put("/:id", updateUserController.handle);
