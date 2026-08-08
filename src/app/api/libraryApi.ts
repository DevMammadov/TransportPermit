import library_repository from "@/app/repositories/LibraryRepository";
import { PermitCodeDSO, PermitKindDSO } from "@/data/dso/permit.dso";
import { ERevalidateTags } from "@/data/enum/revalidate_tags.enum";
import { useMutation, useQuery } from "@tanstack/react-query";

export const usePermitKinds = () => {
  return useMutation({
    mutationFn: (data: PermitKindDSO) => {
      return library_repository.getPermitKinds(data);
    },
  });
};

export const usePermitCodes = () => {
  return useMutation({
    mutationFn: (data: PermitCodeDSO) => {
      return library_repository.getPermitCodes(data);
    },
  });
};

export const usePermitTypes = (enabled?: boolean) => {
  return useQuery({
    queryKey: [ERevalidateTags.PERMIT_TYPES],
    queryFn: () => {
      return library_repository.getPermitTypes();
    },
    initialData: [],
    enabled,
  });
};

export const useCountries = () => {
  return useQuery({
    queryKey: [ERevalidateTags.COUNTRIES],
    queryFn: () => {
      return library_repository.getCountries();
    },
    initialData: [],
  });
};

export const useStatuses = () => {
  return useQuery({
    queryKey: [ERevalidateTags.STATUSES],
    queryFn: () => {
      return library_repository.getStatuses();
    },
    initialData: [],
  });
};

export const useExchangeTypes = (enabled?: boolean) => {
  return useQuery({
    queryKey: [ERevalidateTags.EXCHANGE_TYPES],
    queryFn: () => {
      return library_repository.getExchangeTypes();
    },
    initialData: [],
    enabled,
  });
};

export const useStations = ({ isCentral }: { isCentral: boolean }) => {
  return useQuery({
    queryKey: [ERevalidateTags.STATIONS],
    queryFn: () => {
      return library_repository.getStations(isCentral);
    },
    initialData: [],
  });
};

export const useDamageTypes = () => {
  return useQuery({
    queryKey: [ERevalidateTags.DAMAGE_TYPES],
    queryFn: () => {
      return library_repository.getDamageTypes();
    },
    initialData: [],
  });
};
