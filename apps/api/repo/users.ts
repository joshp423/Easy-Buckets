import type { PrismaClient } from "@prisma/client";

export class UserRepo {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(password: string, email: string) {
    return await this.prisma.users.create({
      data: {
        email,
        password,
      },
    });
  }

  async get(email: string) {
    return await this.prisma.users.findUnique({
      where: {
        email,
      },
    });
  }
}
