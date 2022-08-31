import { Request, Response } from "express";
import { LoginDto } from "./dto/login.dto";
import { catchError } from "@app/shared/core/catchError";
import { validator } from "@app/shared/core/validator";
import { response } from "@app/shared/core/response";
import userService from "./user.service";

async function login(req: Request, res: Response) {
  try {
    const { email } = req.body;

    const loginDto = await validator(new LoginDto(email));

    const user = await userService.login(loginDto);

    return response(res).Ok(user);
  } catch (error) {
    const { message, statusCode } = catchError(error);

    return res.status(statusCode).json({ message });
  }
}

export default { login };
