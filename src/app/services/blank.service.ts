import { axiosInstance } from "@/app/lib/axios.config";
import { getActiveBlankCountDSO } from "@/data/dso/blank.dso";
import { BlankListDTO } from "@/data/dto/blank.dto";
import { BlankFilter, SublistDSO } from "@/data/types/Common";
import { endpoints } from "@/data/utils/endpoints";

export const getBlankListService = async ({
  pageIndex,
  pageSize,
  ...rest
}: BlankFilter) => {
  const res = await axiosInstance.post<BlankListDTO>(
    endpoints.getBlankList,
    rest,
    {
      params: {
        pageIndex,
        pageSize,
      },
    },
  );

  return res.data;
};

export const getBlankSubListService = async (data: SublistDSO) => {
  const res = await axiosInstance.get<any[]>(endpoints.getBlankSubList, {
    params: {
      permitId: data.permitId,
      applicableYear: data.applicableYear,
    },
  });

  return res.data;
};

export const getActiveBlankCount = async (data: getActiveBlankCountDSO) => {
  const res = await axiosInstance.get<any[]>(endpoints.getActiveBlankCount, {
    params: data,
  });

  return res.data;
};
