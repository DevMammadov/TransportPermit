import { downloadExcelFile } from "@/app/helpers/common";
import warehouse_exit_repository from "@/app/repositories/WarehouseExitRepository";
import { CreateWarehouseExitDSO } from "@/data/dso/createWarehouseExit.dso";
import { ERevalidateTags } from "@/data/enum/revalidate_tags.enum";
import { BlankFilter } from "@/data/types/Common";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useWarehouseExitList = (query: BlankFilter) => {
  return useQuery({
    queryKey: [ERevalidateTags.WAREHOUSE_EXIT_LIST, query],
    queryFn: () => {
      return warehouse_exit_repository.getPagedList(query);
    },
  });
};

export const useExportWarehouseExitExcel = () => {
  return useMutation({
    mutationFn: (query: BlankFilter) => {
      return warehouse_exit_repository.exportExcel(query);
    },

    onSuccess: (data): void => {
      downloadExcelFile(data);
    },
  });
};

export const useCreateWarehouseExit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWarehouseExitDSO) => {
      return warehouse_exit_repository.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ERevalidateTags.WAREHOUSE_EXIT_LIST],
      });
    },
  });
};

export const useUpdateWarehouseExit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWarehouseExitDSO) => {
      return warehouse_exit_repository.update(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ERevalidateTags.WAREHOUSE_EXIT_LIST],
      });
    },
  });
};

export const useWarehouseExitById = () => {
  return useMutation({
    mutationFn: (id?: number) => {
      return warehouse_exit_repository.getById(id);
    },
  });
};
