import { TWarehouseExitRepository } from "@/app/repositories/WarehouseExitRepository/TWarehouseExitRepository";
import {
  createWarehouseExitService,
  exportWarehouseExitExcelService,
  getWarehouseExitByIdService,
  getWarehouseExitListService,
  updateWarehouseExitService,
} from "@/app/services/warehouseExit.service";

const WarehouseExitRepository: TWarehouseExitRepository = {
  async getPagedList(query) {
    return await getWarehouseExitListService(query);
  },

  async create(query) {
    return await createWarehouseExitService(query);
  },

  async update(query) {
    return await updateWarehouseExitService(query);
  },

  async getById(id) {
    return await getWarehouseExitByIdService(id);
  },

  async exportExcel(query) {
    return await exportWarehouseExitExcelService(query);
  },
};

export default WarehouseExitRepository;
