import { axiosInstance } from "@/app/lib/axios.config";
import { FileDTO } from "@/data/dto/file.dto";
import {
  WarehouseEnteranceListDTO,
  WarehouseSubItemDTO,
} from "@/data/dto/warehouseEntrance.dto";
import { BlankFilter, ReturnBlankDSO, SublistDSO } from "@/data/types/Common";
import { endpoints } from "@/data/utils/endpoints";

export const getWarehouseEntranceListService = async ({
  pageIndex,
  pageSize,
  ...rest
}: BlankFilter) => {
  const res = await axiosInstance.post<WarehouseEnteranceListDTO>(
    endpoints.getWarehouseEntranceList,
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

export const getWarehouseEntranceSubListService = async (data: SublistDSO) => {
  const res = await axiosInstance.get<WarehouseSubItemDTO[]>(
    endpoints.getWarehouseEntranceSubList,
    {
      params: {
        permitId: data.permitId,
        applicableYear: data.applicableYear,
      },
    },
  );

  return res.data;
};

export const confirmWarehouseEntranceService = async (id: number) => {
  const res = await axiosInstance.post<string>(
    endpoints.confirmWarehouseEntrance,
    null,
    {
      params: { id },
    },
  );

  return res.data;
};

export const returnWarehouseEntranceService = async (data: ReturnBlankDSO) => {
  const res = await axiosInstance.post(endpoints.returnWarehouseEntrance, data);

  return res.data;
};

export const exportWarehouseEntranceExcelService = async (
  query: BlankFilter,
) => {
  const res = await axiosInstance.post<FileDTO>(
    endpoints.exportWarehouseEntranceExcel,
    query,
  );

  return res.data;
};
