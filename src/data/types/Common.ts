import { FunctionComponent, SVGProps } from "react";

export type TIcon = FunctionComponent<SVGProps<SVGSVGElement>>;

export type LookupItem = {
  id: number;
  value: string;
  description: string;
  priority: number;
  cssClass: string | null;
};

export type TPaginatedList<T> = {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  indexFrom: number;
  items: T[];
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
};

export type ReturnBlankDSO = {
  id: number;
  reason?: string;
};

export type PagedList = {
  pageIndex: number;
  pageSize: number;
};

export type BlankFilter = PagedList &
  Partial<{
    value: string;
    permitId: number;
    permitTypeId: number;
    permitCategoryId: number;
    deficiencyLevelTypeId: number;
    countryId: number;
    statusId: number;
    applicableYear: number;
    stationId: number;
    minExpirationDate: string;
    maxExpirationDate: string;
  }>;

export type SublistDSO = {
  permitId: number;
  applicableYear: number;
};
