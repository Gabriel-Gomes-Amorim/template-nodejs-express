import { UsersRepository } from "@modules/users/infra/repositories/users-repository";
import { User } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindByIdUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: UsersRepository
    ) {}

    async execute(id: string): Promise<User> {
        const user: User = await this.usersRepository.findById(id);

        if (!user) {
            throw new AppError("Usuário não encontrado", 404);
        }

        return user;
    }
}
