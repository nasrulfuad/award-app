import { User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { catchError } from "../shared/core/catchError";

interface IRequest extends Request {
  user?: Partial<User>;
}

function authMiddleware(req: IRequest, res: Response, next: NextFunction) {
  const token = req.headers["x-access-token"] as string | null;

  try {
    if (!token) throw new Error();

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    req.user = decoded as Partial<User>;

    next();
  } catch (error) {
    const { statusCode, message } = catchError({
      code: 401,
      message: "Unauthorized",
    });

    return res.status(statusCode).json({ message });
  }
}

export default authMiddleware;
