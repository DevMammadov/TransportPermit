import { TPointInboundRepository } from "@/app/repositories/PointInboundRepository/TPointInboundRepository";
import {
  confirmPointInboundService,
  exportPointInboundExcelService,
  getPointInboundListService,
  returnPointInboundService,
} from "@/app/services/pointInbound.service";

const WarehouseEntranceRepository: TPointInboundRepository = {
  async getPagedList(query) {
    return await getPointInboundListService(query);
  },
  async confirm(id) {
    return await confirmPointInboundService(id);
  },
  async return(data) {
    return await returnPointInboundService(data);
  },

  async exportExcel(query) {
    return await exportPointInboundExcelService(query);
  },
};

export default WarehouseEntranceRepository;
