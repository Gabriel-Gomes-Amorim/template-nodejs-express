import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DB_USERNAME: z.coerce.string(),
  DB_PASSWORD: z.coerce.string(),
  DB_DATABASE: z.coerce.string(),
  DATABASE_URL: z.coerce.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("invalid environment variables", _env.error.format());

  throw new Error("Invalid environment variables");
}

export const env = _env.data;
