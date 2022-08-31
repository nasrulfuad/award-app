import { prismaService, createServer } from "@app/shared";

const PORT: number = 3001;

async function start() {
  try {
    await prismaService.$connect();

    const server = await createServer();

    server.listen(PORT, function () {
      console.log(`App is listening on port ${PORT}!`);
    });
  } catch (error) {
    // TODO add logger
    console.error(error);
    prismaService.$disconnect();
    process.exit(0);
  }
}

start();
