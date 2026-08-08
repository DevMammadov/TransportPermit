import { axiosInstance } from "@/app/lib/axios.config";
import { CreateInvalidBlankDSO } from "@/data/dso/createInvalidBlank.dso";
import { GetInvalidBlankListDSO } from "@/data/dso/getRejectedBlankList.dso";
import { FileDTO } from "@/data/dto/file.dto";
import { InvalidBlankListDTO } from "@/data/dto/rejectedBlankList.dto";
import { ReturnBlankDSO } from "@/data/types/Common";
import { endpoints } from "@/data/utils/endpoints";

export const getInvalidBlankListService = async ({
  pageIndex,
  pageSize,
  ...rest
}: GetInvalidBlankListDSO) => {
  const res = await axiosInstance.post<InvalidBlankListDTO>(
    endpoints.getInvalidBlankList,
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

export const exportInvalidBlankExcelService = async (
  query: GetInvalidBlankListDSO,
) => {
  const res = await axiosInstance.post<FileDTO>(
    endpoints.exportInvalidBlankExcel,
    query,
  );

  return res.data;
};

export const createInvalidBlankService = async (
  data: CreateInvalidBlankDSO,
) => {
  const res = await axiosInstance.post(endpoints.createInvalidBlank, data);

  return res.data;
};

export const updateInvalidBlankService = async (
  data: CreateInvalidBlankDSO,
) => {
  const res = await axiosInstance.put(endpoints.updateInvalidBlank, data);

  return res.data;
};

export const getInvalidBlankByIdService = async (id?: number) => {
  const res = await axiosInstance.get<CreateInvalidBlankDSO>(
    endpoints.getInvalidBlankById,
    { params: { id } },
  );

  return res.data;
};

export const restoreInvalidBlankService = async (data: ReturnBlankDSO) => {
  const res = await axiosInstance.post(endpoints.restoreInvalidBlank, data);

  return res.data;
};

export const removeInvalidBlankService = async (id: number) => {
  const res = await axiosInstance.post<string>(
    endpoints.removeInvalidBlank,
    null,
    {
      params: { id },
    },
  );

  return res.data;
};
