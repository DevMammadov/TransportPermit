import { PagedList } from "@/data/types/Common";

export type GetPermitBlankListDSO = PagedList & {
  value?: string;
  permitCategoryId?: number;
  permitTypeId?: number;
  exchangeTypeId?: number;
  statusId?: number;
  permitId?: number;
  minExpirationDate?: string;
  maxExpirationDate?: string;
};
