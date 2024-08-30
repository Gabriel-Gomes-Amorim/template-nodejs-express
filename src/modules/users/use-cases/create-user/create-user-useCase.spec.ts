import "reflect-metadata";
import { expect, describe, it, beforeEach } from "vitest";
import { CreateUserUseCase } from "./create-user-useCase";
import { User } from "@prisma/client";
import { compare } from "bcrypt";
import { AppError } from "@shared/errors/AppError";
import { InMemoryUsersRepository } from "@modules/users/infra/repositories/in-memory/in-memory-users-repository";

let usersRepositoryInMemory: InMemoryUsersRepository;
let sut: CreateUserUseCase;

describe("Create User Use Case", (): void => {
  beforeEach((): void => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    sut = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should register a new user", async (): Promise<void> => {
    const user: User = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      telephone: "99999999999",
      password: "@Teste123",
    });

    expect(user).toHaveProperty("id");
    expect(user.name).toBe("John Doe");
    expect(user.email).toBe("johndoe@example.com");
    expect(user.telephone).toBe("99999999999");
  });

  it("should hash user password upon registration", async (): Promise<void> => {
    const password = "@Teste123";
    const user: User = await sut.execute({
      email: "teste.teste18@gmail.com",
      name: "teste",
      telephone: "99999999999",
      password,
    });

    const isPasswordCorrectlyHashed: boolean = await compare(
      password,
      user.password
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with the same email twice", async (): Promise<void> => {
    const email = "johndoe@example.com";

    await sut.execute({
      name: "John Doe",
      email,
      telephone: "99999999999",
      password: "@Teste123",
    });

    await expect(
      sut.execute({
        name: "Jane Doe",
        email,
        telephone: "88888888888",
        password: "@Teste123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to register with the same telephone twice", async (): Promise<void> => {
    const telephone = "99999999999";

    await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      telephone,
      password: "@Teste123",
    });

    await expect(
      sut.execute({
        name: "Jane Doe",
        email: "janedoe@example.com",
        telephone,
        password: "@Teste123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not allow invalid email format", async (): Promise<void> => {
    await expect(
      sut.execute({
        name: "John Doe",
        email: "invalid-email",
        telephone: "99999999999",
        password: "@Teste123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should validate required fields", async (): Promise<void> => {
    await expect(
      sut.execute({
        name: "",
        email: "",
        telephone: "",
        password: "",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
