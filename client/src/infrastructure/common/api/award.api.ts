import axios from "axios";
import { TAwardFilter, TGetAwardApiResponse } from "types/api/award.d";

export const getAwardApi = async (
  filter: TAwardFilter
): Promise<TGetAwardApiResponse> => {
  try {
    let { current, skip, pageSize, pointStart, pointEnd } = filter;
    let queries: any = {
      skip,
      take: pageSize,
    };

    if (current === 2) {
      queries.skip = pageSize + 1;
    }

    if (current > 2) {
      queries.skip = pageSize * (current - 1) + 1;
    }

    if (filter.types.length > 0) {
      queries["types"] = filter.types.join(",");
    }

    if (pointStart) {
      queries["pointStart"] = pointStart;
    }

    if (pointEnd) {
      queries["pointEnd"] = pointEnd;
    }

    const response = await axios.get(`/awards?${new URLSearchParams(queries)}`);

    return response.data;
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
};
