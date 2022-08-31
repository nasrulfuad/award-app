import { TAwardFilter } from "types/api/award";

export type TAwardPageState = {
  filter: TAwardFilter;
};

export enum AwardType {
  VOUCHER = "VOUCHER",
  PRODUCT = "PRODUCT",
  GIFT_CARD = "GIFT_CARD",
}

export type TAward = {
  id: string;
  name: string;
  type: AwardType;
  point: number;
  image: string;
  createdAt: string;
};
