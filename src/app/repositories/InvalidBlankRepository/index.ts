import { TInvalidBlankRepository } from "@/app/repositories/InvalidBlankRepository/TInvalidBlankRepository";
import {
  createInvalidBlankService,
  exportInvalidBlankExcelService,
  getInvalidBlankByIdService,
  getInvalidBlankListService,
  removeInvalidBlankService,
  restoreInvalidBlankService,
  updateInvalidBlankService,
} from "@/app/services/invalidBlank.service";

const InvalidBlankRepository: TInvalidBlankRepository = {
  async getPagedList(query) {
    return await getInvalidBlankListService(query);
  },

  async exportExcel(query) {
    return await exportInvalidBlankExcelService(query);
  },

  async create(query) {
    return await createInvalidBlankService(query);
  },

  async update(query) {
    return await updateInvalidBlankService(query);
  },

  async getById(id) {
    return await getInvalidBlankByIdService(id);
  },

  async restore(data) {
    return await restoreInvalidBlankService(data);
  },

  async remove(data) {
    return await removeInvalidBlankService(data);
  },
};

export default InvalidBlankRepository;
