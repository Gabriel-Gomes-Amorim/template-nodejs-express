import { z } from "zod";

export const schemaCreateValidationUser = z.object({
  email: z.string().email(),
  name: z.string(),
  telephone: z.string(),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "A senha deve conter letras maiúsculas e minúsculas, caracteres especiais e números."
    ),
});

export const schemaUpdateValidationUser = z.object({
  name: z.string().optional(),
  telephone: z.string().optional(),
});
