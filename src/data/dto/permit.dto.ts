import { LookupItem, TPaginatedList } from "@/data/types/Common";

export interface PermitItem {
  id: number;
  category: string;
  code: string;
  country: string;
  deficiencyLevelType: string;
}

export type PermitKindDTO = {
  name: string;
  createdDate: string;
  createdBy: string;
  createdByPosition: null;
};

export type PermitKindList = TPaginatedList<PermitKindDTO>;

export type PermitCodeDTO = {
  id: number;
  code: string;
  country: string;
  permitType: string;
  permitCategory: string;
  deficiencyLevelType: string;
  createdDate: string;
  createdBy: string;
  createdByPosition: string | null;
};

export type PermitCodeList = TPaginatedList<PermitCodeDTO>;

export type PermitTypeDTO = LookupItem;

export type PermitCategory = {
  id: number;
  name: string;
  createdDate: string;
};

export type PermitDTO = {
  id: number;
  code: string;
  countryId: number;
  permitTypeId: number;
  permitCategoryId: number;
  deficiencyLevelTypeId: number;
  isDeleted: boolean;
  country: LookupItem;
  permitType: LookupItem;
  permitCategory: PermitCategory;
  deficiencyLevelType: LookupItem;
};

export type PermitInfo = {
  id: string;
  permitCode: string;
  country: string;
  isDeficit: string;
  permitType: string;
  permitCategory: string;
};
