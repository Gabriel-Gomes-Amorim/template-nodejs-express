import { User } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";
import { schemaUpdateValidationUser } from "@shared/infra/zod/user";
import { inject, injectable } from "tsyringe";
import { UsersRepository } from "@modules/users/infra/repositories/users-repository";
import { IUpdateUserDTO } from "@modules/users/dtos/update-user-DTO";

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ) {}

  async execute(user_id: string, user: IUpdateUserDTO): Promise<User> {
    const { name, telephone, activated } = user;

    const validateData: IUpdateUserDTO = this.validationDataUpdateUser(user);

    const findUser: User | null = await this.usersRepository.findById(user_id);

    if (!findUser) {
      throw new AppError("Usuário não enontrado.", 400, "USER_NOT_FOUND");
    }

    const updatedUser: User = await this.usersRepository.update(user_id, {
      name: name,
      telephone: telephone,
      activated: activated,
      updated_at: new Date(),
    });

    return updatedUser;
  }

  private validationDataUpdateUser(user: IUpdateUserDTO): IUpdateUserDTO {
    const _validated = schemaUpdateValidationUser.safeParse(user);

    if (_validated.success === false) {
      throw new AppError(
        JSON.parse(JSON.stringify(_validated.error.format())),
        400
      );
    }

    return _validated.data as IUpdateUserDTO;
  }
}
