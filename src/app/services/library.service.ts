import { axiosInstance } from "@/app/lib/axios.config";
import { PermitCodeDSO, PermitKindDSO } from "@/data/dso/permit.dso";
import {
  PermitCodeList,
  PermitKindList,
  PermitTypeDTO,
} from "@/data/dto/permit.dto";
import { LookupItem } from "@/data/types/Common";
import { endpoints } from "@/data/utils/endpoints";

export const getPermitKindsService = async ({
  name,
  ...rest
}: PermitKindDSO) => {
  const res = await axiosInstance.post<PermitKindList>(
    endpoints.getPermitKinds,
    { name },
    { params: rest },
  );

  return res.data;
};

export const getPermitCodesService = async ({
  pageIndex,
  pageSize,
  ...rest
}: PermitCodeDSO) => {
  const res = await axiosInstance.post<PermitCodeList>(
    endpoints.getCodes,
    rest,
    { params: { pageIndex, pageSize } },
  );

  return res.data;
};

export const getPermitTypesService = async () => {
  const res = await axiosInstance.get<PermitTypeDTO[]>(
    endpoints.getPermitTypes,
  );

  return res.data;
};

export const getCountriesService = async () => {
  const res = await axiosInstance.get<LookupItem[]>(endpoints.getCountries);

  return res.data;
};

export const getStatusesService = async () => {
  const res = await axiosInstance.get<LookupItem[]>(endpoints.getStatuses);

  return res.data;
};

export const getExchangeTypesService = async () => {
  const res = await axiosInstance.get<PermitTypeDTO[]>(
    endpoints.getExchangeTypes,
  );

  return res.data;
};

export const getStationsService = async (isCentral: boolean) => {
  const res = await axiosInstance.get<LookupItem[]>(endpoints.getStations, {
    params: { isCentral },
  });

  return res.data;
};

export const getDamageTypesService = async () => {
  const res = await axiosInstance.get<LookupItem[]>(endpoints.getDamageTypes);

  return res.data;
};
