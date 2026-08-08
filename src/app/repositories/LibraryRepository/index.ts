import { TLibraryRepository } from "@/app/repositories/LibraryRepository/TLibraryRepository";
import {
  getStationsService,
  getCountriesService,
  getDamageTypesService,
  getExchangeTypesService,
  getPermitCodesService,
  getPermitKindsService,
  getPermitTypesService,
  getStatusesService,
} from "@/app/services/library.service";

const LibraryRepository: TLibraryRepository = {
  async getPermitKinds(data) {
    return await getPermitKindsService(data);
  },

  async getPermitCodes(data) {
    return await getPermitCodesService(data);
  },

  async getPermitTypes() {
    return await getPermitTypesService();
  },

  async getCountries() {
    return await getCountriesService();
  },

  async getStatuses() {
    return await getStatusesService();
  },

  async getExchangeTypes() {
    return await getExchangeTypesService();
  },

  async getStations(isCentral: boolean) {
    return await getStationsService(isCentral);
  },

  async getDamageTypes() {
    return await getDamageTypesService();
  },
};

export default LibraryRepository;
