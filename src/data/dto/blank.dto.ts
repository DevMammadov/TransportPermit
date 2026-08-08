import { PermitItem } from "@/data/dto/permit.dto";
import { TPaginatedList } from "@/data/types/Common";

export type BlankDto = {
  id: number;
  permit: PermitItem;
  totalCount: number;
  issuedCount: number;
  remainingCount: number;
  baseCount: number;
  additionalCount: number;
  applicableYear: number;
};

export type BlankListDTO = TPaginatedList<BlankDto>;
