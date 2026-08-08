import { PermitCodeDSO, PermitKindDSO } from "@/data/dso/permit.dso";
import {
  PermitCodeList,
  PermitKindList,
  PermitTypeDTO,
} from "@/data/dto/permit.dto";
import { LookupItem } from "@/data/types/Common";

export type TLibraryRepository = {
  getPermitTypes(): Promise<PermitTypeDTO[]>;
  getCountries(): Promise<LookupItem[]>;
  getStatuses(): Promise<LookupItem[]>;
  getExchangeTypes(): Promise<PermitTypeDTO[]>;
  getStations(isCentral: boolean): Promise<LookupItem[]>;
  getDamageTypes(): Promise<LookupItem[]>;

  getPermitKinds(data: PermitKindDSO): Promise<PermitKindList>;
  getPermitCodes(data: PermitCodeDSO): Promise<PermitCodeList>;
};
