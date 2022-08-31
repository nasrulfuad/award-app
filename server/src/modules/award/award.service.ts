import { Prisma } from "@prisma/client";
import { AwardQueryDto } from "./dto/award-query.dto";
import { prismaService } from "@app/shared/core/prisma";

async function findAll(awardQueryDto: AwardQueryDto) {
  const { types, pointStart, pointEnd, take, skip } = awardQueryDto;

  const where: Prisma.AwardWhereInput = {
    AND: {
      type: {
        in: types,
      },
      point: {
        gte: pointStart,
        lte: pointEnd,
      },
    },
  };

  const awards = await prismaService.award.findMany({
    where,
    take,
    skip,
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!awards || awards.length === 0) {
    throw {
      code: 404,
      message: "No Awards Found",
    };
  }

  const totalItems = await prismaService.award.count({ where });

  return {
    totalItems,
    take,
    skip,
    items: awards,
  };
}

export default { findAll };
