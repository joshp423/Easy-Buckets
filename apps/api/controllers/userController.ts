import z from "zod";
import {
  emailErr,
  emailLengthErr,
  lengthErr,
  passwordAlphaNumericErr,
  type AuthRequest,
} from "./indexController.js";

import { type Request, type Response } from "express";
import prisma from "../lib/prisma.js";
import { UserService } from "../service/user.js";
import { UserRepo } from "../repo/users.js";
import { config } from "../service/config.js";

const userRepo = new UserRepo(prisma);
const userService = new UserService(userRepo, config);

const SignUpSchema = z.object({
  //parses the object to the schema, narrowing the types that are allowed
  password: z
    .string()
    .trim()
    .max(25, { message: `Password: ${lengthErr}` })
    .min(1, { message: `Password: ${lengthErr}` })
    .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, {
      message: `Password ${passwordAlphaNumericErr}`,
    }),
  email: z
    .email({ message: emailErr })
    .max(254, { message: `Email: ${emailLengthErr}` })
    .trim(),
});

const LogInSchema = z.object({
  email: z.email(),
  password: z.string(),
});

const userTeamCheckSchema = z.object({
  userId: z.number(),
});

export async function signUp(req: Request, res: Response) {
  const { email, password } = req.body;

  const { success, data, error } = SignUpSchema.safeParse({
    email,
    password,
  });

  if (!success) {
    return res.status(400).json({
      errors: error.issues.map((issue) => issue.message),
    });
  }

  try {
    await userService.create(data);
    return res.status(201).json({ message: "Successful Sign-Up" });
  } catch (err) {
    return res.status(403).json({
      message: "an unexpected error occured",
    });
  }
}

export async function logIn(req: Request, res: Response) {
  const { email, password } = req.body;

  const { success, data, error } = LogInSchema.safeParse({
    email,
    password,
  });

  if (!success) {
    return res.status(400).json({
      errors: error,
    });
  }

  const user = await userService.get(data.email);

  if (!user) {
    return res.status(403).json({ message: "Login failed" });
  }

  const token = await userService.login(user.id, data.password, user.password);

  if (!token) {
    return res.status(500).json({
      message: "an unexpected error occured",
    });
  }

  return res.status(200).json({
    message: "Successfully logged in",
    token,
  });
}

export async function checkUserTeam(req: AuthRequest, res: Response) {
  const userId = req.user?.id;

  const { success, data, error } = userTeamCheckSchema.safeParse({
    userId,
  });

  if (!success) {
    return res.status(400).json({
      errors: error.issues.map((issue) => issue.message),
    });
  }

  const userTeam = await userService.checkUserTeam(data.userId);

  return res.status(200).json(userTeam);
}
