import { AwardType, TAward } from "types/page/award.page";

export type TAwardFilter = {
  current: number;
  pageSize: number;
  skip: number;
  types: AwardType[];
  pointStart: number;
  pointEnd: number;
};

export type TGetAwardApiResponse = API.IResponseApi<
  API.TPaginate<TAward[]>
> | null;
