import { TWarehouseEntranceRepository } from "@/app/repositories/WarehouseEntranceRepository/TWarehouseEntranceRepository";
import {
  confirmWarehouseEntranceService,
  exportWarehouseEntranceExcelService,
  getWarehouseEntranceListService,
  getWarehouseEntranceSubListService,
  returnWarehouseEntranceService,
} from "@/app/services/warehouseEntrance.service";

const WarehouseEntranceRepository: TWarehouseEntranceRepository = {
  async getPagedList(query) {
    return await getWarehouseEntranceListService(query);
  },

  async getSubList(data) {
    return await getWarehouseEntranceSubListService(data);
  },

  async confirm(id) {
    return await confirmWarehouseEntranceService(id);
  },

  async return(data) {
    return await returnWarehouseEntranceService(data);
  },

  async exportExcel(query) {
    return await exportWarehouseEntranceExcelService(query);
  },
};

export default WarehouseEntranceRepository;
