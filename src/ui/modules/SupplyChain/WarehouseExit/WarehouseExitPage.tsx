import { isFiltered } from "@/app/helpers/common";
import { useMedia } from "@/app/hooks/useMedia";
import FilterPopup from "@/ui/components/FilterPopup";
import NoResult from "@/ui/components/NoResult";
import { EWarehouseExitSteps } from "@/ui/modules/SupplyChain/WarehouseExit/TWarehouseExit";
import { WarehouseExitVM } from "@/ui/modules/SupplyChain/WarehouseExit/WarehouseExitVM";
import Button from "@/ui/shared/Button";
import DataTable from "@/ui/shared/DataTable";
import FormDatePicker from "@/ui/shared/DatePicker/FormDatePicker";
import FormInput from "@/ui/shared/Input/FormInput";
import FormSelect from "@/ui/shared/Select/FormSelect";
import CloseIcon from "@svg/close.svg?react";
import ExcelIcon from "@svg/excel.svg?react";
import Plus from "@svg/plus.svg?react";
import {
  default as Search,
  default as SearchIcon,
} from "@svg/search.svg?react";
import { twMerge } from "tailwind-merge";

const WarehouseExitPage = () => {
  const {
    columns,
    warehouseExitList,
    page,
    setPage,
    filters,
    handleSearch,
    clearFilter,
    control,
    permitKinds,
    permitTypes,
    countries,
    statuses,
    stations,
    setPageSize,
    pageSize,
    exportLoading,
    handleExport,
    onOpenFilterModal,
  } = WarehouseExitVM();

  const { isMobile } = useMedia();

  if (!warehouseExitList?.items?.length && !isFiltered(filters)) {
    return (
      <NoResult
        title="Daxil edilmiş kvota yoxdur"
        to={(to) =>
          `${to.warehouseExit.baseUrl}/add/${EWarehouseExitSteps.QUOTA_INFO}`
        }
        buttonTitle="Yeni məxaric"
      />
    );
  }

  return (
    <div className="wrapper">
      <div className="flex justify-between gap-3">
        <form
          className="flex grow max-sm:flex-col flex-wrap gap-3 mb-4"
          onSubmit={handleSearch}
        >
          <FormInput
            name="value"
            control={control}
            classNames={{ container: "h-full" }}
            icon={Search}
            iconPosition="start"
            placeholder="Axtarış"
            className="w-full sm:w-44 md:w-72 sm:shrink-0"
          />

          <FilterPopup
            onReset={clearFilter}
            onSubmit={handleSearch}
            onOpen={onOpenFilterModal}
          >
            <div className="form-row">
              <FormSelect
                name="permitCategoryId"
                data={permitKinds?.items}
                optionValue={(d) => d.name}
                optionLabel={(d) => d.name}
                label="İcazənin növü"
                labelPosition="outside"
                placeholder="Seçin..."
                control={control}
              />
              <FormSelect
                name="permitTypeId"
                data={permitTypes}
                optionValue={(d) => d.id}
                optionLabel={(d) => d.value}
                label="İcazənin tipi"
                labelPosition="outside"
                placeholder="Seçin..."
                control={control}
              />
            </div>

            <div className="form-row">
              <FormSelect
                name="countryId"
                data={countries}
                optionValue={(d) => d.id}
                optionLabel={(d) => d.value}
                label="Ölkə"
                labelPosition="outside"
                placeholder="Seçin..."
                control={control}
              />
              <FormSelect
                name="statusId"
                data={statuses}
                optionValue={(d) => d.id}
                optionLabel={(d) => d.value}
                label="Status"
                labelPosition="outside"
                placeholder="Seçin..."
                control={control}
              />
            </div>

            <FormSelect
              name="stationId"
              data={stations}
              optionValue={(d) => d.id}
              optionLabel={(d) => d.value}
              label="Göndərilən Məntəqə"
              labelPosition="outside"
              placeholder="Seçin..."
              control={control}
            />

            <div className="form-row items-end">
              <FormDatePicker
                control={control}
                name="minExpirationDate"
                wrapperClassName="w-full"
                label="Qüvvədə olma tarixi"
                labelPosition="outside"
                placeholder="Min."
              />
              <FormDatePicker
                control={control}
                name="maxExpirationDate"
                wrapperClassName="w-full"
                labelPosition="outside"
                placeholder="Max."
              />
            </div>
          </FilterPopup>

          <div className="flex gap-3">
            <Button
              variant="TRANSPARENT"
              icon={SearchIcon}
              iconPosition="end"
              type="submit"
              className="w-full sm:w-auto"
            >
              Axtar
            </Button>
            <Button
              variant="TRANSPARENT"
              icon={CloseIcon}
              type="submit"
              onClick={clearFilter}
              disabled={!isFiltered(filters)}
              aria-label="clear filter"
            />
          </div>
        </form>

        <div className={twMerge(isMobile ? "form-buttons" : "flex gap-3")}>
          <Button
            onClick={handleExport}
            loading={exportLoading}
            variant="OUTLINED"
            icon={ExcelIcon}
            classNames={{ icon: "stroke-none" }}
            iconPosition="end"
          >
            Çıxarış et
          </Button>

          <Button
            icon={Plus}
            iconPosition="end"
            to={(to) =>
              `${to.warehouseExit.baseUrl}/add/${EWarehouseExitSteps.QUOTA_INFO}`
            }
            className="max-sm:w-full"
          >
            Yeni məxaric
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={warehouseExitList?.items}
        count={warehouseExitList?.totalCount}
        title="Məxaric"
        currentPage={page}
        onPageChange={setPage}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
};

export default WarehouseExitPage;
