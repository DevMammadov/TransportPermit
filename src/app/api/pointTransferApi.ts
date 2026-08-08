import { downloadExcelFile } from "@/app/helpers/common";
import point_transfer_repository from "@/app/repositories/PointTransferRepository";
import { CreatePointTransferDSO } from "@/data/dso/createPointTransfer.dso";
import { ERevalidateTags } from "@/data/enum/revalidate_tags.enum";
import { BlankFilter } from "@/data/types/Common";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const usePointTransferList = (query: BlankFilter) => {
  return useQuery({
    queryKey: [ERevalidateTags.POINT_TRANSFER_LIST, query],
    queryFn: () => {
      return point_transfer_repository.getPagedList(query);
    },
  });
};

export const useExportPointTransferExcel = () => {
  return useMutation({
    mutationFn: (query: BlankFilter) => {
      return point_transfer_repository.exportExcel(query);
    },

    onSuccess: (data): void => {
      downloadExcelFile(data);
    },
  });
};

export const useCreatePointTransfer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePointTransferDSO) => {
      return point_transfer_repository.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ERevalidateTags.POINT_TRANSFER_LIST],
      });
    },
  });
};

export const useUpdatePointTransfer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePointTransferDSO) => {
      return point_transfer_repository.update(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ERevalidateTags.POINT_TRANSFER_LIST],
      });
    },
  });
};

export const usePointTransferById = () => {
  return useMutation({
    mutationFn: (id?: number) => {
      return point_transfer_repository.getById(id);
    },
  });
};
