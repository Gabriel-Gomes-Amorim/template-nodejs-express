import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllUserUseCase } from "./find-all-user-useCase";

export class FindAllUserController {
    async handle(request: Request, response: Response) {
        let { page = 1, limit = 10 } = request.query;

        page = Number(page);
        limit = Number(limit);

        const findAllUserUseCase = container.resolve(FindAllUserUseCase);

        const { users, totalUsers } = await findAllUserUseCase.execute({
            page: Number(page),
            limit: Number(limit),
        });

        const totalPages = Math.ceil(totalUsers / limit);

        return response.status(200).json({
            status: true,
            data: users,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                totalPages,
                totalUsers,
            },
        });
    }
}
