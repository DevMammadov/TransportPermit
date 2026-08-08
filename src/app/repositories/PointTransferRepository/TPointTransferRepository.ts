import { CreatePointTransferDSO } from "@/data/dso/createPointTransfer.dso";
import { FileDTO } from "@/data/dto/file.dto";
import { PointTransferListDTO } from "@/data/dto/pointTransferList.dto";
import { BlankFilter } from "@/data/types/Common";

export type TPointTransferRepository = {
  getPagedList: (query: BlankFilter) => Promise<PointTransferListDTO>;
  exportExcel(query: BlankFilter): Promise<FileDTO>;
  create(data: CreatePointTransferDSO): Promise<unknown>;
  update(data: CreatePointTransferDSO): Promise<unknown>;
  getById(id?: number): Promise<CreatePointTransferDSO>;
};
