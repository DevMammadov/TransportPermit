import { axiosInstance } from "@/app/lib/axios.config";
import { CreatePointTransferDSO } from "@/data/dso/createPointTransfer.dso";
import { FileDTO } from "@/data/dto/file.dto";
import { PointTransferListDTO } from "@/data/dto/pointTransferList.dto";
import { BlankFilter } from "@/data/types/Common";
import { endpoints } from "@/data/utils/endpoints";

export const getPointTransferListService = async ({
  pageIndex,
  pageSize,
  ...rest
}: BlankFilter) => {
  const res = await axiosInstance.post<PointTransferListDTO>(
    endpoints.getPointTransferList,
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

export const createPointTransferService = async (
  data: CreatePointTransferDSO,
) => {
  const res = await axiosInstance.post(endpoints.createPointTransfer, data);

  return res.data;
};

export const updatePointTransferService = async (
  data: CreatePointTransferDSO,
) => {
  const res = await axiosInstance.put(endpoints.updatePointTransfer, data);

  return res.data;
};

export const getPointTransferByIdService = async (id?: number) => {
  const res = await axiosInstance.get<CreatePointTransferDSO>(
    endpoints.getPointTransferById,
    { params: { id } },
  );

  return res.data;
};

export const exportPointTransferExcelService = async (query: BlankFilter) => {
  const res = await axiosInstance.post<FileDTO>(
    endpoints.exportPointTransferExcel,
    query,
  );

  return res.data;
};
