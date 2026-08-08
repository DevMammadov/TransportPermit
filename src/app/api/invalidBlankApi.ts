import { downloadExcelFile } from "@/app/helpers/common";
import invalid_blank_repository from "@/app/repositories/InvalidBlankRepository";
import { CreateInvalidBlankDSO } from "@/data/dso/createInvalidBlank.dso";
import { GetInvalidBlankListDSO } from "@/data/dso/getRejectedBlankList.dso";
import { ERevalidateTags } from "@/data/enum/revalidate_tags.enum";
import { ReturnBlankDSO } from "@/data/types/Common";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useInvalidBlankList = (query: GetInvalidBlankListDSO) => {
  return useQuery({
    queryKey: [ERevalidateTags.REJECTED_BLANK_LIST, query],
    queryFn: () => {
      return invalid_blank_repository.getPagedList(query);
    },
  });
};

export const useExportInvalidBlankExcel = () => {
  return useMutation({
    mutationFn: (query: GetInvalidBlankListDSO) => {
      return invalid_blank_repository.exportExcel(query);
    },

    onSuccess: (data): void => {
      downloadExcelFile(data);
    },
  });
};

export const useCreateInvalidBlank = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInvalidBlankDSO) => {
      return invalid_blank_repository.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ERevalidateTags.REJECTED_BLANK_LIST],
      });
    },
  });
};

export const useUpdateInvalidBlank = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInvalidBlankDSO) => {
      return invalid_blank_repository.update(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ERevalidateTags.REJECTED_BLANK_LIST],
      });
    },
  });
};

export const useInvalidBlankById = () => {
  return useMutation({
    mutationFn: (id?: number) => {
      return invalid_blank_repository.getById(id);
    },
  });
};

export const useRestoreInvalidBlank = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ReturnBlankDSO) => {
      return invalid_blank_repository.restore(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ERevalidateTags.REJECTED_BLANK_LIST],
      });
    },
  });
};

export const useRemoveInvalidBlank = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => {
      return invalid_blank_repository.remove(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ERevalidateTags.REJECTED_BLANK_LIST],
      });
    },
  });
};
