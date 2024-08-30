import { Request, Response } from "express";
import { container } from "tsyringe";
import { User } from "@prisma/client";
import { FindByIdUserUseCase } from "./find-by-id-user-useCase";

export class FindByIdUserController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const findByIdUserUseCase = container.resolve(FindByIdUserUseCase);

        const user: User = await findByIdUserUseCase.execute(id);

        return response.status(200).json({
            status: true,
            data: user,
        });
    }
}
