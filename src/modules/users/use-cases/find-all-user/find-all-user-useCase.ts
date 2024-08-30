import { UsersRepository } from "@modules/users/infra/repositories/users-repository";
import { User } from "@prisma/client";
import { inject, injectable } from "tsyringe";

interface FindAllUsersParams {
    page: number;
    limit: number;
}

interface FindAllUsersResponse {
    users: User[];
    totalUsers: number;
}

@injectable()
export class FindAllUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: UsersRepository
    ) {}

    async execute(params: FindAllUsersParams): Promise<FindAllUsersResponse> {
        const { page, limit } = params;

        const offset: number = (page - 1) * limit;

        const users: User[] = await this.usersRepository.findAll({
            skip: offset,
            take: limit,
        });

        const totalUsers: number = await this.usersRepository.countAll();

        return { users, totalUsers };
    }
}
