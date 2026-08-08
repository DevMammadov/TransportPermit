import { ViewInvalidBlanksVM } from "@/ui/modules/SupplyChain/InvalidBlank/viewInvalidBlanks/ViewInvalidBlanksVM";
import ListItem from "@/ui/modules/SupplyChain/WarehouseExit/components/list-item";
import Button from "@/ui/shared/Button";
import DataTable from "@/ui/shared/DataTable";
import { StepLayout } from "@/ui/shared/Stepper/StepLayout";
import ArrowLeftIcon from "@svg/arrow-left.svg?react";

const ViewRejectedBlanksPage = () => {
  const {
    columns,
    page,
    rejectedPermitsList,
    setPage,
    totalCount,
    handleEdit,
  } = ViewInvalidBlanksVM();

  return (
    <StepLayout
      actions={
        <>
          <Button
            variant="LINK"
            className="max-w-60 w-full px-5.5 py-3.5 justify-center text-lg bg-gray-100 text-neutral-900  font-medium leading-6"
            to={(to) => to.invalidPermitBlank.baseUrl}
            icon={ArrowLeftIcon}
          >
            Geriyə
          </Button>

          <Button
            className="max-w-60 w-full px-5.5 py-3.5 justify-center text-lg bg-warning-100 text-warning-600  font-medium leading-6"
            onClick={handleEdit}
          >
            Redaktə et
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-[45vh] overflow-y-scroll custom-scrollbar mt-8 mb-4 border border-gray-200 rounded-2xl p-6 text-slate-800 font-medium md:pr-2.5">
          <h3 className="font-semibold text-xl mb-6">Yaradan şəxs</h3>
          <div className="view-block">
            <ListItem
              label="Adı, soyadı"
              classNames={{ value: "text-start" }}
              value="-"
            />
            <ListItem
              label="Yaradılma tarixi"
              classNames={{ value: "text-start" }}
              value="-"
            />
          </div>

          <h3 className="font-semibold text-xl my-6">İcazə məlumatları</h3>

          <div className="view-block mb-2">
            <h4>Göndərən şəxs</h4>

            <ListItem
              label="Adı, soyadı"
              classNames={{ value: "text-start" }}
              value="-"
            />
            <ListItem
              label="Vəzifəsi"
              classNames={{ value: "text-start" }}
              value="-"
            />
          </div>

          <div className="view-block">
            <h4>Qəbul edən şəxs</h4>

            <ListItem
              label="Adı, soyadı"
              classNames={{ value: "text-start" }}
              value="-"
            />
            <ListItem
              label="Vəzifəsi"
              classNames={{ value: "text-start" }}
              value="-"
            />
          </div>
        </div>

        {/* {!isEmpty(declaration?.history) && (
          <div className="h-[45vh] overflow-y-scroll custom-scrollbar mt-8 mb-4 border border-gray-200 rounded-2xl p-6 text-slate-800 font-medium md:pr-2.5">
            <h3 className="font-semibold text-xl mb-6">Tarixçə</h3>

            {(declaration?.history ?? []).map((h, i, arr) => (
              <div key={h?.id}>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-gray-500 font-normal">{h?.date}</p>
                  <StatusCell
                    status={{
                      id: h?.statusId,
                      label: h?.statusLabel,
                    }}
                  />
                </div>

                <h4 className="mt-3 font-bold text-sm">{h?.user?.fullName}</h4>
                <p className="mt-1 font-normal text-gray-500 text-xs">
                  {h?.user?.company} - {h?.user?.position}
                </p>

                <Alert
                  className="mt-3"
                  classNames={{
                    icon: "fill-none stroke-blue-600",
                    wrapper: "pl-1",
                  }}
                  icon={InfoCircleIcon}
                  type="Confirm"
                  title={
                    <div className="font-normal">
                      <span className="font-bold">{h?.messageCode}</span>
                      {h?.messageText}
                    </div>
                  }
                />
                {i !== arr.length - 1 && (
                  <hr className="border-0 h-px bg-gray-200 my-6" />
                )}
              </div>
            ))}
          </div>
        )} */}
      </div>

      {!!totalCount && (
        <DataTable
          columns={columns}
          data={rejectedPermitsList}
          count={totalCount}
          title="Əlavə edilmiş zədələnmiş icazələr"
          currentPage={page}
          onPageChange={setPage}
          isHeightFixed={false}
          className="mb-6"
        />
      )}
    </StepLayout>
  );
};

export default ViewRejectedBlanksPage;
