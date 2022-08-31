/** Integration Test */
import userService from "@app/modules/user/user.service";
import { createServer } from "@app/shared";
import { Award, AwardType } from "@prisma/client";
import { Application } from "express";
import request from "supertest";

let awards: Partial<Award>[] = [
  {
    id: "uuid-here",
    type: AwardType.GIFT_CARD,
    point: 10,
    image: "image-url",
    createdAt: new Date(),
  },
];

jest.mock("@app/shared/core/prisma", () => ({
  prismaService: {
    award: {
      findMany: jest.fn(() => awards),
      count: jest.fn(() => 1),
    },
  },
}));

describe("GET /api/v1/awards", () => {
  let server: Application;

  beforeAll(async () => {
    server = await createServer();
  });

  it("should return 200 & retrieves paginated awards data", async () => {
    const token = userService.generateToken("john@email.com");

    const response = await request(server)
      .get("/api/v1/awards")
      .set("x-access-token", token);

    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual({
      message: "success",
      data: {
        totalItems: 1,
        take: 10,
        skip: 0,
        items: [
          {
            ...awards[0],
            createdAt: awards[0].createdAt.toISOString(),
          },
        ],
      },
    });
  });
});
