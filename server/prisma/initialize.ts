import { AwardType, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function initialize() {
  await prisma.user.deleteMany({});
  await prisma.award.deleteMany({});

  await prisma.user.createMany({
    data: [
      {
        name: "John Doe",
        email: "john@email.com",
      },
      {
        name: "Jane Doe",
        email: "jane@email.com",
      },
    ],
  });

  for (let award of generateAWards()) {
    await prisma.award.create({
      data: award,
    });
  }

  console.info("Initialized Database Successfull");
}

initialize();

function generateAWards() {
  return new Array(50).fill(null).map((item, index) => {
    let type: AwardType = AwardType.GIFT_CARD;
    index += 1;

    if (index >= 16 && index <= 16 * 2) {
      type = AwardType.PRODUCT;
    }

    if (index > 16 * 2) {
      type = AwardType.VOUCHER;
    }

    return {
      point: 100_000 * index,
      name: `Award ${index}`,
      type,
      image: `https://picsum.photos/id/${index}/50/50`,
    };
  });
}
