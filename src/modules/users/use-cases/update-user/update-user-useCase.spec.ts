import "reflect-metadata";
import { expect, describe, it, beforeEach } from "vitest";
import { User } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";
import { InMemoryUsersRepository } from "@modules/users/infra/repositories/in-memory/in-memory-users-repository";
import { UpdateUserUseCase } from "./update-user-useCase";

let userRepository: InMemoryUsersRepository;
let sut: UpdateUserUseCase;

describe("Update User Use Case", (): void => {
  beforeEach((): void => {
    userRepository = new InMemoryUsersRepository();
    sut = new UpdateUserUseCase(userRepository);
  });

  it("should update user details", async (): Promise<void> => {
    const createdUser: User = await userRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      telephone: "99999999999",
      password: "@Teste123",
    });

    const updatedUser: User = await sut.execute(createdUser.id, {
      name: "John Updated",
      telephone: "88888888888",
    });

    expect(updatedUser.name).toBe("John Updated");
    expect(updatedUser.telephone).toBe("88888888888");
  });

  it("should not update non-existing user", async (): Promise<void> => {
    await expect(
      sut.execute("non-existing-id", {
        name: "Non Existing",
        telephone: "88888888888",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
