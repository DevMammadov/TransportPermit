import { PagedList } from "@/data/types/Common";

export type PermitCodeDSO = PagedList &
  Partial<{
    id: number;
    permitTypeId: number;
    permitCategoryId: number;
    countryId: number;
    deficiencyLevelTypeId: number;
    userId: number;
  }>;

export type PermitKindDSO = PagedList & {
  name?: string | null;
};
