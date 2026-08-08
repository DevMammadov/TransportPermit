import { FileDTO } from "@/data/dto/file.dto";
import { PermitDTO } from "@/data/dto/permit.dto";
import { BlankFilter } from "@/data/types/Common";

export type TPermitsRepository = {
  exportExcel(query: BlankFilter): Promise<FileDTO>;
  getPermitById(id?: number): Promise<PermitDTO>;
};
