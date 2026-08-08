import { PermitItem } from "@/data/dto/permit.dto";
import { LookupItem, TPaginatedList } from "@/data/types/Common";

export interface PermitBlankListItem {
  id: number;
  applicableYear: number;
  count: number;
  endNumber: number;
  exchangeType: number;
  expirationDate: string;
  permit: PermitItem;
  startNumber: number;
  status: LookupItem;
}

export type PermitBlankList = TPaginatedList<PermitBlankListItem>;

export interface PermitBlankItem {
  id: number;
  applicableYear: number;
  count: number;
}

export type PermitBlank = {
  id: number;
  permitId: number;
  expirationDate: string;
  applicableYear: number;
  startNumber: number;
  endNumber: number;
  count: number;
  exchangeTypeId: number;
  stationId: number;
  description: string;
  statusId: number;
  sentDate: string | null;
  confirmedDate: string | null;
  returnReason: string | null;
  returnedById: number | string | null;
  permit: null;
  station: LookupItem;
  exchangeType: LookupItem;
  status: LookupItem;
  returnedBy: string | null;
  createdDate: string;
};

export interface CreatePermitBlankDSO {
  id?: number;
  permitId?: number;
  country?: number;
  deficiencyLevelType?: number;
  permitType?: number;
  permitCategory?: number;
  expirationDate: string;
  applicableYear: number;
  startNumber: number;
  endNumber: number;
  totalCount?: number | string;
  exchangeTypeId?: number;
  stationId?: number;
  description: string;
}
