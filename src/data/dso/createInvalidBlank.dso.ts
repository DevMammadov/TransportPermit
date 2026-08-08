export type CreateInvalidBlankDSO = Partial<{
  id: number;
  permitId: number;
  applicableYear: number;
  startNumber: number;
  endNumber: number;
  damageTypeId: number;
  damageReason: string;
  stationId: number;
}>;
