import { checkSchema } from "express-validator";
import {
  registerDto,
  loginDto,
  updateProfileDto,
} from "../dtos/request/auth.request.dto.js";

export const validateRegister = checkSchema(registerDto);
export const validateLogin = checkSchema(loginDto);
export const validateUpdateProfile = checkSchema(updateProfileDto);
