import { validateOrReject } from "class-validator";

async function validator<T extends object>(schema: T): Promise<T> {
  try {
    await validateOrReject(schema, { whitelist: true });

    return schema;
  } catch (error) {
    throw {
      code: 400,
      message: error,
    };
  }
}

export { validator };
