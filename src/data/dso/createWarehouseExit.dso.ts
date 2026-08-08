export type CreateWarehouseExitDSO = {
  id?: number;
  permitId: number;
  applicableYear: number;
  startNumber: number;
  endNumber: number;
  receiverStationId: number;
  description: string;
  totalCount: string;
};
