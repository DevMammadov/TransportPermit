import { LookupItem, TPaginatedList } from "@/data/types/Common";

type PermitInfo = {
  id: number;
  code: string;
  category: string;
  country: string;
  deficiencyLevelType: string;
};

export type WarehouseEnteranceDTO = {
  permit: PermitInfo;
  applicableYear: number;
  baseCount: number;
  additionalCount: number;
  confirmedCount: number;
  pendingCount: number;
};

export type WarehouseSubItemDTO = {
  id: number;
  startNumber: number;
  endNumber: number;
  count: number;
  expirationDate: string; // ISO Date String
  applicableYear: number;
  sentDate: string | null;
  confirmedDate: string | null;
  status: LookupItem;
  exchangeType: LookupItem;
};

export type WarehouseEnteranceListDTO = TPaginatedList<WarehouseEnteranceDTO>;
