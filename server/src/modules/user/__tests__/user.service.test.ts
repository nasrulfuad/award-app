/** Unit Test */
import { User } from "@prisma/client";
import { LoginDto } from "../dto/login.dto";
import userService from "../user.service";

let user: Partial<User> = {
  id: "uuid-here",
  name: "John Doe",
  email: "john@email.com",
};

jest.mock("@app/shared/core/prisma", () => ({
  prismaService: {
    user: {
      findUnique: jest.fn(() => user),
    },
  },
}));

describe("UserService", () => {
  it("should login success", async () => {
    const result = await userService.login(new LoginDto(user.email));

    expect(result).toEqual({
      ...user,
      token: expect.any(String),
    });
  });

  it("should login failed", async () => {
    user = null;

    expect(async () => {
      await userService.login(new LoginDto("abc@email.com"));
    }).rejects.toEqual({ code: 404, message: "Email Address is not exists" });
  });
});
