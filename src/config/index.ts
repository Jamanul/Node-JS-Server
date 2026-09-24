import dotenv, { configDotenv } from "dotenv";
import path from "path";

configDotenv({ path: path.join(process.cwd(), ".env") });

const config = {
  env: process.env.NODE_ENV ? Number(process.env.NODE_ENV) : "Development",
  port: process.env.PORT ? Number(process.env.PORT) : 8080,
};

export default config;
