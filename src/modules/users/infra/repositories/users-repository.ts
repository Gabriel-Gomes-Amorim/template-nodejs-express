import { Prisma, User } from "@prisma/client";
import { FindAllOptions } from "@shared/infra/prisma/interfaces/findAllOptions";

export interface UsersRepository {
  create(user: Prisma.UserCreateInput): Promise<User>;

  update(user_id: string, user: Prisma.UserUpdateInput): Promise<User>;

  findById(id: string): Promise<User | null>;

  findTelephone(telephone: string): Promise<User | null>;

  findAll(options?: FindAllOptions): Promise<User[] | null>;

  countAll(): Promise<number>;

  findByEmail(email: string): Promise<User | null>;
}
