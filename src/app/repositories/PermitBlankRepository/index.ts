import { TPermitBlankRepository } from "@/app/repositories/PermitBlankRepository/TPermitBlankRepository";
import {
  changeStatusPermitBlankService,
  createPermitBlankService,
  exportPermitBlankExcelService,
  getPermitBlankByIdService,
  getPermitBlankListService,
  updatePermitBlankService,
} from "@/app/services/permitBlank.service";

const PermitBlankRepository: TPermitBlankRepository = {
  async getPagedList(query) {
    return await getPermitBlankListService(query);
  },

  async create(query) {
    return await createPermitBlankService(query);
  },

  async update(query) {
    return await updatePermitBlankService(query);
  },

  async getById(id) {
    return await getPermitBlankByIdService(id);
  },

  async changeStatus(id) {
    return await changeStatusPermitBlankService(id);
  },

  async exportExcel(query) {
    return await exportPermitBlankExcelService(query);
  },
};

export default PermitBlankRepository;
