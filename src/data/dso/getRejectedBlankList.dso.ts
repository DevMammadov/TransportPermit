import { PagedList } from "@/data/types/Common";

export type GetInvalidBlankListDSO = PagedList & {
  value?: string;
  codeId?: number;
  permitKindId?: number;
  permitTypeId?: number;
  exchangeTypeId?: number;
  statusId?: number;
  destinationId?: number;
  validFromDate?: string;
  validToDate?: string;
};
