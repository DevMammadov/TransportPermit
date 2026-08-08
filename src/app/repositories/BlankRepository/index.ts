import { TBlankRepository } from "@/app/repositories/BlankRepository/TBlankRepository";
import { getBlankListService } from "@/app/services/blank.service";
import { BlankFilter } from "@/data/types/Common";

const BlankRepository: TBlankRepository = {
  async getPagedList(query: BlankFilter) {
    return await getBlankListService(query);
  },
};

export default BlankRepository;
