import { prisma } from "@shared/infra/prisma";
import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { FindAllOptions } from "@shared/infra/prisma/interfaces/findAllOptions";

export class PrismaUsersRepository implements UsersRepository {
  async create(user: User): Promise<User> {
    return await prisma.user.create({
      data: user,
    });
  }

  async update(user_id: string, user: Prisma.UserUpdateInput): Promise<User> {
    return await prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        name: user.name,
        telephone: user.telephone,
      },
    });
  }

  async findById(id: string): Promise<User> {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findTelephone(telephone: string): Promise<User | null> {
    return await prisma.user.findFirst({
      where: {
        telephone,
      },
    });
  }

  async findAll(options?: FindAllOptions): Promise<User[]> {
    return await prisma.user.findMany({
      ...options,
    });
  }
  async countAll(): Promise<number> {
    const totalUsers: number = await prisma.user.count();
    return totalUsers;
  }
  async findByEmail(email: string): Promise<User> {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }
}
