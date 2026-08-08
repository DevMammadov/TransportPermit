import { TPermitsRepository } from "@/app/repositories/PermitsRepository/TPermitsRepositoyr";
import {
  exportPermitsExcelService,
  getPermitByIdService,
} from "@/app/services/permits.service";

const PermitsRepository: TPermitsRepository = {
  async exportExcel(query) {
    return await exportPermitsExcelService(query);
  },

  async getPermitById(id) {
    return await getPermitByIdService(id);
  },
};

export default PermitsRepository;
