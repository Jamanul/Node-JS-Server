"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
(0, dotenv_1.configDotenv)({ path: path_1.default.join(process.cwd(), ".env") });
const config = {
    env: process.env.NODE_ENV ? Number(process.env.NODE_ENV) : "Development",
    port: process.env.PORT ? Number(process.env.PORT) : 8080,
};
exports.default = config;
