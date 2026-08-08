import { PermitItem } from "@/data/dto/permit.dto";
import { LookupItem, TPaginatedList } from "@/data/types/Common";

export type InvalidBlankDTO = {
  id: number;
  permit: PermitItem;
  createdBy: string;
  createdDate: string;
  startNumber: number;
  endNumber: number;
  status: LookupItem;
};

export type InvalidBlankListDTO = TPaginatedList<InvalidBlankDTO>;
