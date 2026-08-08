import { PagedList } from "@/data/types/Common";
import { useState } from "react";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";

type TFilter<T> = Partial<T> & PagedList;

type TUseFilterProps<T> = {
  defaultValues?: DefaultValues<T>;
  pageSize?: number;
};

export const useFilter = <T extends FieldValues>(
  props?: TUseFilterProps<T>,
) => {
  const [filters, setFilters] = useState({
    pageIndex: 0,
    pageSize: props?.pageSize || 5,
  } as TFilter<T>);

  const { control, handleSubmit, reset, ...rest } = useForm<T>({
    defaultValues: props?.defaultValues,
  });

  const setPage = (page: number) => {
    setFilters({ ...filters, pageIndex: page - 1 });
  };

  const setPageSize = (size: number) => {
    setFilters({ ...filters, pageSize: size, pageIndex: 0 });
  };

  const handleSearch = handleSubmit((values) => {
    setFilters({ ...filters, ...values, pageIndex: 0 });
  });

  const clearFilter = () => {
    reset(props?.defaultValues);
    setFilters({
      pageIndex: 0,
      pageSize: props?.pageSize || 5,
    } as TFilter<T>);
  };

  return {
    control,
    filters,
    page: filters.pageIndex + 1,
    pageSize: filters.pageSize,
    setPage,
    setPageSize,
    clearFilter,
    handleSearch,
    ...rest,
  };
};
