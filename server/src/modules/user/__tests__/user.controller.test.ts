/** Integration Test */
import { createServer } from "@app/shared";
import { User } from "@prisma/client";
import { Application } from "express";
import request from "supertest";

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

describe("POST /api/v1/users/login", () => {
  let server: Application;

  beforeAll(async () => {
    server = await createServer();
  });

  it("should return 200 & retrieves auth token", async () => {
    const response = await request(server)
      .post("/api/v1/users/login")
      .send({ email: user.email });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: "success",
      data: {
        ...user,
        token: expect.any(String),
      },
    });
  });

  it("should return 404 & retrieves 'Email Address is not exists'", async () => {
    user = null;

    const response = await request(server)
      .post("/api/v1/users/login")
      .send({ email: "random-email@email.com" });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      message: "Email Address is not exists",
    });
  });

  it("should return 400 & retrieves invalid email address", async () => {
    user = null;

    const response = await request(server)
      .post("/api/v1/users/login")
      .send({ email: "invalid-email" });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: [
        {
          target: {
            email: "invalid-email",
          },
          value: "invalid-email",
          property: "email",
          children: [],
          constraints: {
            isEmail: "email must be an email",
          },
        },
      ],
    });
  });
});
