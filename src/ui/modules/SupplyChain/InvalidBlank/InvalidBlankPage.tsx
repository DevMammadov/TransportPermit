import { isFiltered } from "@/app/helpers/common";
import { useMedia } from "@/app/hooks/useMedia";
import FilterPopup from "@/ui/components/FilterPopup";
import NoResult from "@/ui/components/NoResult";
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
import { InvalidBlankVM } from "./InvalidBlankVM";
import { EInvalidBlankSteps } from "@/ui/modules/SupplyChain/InvalidBlank/TInvalidBlank";

const InvalidBlankPage = () => {
  const {
    permitCodes,
    openFilterModal,
    statuses,
    permitKinds,
    permitTypes,
    exchangeTypes,
    stations,
    page,
    setPage,
    filters,
    control,
    handleSearch,
    clearFilter,
    setPageSize,
    pageSize,
    columns,
    invalidBlankList,
    exportLoading,
    handleExport,
  } = InvalidBlankVM();

  const { isMobile } = useMedia();

  if (!invalidBlankList?.items?.length && !isFiltered(filters)) {
    return (
      <NoResult
        title="Daxil edilmiş kvota yoxdur"
        to={(to) =>
          `${to.invalidPermitBlank.baseUrl}/add/${EInvalidBlankSteps.PERMIT_INFO}`
        }
        buttonTitle="İcazə əlavə et"
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
            onOpen={openFilterModal}
          >
            <FormSelect
              name="codeId"
              data={permitCodes?.items}
              optionValue={(d) => d.id}
              optionLabel={(d) => d.code}
              label="Kod"
              labelPosition="outside"
              placeholder="Seçin..."
              control={control}
            />
            <div className="form-row">
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
              <FormSelect
                name="permitKindId"
                data={permitKinds?.items}
                optionValue={(d) => d.name}
                optionLabel={(d) => d.name}
                label="İcazənin növü"
                labelPosition="outside"
                placeholder="Seçin..."
                control={control}
              />
            </div>

            <div className="form-row">
              <FormSelect
                name="exchangeTypeId"
                data={exchangeTypes}
                optionValue={(d) => d.id}
                optionLabel={(d) => d.value}
                label="Mübadilə növü"
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
              name="destinationId"
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
                name="validFromDate"
                wrapperClassName="w-full"
                label="Qüvvədə olma tarixi"
                labelPosition="outside"
                placeholder="Min."
              />
              <FormDatePicker
                control={control}
                name="validToDate"
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
              `${to.invalidPermitBlank.baseUrl}/add/${EInvalidBlankSteps.PERMIT_INFO}`
            }
            className="max-sm:w-full"
          >
            İcazə əlavə et
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={invalidBlankList?.items}
        count={invalidBlankList?.totalCount}
        title="Əlavə edilmiş zədələnmiş icazələr"
        currentPage={page}
        onPageChange={setPage}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
};

export default InvalidBlankPage;
