import { axiosInstance } from "@/app/lib/axios.config";
import { CreateWarehouseExitDSO } from "@/data/dso/createWarehouseExit.dso";
import { FileDTO } from "@/data/dto/file.dto";
import { WarehouseExitListDTO } from "@/data/dto/warehouseExitList.dto";
import { BlankFilter } from "@/data/types/Common";
import { endpoints } from "@/data/utils/endpoints";

export const getWarehouseExitListService = async ({
  pageIndex,
  pageSize,
  ...rest
}: BlankFilter) => {
  const res = await axiosInstance.post<WarehouseExitListDTO>(
    endpoints.getWarehouseExitList,
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

export const exportWarehouseExitExcelService = async (query: BlankFilter) => {
  const res = await axiosInstance.post<FileDTO>(
    endpoints.exportWarehouseExitExcel,
    query,
  );

  return res.data;
};

export const createWarehouseExitService = async (
  data: CreateWarehouseExitDSO,
) => {
  const res = await axiosInstance.post(endpoints.createWarehouseExit, data);
  return res.data;
};

export const updateWarehouseExitService = async (
  data: CreateWarehouseExitDSO,
) => {
  const res = await axiosInstance.put(endpoints.updateWarehouseExit, data);
  return res.data;
};

export const getWarehouseExitByIdService = async (id?: number) => {
  const res = await axiosInstance.get<CreateWarehouseExitDSO>(
    endpoints.getWarehouseExitById,
    { params: { id } },
  );

  return res.data;
};
