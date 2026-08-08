import { downloadExcelFile } from "@/app/helpers/common";
import point_inbound_repository from "@/app/repositories/PointInboundRepository";
import { ERevalidateTags } from "@/data/enum/revalidate_tags.enum";
import { BlankFilter, ReturnBlankDSO } from "@/data/types/Common";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const usePointInboundList = (query: BlankFilter) => {
  return useQuery({
    queryKey: [ERevalidateTags.POINT_INBOUND_LIST, query],
    queryFn: () => {
      return point_inbound_repository.getPagedList(query);
    },
  });
};

export const useExportPointInboundExcel = () => {
  return useMutation({
    mutationFn: (query: BlankFilter) => {
      return point_inbound_repository.exportExcel(query);
    },

    onSuccess: (data): void => {
      downloadExcelFile(data);
    },
  });
};

export const useConfirmPointInbound = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => {
      return point_inbound_repository.confirm(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ERevalidateTags.POINT_INBOUND_LIST],
      });
    },
  });
};

export const useReturnPointInbound = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ReturnBlankDSO) => {
      return point_inbound_repository.return(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ERevalidateTags.POINT_INBOUND_LIST],
      });
    },
  });
};
