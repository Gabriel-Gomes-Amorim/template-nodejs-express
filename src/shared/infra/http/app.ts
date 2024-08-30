import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import "reflect-metadata";
import "express-async-errors";
import "@shared/container";
import { AppError } from "@shared/errors/AppError";
import { router } from "@shared/infra/http/routes";
import { errors } from "celebrate";
import { createRateLimiter } from "./middlewares/rateLimit";
import { RateLimitRequestHandler } from "express-rate-limit";
import helmet from "helmet";

export const app: Express = express();

const apiLimiter: RateLimitRequestHandler = createRateLimiter({
  max: 100,
  windowMs: 1 * 60 * 1000,
});

app.use(helmet());

app.use(cors());

app.use(express.json());

app.use(apiLimiter);

app.use(router);

app.use(errors());

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.status).json({
        message: err.message,
        status: false,
        code: err.code,
      });
    }

    return response.status(500).json({
      status: false,
      message: err.message,
    });
  }
);
