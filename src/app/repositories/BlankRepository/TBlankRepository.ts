import { BlankListDTO } from "@/data/dto/blank.dto";
import { BlankFilter } from "@/data/types/Common";

export type TBlankRepository = {
  getPagedList: (query: BlankFilter) => Promise<BlankListDTO>;
};
