import z from "zod";
import { minLengthString } from "../libs/validationsZod.js";

export const registerSchema = z.object({
  username: minLengthString(8,'username'),
  email: minLengthString(3, 'email').email({message: 'Email is required'}),
  password: minLengthString(8, 'password'),
});

export const loginSchema = z.object({
  email: minLengthString(3, 'email').email({message: 'Email is required'}),
  password: minLengthString(8,'password')
});
