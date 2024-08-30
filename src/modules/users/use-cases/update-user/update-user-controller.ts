import { Request, Response } from "express";
import { container } from "tsyringe";
import { User } from "@prisma/client";
import { IUpdateUserDTO } from "@modules/users/dtos/update-user-DTO";
import { UpdateUserUseCase } from "./update-user-useCase";

export class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const { name, telephone, activated }: IUpdateUserDTO = request.body;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    const updateUser: User = await updateUserUseCase.execute(id, {
      name,
      telephone,
      activated,
    });

    return response.status(200).json({
      status: true,
      data: updateUser,
    });
  }
}
