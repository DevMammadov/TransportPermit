import { GetPermitBlankListDSO } from "@/data/dso/getPermitBlankList.dso";
import { FileDTO } from "@/data/dto/file.dto";
import {
  CreatePermitBlankDSO,
  PermitBlank,
  PermitBlankList,
} from "@/data/dto/permitBlankList.dto";

export type TPermitBlankRepository = {
  getPagedList: (query: GetPermitBlankListDSO) => Promise<PermitBlankList>;
  exportExcel(query: GetPermitBlankListDSO): Promise<FileDTO>;
  create(data: CreatePermitBlankDSO): Promise<unknown>;
  update(data: CreatePermitBlankDSO): Promise<unknown>;
  getById(id?: string): Promise<PermitBlank>;
  changeStatus(id?: string): Promise<string>;
};
