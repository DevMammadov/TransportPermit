import { CreateWarehouseExitDSO } from "@/data/dso/createWarehouseExit.dso";
import { FileDTO } from "@/data/dto/file.dto";
import { WarehouseExitListDTO } from "@/data/dto/warehouseExitList.dto";
import { BlankFilter } from "@/data/types/Common";

export type TWarehouseExitRepository = {
  getPagedList: (query: BlankFilter) => Promise<WarehouseExitListDTO>;
  exportExcel(query: BlankFilter): Promise<FileDTO>;
  create(data: CreateWarehouseExitDSO): Promise<unknown>;
  update(data: CreateWarehouseExitDSO): Promise<unknown>;
  getById(id?: number): Promise<CreateWarehouseExitDSO>;
};
