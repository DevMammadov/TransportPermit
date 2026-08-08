import { axiosInstance } from "@/app/lib/axios.config";
import { FileDTO } from "@/data/dto/file.dto";
import { PointInboundListDTO } from "@/data/dto/pointInbound.dto";
import { BlankFilter, ReturnBlankDSO } from "@/data/types/Common";
import { endpoints } from "@/data/utils/endpoints";

export const getPointInboundListService = async ({
  pageIndex,
  pageSize,
  ...rest
}: BlankFilter) => {
  const res = await axiosInstance.post<PointInboundListDTO>(
    endpoints.getPointInboundList,
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

export const confirmPointInboundService = async (id: number) => {
  const res = await axiosInstance.post<string>(
    endpoints.confirmPointInbound,
    null,
    {
      params: { id },
    },
  );

  return res.data;
};

export const returnPointInboundService = async (data: ReturnBlankDSO) => {
  const res = await axiosInstance.post(endpoints.returnPointInbound, data);

  return res.data;
};

export const exportPointInboundExcelService = async (query: BlankFilter) => {
  const res = await axiosInstance.post<FileDTO>(
    endpoints.exportPointInboundExcel,
    query,
  );

  return res.data;
};
