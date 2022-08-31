import { AwardType } from "@prisma/client";
import { IsArray, IsNumber, IsOptional } from "class-validator";

export class AwardQueryDto {
  constructor(query: AwardQueryDto) {
    this.skip = +query?.skip || 0;
    this.take = +query?.take || 10;
    this.pointStart = +query?.pointStart || undefined;
    this.pointEnd = +query?.pointEnd || undefined;

    if (query.types && typeof query.types === "string") {
      /** Make sure types is valid */
      const types = (query.types as string)
        .split(",")
        .filter((type: AwardType) =>
          Object.values(AwardType).includes(type)
        ) as AwardType[];

      this.types = types;
    }
  }

  @IsOptional()
  @IsNumber()
  take?: number;

  @IsOptional()
  @IsNumber()
  skip?: number;

  @IsOptional()
  @IsNumber()
  pointStart?: number;

  @IsOptional()
  @IsNumber()
  pointEnd?: number;

  @IsOptional()
  @IsArray()
  types?: AwardType[];
}
