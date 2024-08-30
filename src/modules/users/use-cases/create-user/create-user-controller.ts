import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./create-user-useCase";
import { User } from "@prisma/client";
import { ICreateUserDTO } from "@modules/users/dtos/create-user-DTO";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { email, name, password, telephone }: ICreateUserDTO = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const createUser: User = await createUserUseCase.execute({
      email,
      name,
      password,
      telephone,
    });

    return response.status(201).json({
      status: true,
      data: createUser,
    });
  }
}
