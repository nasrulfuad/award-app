/** Unit Test */
import { Award, AwardType } from "@prisma/client";
import awardService from "../award.service";
import { AwardQueryDto } from "../dto/award-query.dto";

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

describe("AwardService", () => {
  it("should retrieves all awards", async () => {
    const result = await awardService.findAll(new AwardQueryDto({}));

    expect(result).toEqual({
      totalItems: 1,
      skip: 0,
      take: 10,
      items: expect.arrayContaining(awards),
    });
  });

  it("should retrieves 'No Awards Found'", async () => {
    awards = [];

    expect(async () => {
      await awardService.findAll(new AwardQueryDto({}));
    }).rejects.toEqual({
      code: 404,
      message: "No Awards Found",
    });
  });
});
