import jwt, { type JwtPayload } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import z from "zod";
import prisma from "../lib/prisma.js";
import { config } from "../service/config.js";

