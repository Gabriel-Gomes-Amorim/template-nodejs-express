import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";

interface RateLimiterOptions {
    max: number;
    windowMs: number;
}
export function createRateLimiter(
    options: RateLimiterOptions
): RateLimitRequestHandler {
    return rateLimit({
        max: options.max,
        windowMs: options.windowMs,
        message:
            "Você atingiu o limite de requisições. Por favor, tente novamente mais tarde.",
        standardHeaders: true,
        legacyHeaders: false,
        statusCode: 429,
    });
}
