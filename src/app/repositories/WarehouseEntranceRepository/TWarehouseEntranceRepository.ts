import { FileDTO } from "@/data/dto/file.dto";
import {
  WarehouseEnteranceListDTO,
  WarehouseSubItemDTO,
} from "@/data/dto/warehouseEntrance.dto";
import { BlankFilter, ReturnBlankDSO, SublistDSO } from "@/data/types/Common";

export type TWarehouseEntranceRepository = {
  getPagedList: (query: BlankFilter) => Promise<WarehouseEnteranceListDTO>;
  getSubList: (data: SublistDSO) => Promise<WarehouseSubItemDTO[]>;
  exportExcel(query: BlankFilter): Promise<FileDTO>;
  confirm(id: number): Promise<string>;
  return(data: ReturnBlankDSO): Promise<unknown>;
};
