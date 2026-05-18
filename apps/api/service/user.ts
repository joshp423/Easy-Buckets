import bcrypt from "bcryptjs";
import type { UserRepo } from "../repo/users.js";
import jwt from "jsonwebtoken";
import type { configSchema } from "./config.js";

export type User = { password: string; email: string };

export class UserService {
  private config: configSchema;
  private userRepo: UserRepo;

  constructor(userRepo: UserRepo, config: configSchema) {
    this.userRepo = userRepo;
    this.config = config;
  }

  async create({ password, email }: User) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userRepo.create(hashedPassword, email);
  }

  async get(email: string) {
    return this.userRepo.get(email);
  }

  async login(id: number, password: string, hashedPassword: string) {
    if (!(await bcrypt.compare(password, hashedPassword))) {
      return null;
    }

    const token = jwt.sign({ id }, this.config.JWT_SECRET, {
      expiresIn: "1w",
    });

    return token;
  }
}
