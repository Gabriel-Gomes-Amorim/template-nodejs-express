import "reflect-metadata";

import { expect, describe, it, beforeEach } from "vitest";
import { FindByIdUserUseCase } from "./find-by-id-user-useCase";
import { User } from "@prisma/client";
import { hash } from "bcrypt";
import { AppError } from "@shared/errors/AppError";
import { InMemoryUsersRepository } from "@modules/users/infra/repositories/in-memory/in-memory-users-repository";

let userRepository: InMemoryUsersRepository;
let sut: FindByIdUserUseCase;

describe("Find By Id User Use Case", (): void => {
    beforeEach((): void => {
        userRepository = new InMemoryUsersRepository();
        sut = new FindByIdUserUseCase(userRepository);
    });

    it("should be able to find user profile by ID", async (): Promise<void> => {
        const createdUser: User = await userRepository.create({
            name: "John Doe",
            email: "johndoe@example.com",
            telephone: "99999999999",
            password: await hash("@Teste123", 6),
        });

        const user: User = await sut.execute(createdUser.id);

        expect(user.name).toEqual("John Doe");
    });

    it("should not be able to get user profile with wrong id", async (): Promise<void> => {
        await expect(
            (): Promise<User> => sut.execute("non-existing-id")
        ).rejects.toBeInstanceOf(AppError);
    });
});
