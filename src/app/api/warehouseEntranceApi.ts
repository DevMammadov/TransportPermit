import { downloadExcelFile } from "@/app/helpers/common";
import warehouse_entrance_repository from "@/app/repositories/WarehouseEntranceRepository";
import { ERevalidateTags } from "@/data/enum/revalidate_tags.enum";
import { BlankFilter, ReturnBlankDSO, SublistDSO } from "@/data/types/Common";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useWarehouseEntranceList = (query: BlankFilter) => {
  return useQuery({
    queryKey: [ERevalidateTags.WAREHOUSE_ENTRANCE_LIST, query],
    queryFn: () => {
      return warehouse_entrance_repository.getPagedList(query);
    },
  });
};

export const useWarehouseEntranceSubList = () => {
  return useMutation({
    mutationFn: (data: SublistDSO) => {
      return warehouse_entrance_repository.getSubList(data);
    },
  });
};

export const useExportWarehouseEntranceExcel = () => {
  return useMutation({
    mutationFn: (query: BlankFilter) => {
      return warehouse_entrance_repository.exportExcel(query);
    },

    onSuccess: (data): void => {
      downloadExcelFile(data);
    },
  });
};

export const useConfirmWarehouseEntrance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => {
      return warehouse_entrance_repository.confirm(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ERevalidateTags.WAREHOUSE_ENTRANCE_LIST],
      });
    },
  });
};

export const useReturnWarehouseEntrance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ReturnBlankDSO) => {
      return warehouse_entrance_repository.return(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ERevalidateTags.WAREHOUSE_ENTRANCE_LIST],
      });
    },
  });
};
