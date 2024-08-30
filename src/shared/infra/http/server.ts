import { env } from "@shared/env";
import { app } from "./app";

app.listen(env.PORT, (): void =>
  console.log(`🚀 Server Running: http://localhost:${env.PORT}`)
);
