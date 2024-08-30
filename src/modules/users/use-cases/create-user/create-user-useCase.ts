import { User } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";
import { schemaCreateValidationUser } from "@shared/infra/zod/user";
import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";
import { UsersRepository } from "@modules/users/infra/repositories/users-repository";
import { ICreateUserDTO } from "@modules/users/dtos/create-user-DTO";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ) {}

  async execute(user: ICreateUserDTO): Promise<User> {
    const { email, password, name, telephone } = user;

    const validateData: ICreateUserDTO = this.validationDataCreateUser(user);

    const passwordHash: string = await hash(password, 6);

    const userAlreadyExists: User | null =
      await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError(
        "O e-mail informado já está cadastrado.",
        400,
        "USER_EXISTS"
      );
    }

    const findByTelephone: User | null =
      await this.usersRepository.findTelephone(telephone);

    if (findByTelephone) {
      throw new AppError(
        "O telefone informado já está cadastrado.",
        400,
        "USER_TELEPHONE_EXISTS"
      );
    }

    const createdUser: User = await this.usersRepository.create({
      email: email,
      name: name,
      telephone: telephone,
      password: passwordHash,
    });

    return createdUser;
  }

  private validationDataCreateUser(user: ICreateUserDTO): ICreateUserDTO {
    const _validated = schemaCreateValidationUser.safeParse(user);

    if (_validated.success === false) {
      throw new AppError(
        JSON.parse(JSON.stringify(_validated.error.format())),
        400
      );
    }

    return _validated.data as ICreateUserDTO;
  }
}
