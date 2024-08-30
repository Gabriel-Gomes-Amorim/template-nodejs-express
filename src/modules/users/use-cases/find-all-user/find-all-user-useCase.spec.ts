import "reflect-metadata";
import { expect, describe, it, beforeEach } from "vitest";
import { FindAllUserUseCase } from "./find-all-user-useCase";
import { User } from "@prisma/client";
import { hash } from "bcrypt";
import { InMemoryUsersRepository } from "@modules/users/infra/repositories/in-memory/in-memory-users-repository";

let userRepository: InMemoryUsersRepository;
let findAllUserUseCase: FindAllUserUseCase;

describe("Find All User Use Case", (): void => {
    beforeEach((): void => {
        userRepository = new InMemoryUsersRepository();
        findAllUserUseCase = new FindAllUserUseCase(userRepository);
    });

    it("should be able to find all users", async (): Promise<void> => {
        const user1: User = await userRepository.create({
            name: "John Doe",
            email: "johndoe@example.com",
            telephone: "99999999999",
            password: await hash("@Teste123", 6),
        });

        const user2: User = await userRepository.create({
            name: "Jane Doe",
            email: "janedoe@example.com",
            telephone: "99999999999",
            password: await hash("@Teste123", 6),
        });

        const { users } = await findAllUserUseCase.execute({
            page: 1,
            limit: 10,
        });

        expect(users).toHaveLength(2);
        expect(users).toEqual(expect.arrayContaining([user1, user2]));
    });

    it("should return an empty array if no users are found", async (): Promise<void> => {
        const { users } = await findAllUserUseCase.execute({
            page: 1,
            limit: 10,
        });

        expect(users).toHaveLength(0);
    });
});
