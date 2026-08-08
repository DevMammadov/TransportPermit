import { TPointTransferRepository } from "@/app/repositories/PointTransferRepository/TPointTransferRepository";
import {
  createPointTransferService,
  exportPointTransferExcelService,
  getPointTransferByIdService,
  getPointTransferListService,
  updatePointTransferService,
} from "@/app/services/pointTransfer.service";

const PointTransferRepository: TPointTransferRepository = {
  async getPagedList(query) {
    return await getPointTransferListService(query);
  },

  async create(query) {
    return await createPointTransferService(query);
  },

  async update(query) {
    return await updatePointTransferService(query);
  },

  async getById(id) {
    return await getPointTransferByIdService(id);
  },

  async exportExcel(query) {
    return await exportPointTransferExcelService(query);
  },
};

export default PointTransferRepository;
