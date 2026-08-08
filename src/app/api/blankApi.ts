import blank_repository from "@/app/repositories/BlankRepository";
import { ERevalidateTags } from "@/data/enum/revalidate_tags.enum";
import { BlankFilter } from "@/data/types/Common";
import { useQuery } from "@tanstack/react-query";

export const useBlankList = (query: BlankFilter) => {
  return useQuery({
    queryKey: [ERevalidateTags.PERMIT_LIST, query],
    queryFn: () => {
      return blank_repository.getPagedList(query);
    },
  });
};
