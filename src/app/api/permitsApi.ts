import { downloadExcelFile } from "@/app/helpers/common";
import permit_repository from "@/app/repositories/PermitsRepository";
import { ERevalidateTags } from "@/data/enum/revalidate_tags.enum";
import { BlankFilter } from "@/data/types/Common";
import { useMutation, useQuery } from "@tanstack/react-query";

export const usePermitById = (id?: number) => {
  return useQuery({
    queryKey: [ERevalidateTags.PERMIT_BY_ID, id],
    queryFn: () => {
      return permit_repository.getPermitById(id);
    },
    enabled: !!id,
  });
};

export const useExportPermitsExcel = () => {
  return useMutation({
    mutationFn: (query: BlankFilter) => {
      return permit_repository.exportExcel(query);
    },

    onSuccess: (data): void => {
      downloadExcelFile(data);
    },
  });
};
