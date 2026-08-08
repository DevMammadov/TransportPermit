import { downloadExcelFile } from "@/app/helpers/common";
import permit_blank_repository from "@/app/repositories/PermitBlankRepository";
import { GetPermitBlankListDSO } from "@/data/dso/getPermitBlankList.dso";
import { CreatePermitBlankDSO } from "@/data/dto/permitBlankList.dto";
import { ERevalidateTags } from "@/data/enum/revalidate_tags.enum";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const usePermitBlankList = (query: GetPermitBlankListDSO) => {
  return useQuery({
    queryKey: [ERevalidateTags.PERMIT_BLANK_LIST, query],
    queryFn: () => {
      return permit_blank_repository.getPagedList(query);
    },
  });
};

export const useCreatePermitBlank = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePermitBlankDSO) => {
      return permit_blank_repository.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ERevalidateTags.PERMIT_BLANK_LIST],
      });
    },
  });
};

export const useUpdatePermitBlank = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePermitBlankDSO) => {
      return permit_blank_repository.update(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ERevalidateTags.PERMIT_BLANK_LIST],
      });
    },
  });
};

export const usePermitBlankById = (id?: string) => {
  return useQuery({
    queryKey: [ERevalidateTags.PERMIT_BLANK_BY_ID, id],
    queryFn: () => {
      return permit_blank_repository.getById(id);
    },
    enabled: !!id,
  });
};

export const useChangeStatusPermitBlank = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id?: string) => {
      return permit_blank_repository.changeStatus(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ERevalidateTags.PERMIT_BLANK_LIST],
      });
    },
  });
};

export const useExportPermitBlankExcel = () => {
  return useMutation({
    mutationFn: (query: GetPermitBlankListDSO) => {
      return permit_blank_repository.exportExcel(query);
    },

    onSuccess: (data): void => {
      downloadExcelFile(data);
    },
  });
};
