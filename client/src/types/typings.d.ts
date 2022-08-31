import "../index";

declare global {
  namespace API {
    export interface IResponseApi<Data> {
      message: string;
      data: Data;
    }

    export type TPaginate<TItem> = {
      totalItems: number;
      take: number;
      skip: number;
      items: TItem;
    };
  }
}
