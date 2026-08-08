import {
  WarehouseEnteranceDTO,
  WarehouseSubItemDTO,
} from "@/data/dto/warehouseEntrance.dto";

export type TWarehouseEntranceColumns = {
  onConfirm(id: number): void;
  onReturn(id: number): void;
};

export type TWearhouseEntranceTableData = WarehouseEnteranceDTO & {
  subItems: WarehouseSubItemDTO[];
};
