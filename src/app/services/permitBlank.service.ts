import { axiosInstance } from "@/app/lib/axios.config";
import { GetPermitBlankListDSO } from "@/data/dso/getPermitBlankList.dso";
import { FileDTO } from "@/data/dto/file.dto";
import {
  CreatePermitBlankDSO,
  PermitBlank,
  PermitBlankList,
} from "@/data/dto/permitBlankList.dto";
import { endpoints } from "@/data/utils/endpoints";

export const getPermitBlankListService = async ({
  pageIndex,
  pageSize,
  ...rest
}: GetPermitBlankListDSO) => {
  const res = await axiosInstance.post<PermitBlankList>(
    endpoints.getPermitBlankList,
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

export const createPermitBlankService = async (data: CreatePermitBlankDSO) => {
  const res = await axiosInstance.post(endpoints.createPermitBlank, data);

  return res.data;
};

export const updatePermitBlankService = async (data: CreatePermitBlankDSO) => {
  const res = await axiosInstance.put(endpoints.updatePermitBlank, data);

  return res.data;
};

export const getPermitBlankByIdService = async (id?: string) => {
  const res = await axiosInstance.get<PermitBlank>(
    endpoints.getPermitBlankById,
    { params: { id } },
  );

  return res.data;
};

export const changeStatusPermitBlankService = async (id?: string) => {
  const res = await axiosInstance.post<string>(
    endpoints.changeStatusPermitBlank,
    null,
    {
      params: { id },
    },
  );

  return res.data;
};

export const exportPermitBlankExcelService = async (
  query: GetPermitBlankListDSO,
) => {
  const res = await axiosInstance.post<FileDTO>(
    endpoints.exportPermitBlankExcel,
    query,
  );

  return res.data;
};
