import { UserTokens } from "@prisma/client";
import { prisma } from "@shared/infra/prisma";
import { UsersTokensRepository } from "../users-tokens-repository";
import { ICreateUserTokenDTO } from "@modules/users/dtos/Icreate-user-token-DTO";

export class PrismaUsersTokensRepository implements UsersTokensRepository {
    async create({
        expires_date,
        refresh_token,
        user_id,
    }: ICreateUserTokenDTO): Promise<UserTokens> {
        return await prisma.userTokens.create({
            data: {
                user_id: user_id,
                refresh_token: refresh_token,
                expires_date: expires_date,
            },
        });
    }

    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserTokens> {
        return await prisma.userTokens.findFirst({
            where: {
                user_id,
                refresh_token,
            },
        });
    }

    async deleteById(id: string): Promise<void> {
        await prisma.userTokens.delete({
            where: {
                id,
            },
        });
    }

    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        return await prisma.userTokens.findFirst({
            where: {
                refresh_token: refresh_token,
            },
        });
    }

    async findByUserId(user_id: string): Promise<UserTokens[]> {
        return await prisma.userTokens.findMany({
            where: {
                user_id,
            },
        });
    }
}
