import { CreateInvalidBlankDSO } from "@/data/dso/createInvalidBlank.dso";
import { GetInvalidBlankListDSO } from "@/data/dso/getRejectedBlankList.dso";
import { FileDTO } from "@/data/dto/file.dto";
import { InvalidBlankListDTO } from "@/data/dto/rejectedBlankList.dto";
import { ReturnBlankDSO } from "@/data/types/Common";

export type TInvalidBlankRepository = {
  getPagedList: (query: GetInvalidBlankListDSO) => Promise<InvalidBlankListDTO>;
  exportExcel(query: GetInvalidBlankListDSO): Promise<FileDTO>;
  create(data: CreateInvalidBlankDSO): Promise<unknown>;
  update(data: CreateInvalidBlankDSO): Promise<unknown>;
  getById(id?: number): Promise<CreateInvalidBlankDSO>;
  restore(data: ReturnBlankDSO): Promise<unknown>;
  remove(id: number): Promise<string>;
};
