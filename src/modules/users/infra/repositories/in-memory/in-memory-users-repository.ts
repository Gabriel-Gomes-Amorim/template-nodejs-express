import { User, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { UsersRepository } from "../users-repository";
import { IUpdateUserDTO } from "@modules/users/dtos/update-user-DTO";
import { hash } from "bcrypt";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async findById(id: string): Promise<User> {
    return this.items.find((item: User): boolean => item.id === id) || null;
  }

  async findTelephone(telephone: string): Promise<User | null> {
    return (
      this.items.find((item: User): boolean => item.telephone === telephone) ||
      null
    );
  }

  async findByEmail(email: string): Promise<User> {
    return (
      this.items.find((item: User): boolean => item.email === email) || null
    );
  }

  async findAll(): Promise<User[]> {
    return this.items;
  }

  async countAll(): Promise<number> {
    return this.items.length;
  }

  async update(user_id: string, data: IUpdateUserDTO): Promise<User> {
    const index: number = this.items.findIndex(
      (user: User): boolean => user.id === user_id
    );

    if (index === -1) {
      return null;
    }

    this.items[index] = {
      ...this.items[index],
      ...data,
      updated_at: new Date(),
    };

    return this.items[index];
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      telephone: data.telephone,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.items.push(user);

    return user;
  }
}
