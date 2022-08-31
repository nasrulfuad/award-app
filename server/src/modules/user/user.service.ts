import { LoginDto } from "./dto/login.dto";
import { prismaService } from "@app/shared/core/prisma";
import JWT from "jsonwebtoken";

async function login(loginDto: LoginDto) {
  try {
    const { email } = loginDto;

    const user = await prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw {
        code: 404,
        message: `Email Address is not exists`,
      };
    }

    const token = generateToken(user.email);

    return {
      ...user,
      token,
    };
  } catch (error) {
    throw error;
  }
}

function generateToken(email: string) {
  return JWT.sign({ email }, process.env.JWT_KEY as string, {
    expiresIn: "1d",
  });
}

export default { login, generateToken };
