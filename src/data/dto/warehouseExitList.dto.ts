import { PermitItem } from "@/data/dto/permit.dto";
import { LookupItem, TPaginatedList } from "@/data/types/Common";

export type WarehouseExitDTO = {
  id: number;
  permit: PermitItem;
  startNumber: number;
  endNumber: number;
  count: number;
  applicableYear: number;
  receiverStation: LookupItem;
  status: LookupItem;
};

export type WarehouseExitListDTO = TPaginatedList<WarehouseExitDTO>;
