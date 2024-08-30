import { usersRoutes } from "./users.routes";
import { Router } from "express";

export const router = Router();

router.use("/user", usersRoutes);
