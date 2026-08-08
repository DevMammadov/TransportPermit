import { FileDTO } from "@/data/dto/file.dto";
import { PointInboundListDTO } from "@/data/dto/pointInbound.dto";
import { BlankFilter, ReturnBlankDSO } from "@/data/types/Common";

export type TPointInboundRepository = {
  getPagedList: (query: BlankFilter) => Promise<PointInboundListDTO>;
  exportExcel(query: BlankFilter): Promise<FileDTO>;
  confirm(id: number): Promise<string>;
  return(data: ReturnBlankDSO): Promise<unknown>;
};
