import { axiosInstance } from "@/app/lib/axios.config";
import { FileDTO } from "@/data/dto/file.dto";
import { PermitDTO } from "@/data/dto/permit.dto";
import { BlankFilter } from "@/data/types/Common";
import { endpoints } from "@/data/utils/endpoints";

export const getPermitByIdService = async (id?: number) => {
  const res = await axiosInstance.get<PermitDTO>(endpoints.getPermitById, {
    params: { id },
  });

  return res.data;
};

export const exportPermitsExcelService = async (query: BlankFilter) => {
  const res = await axiosInstance.post<FileDTO>(
    endpoints.exportPermitExcel,
    query,
  );

  return res.data;
};
