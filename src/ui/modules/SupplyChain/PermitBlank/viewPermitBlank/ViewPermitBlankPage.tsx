import { EStatus } from "@/data/enum/status";
import { ViewPermitBlankVM } from "@/ui/modules/SupplyChain/PermitBlank/viewPermitBlank/ViewPermitBlankVM";
import Button from "@/ui/shared/Button";
import { StatusCell } from "@/ui/shared/DataTable/StatusCell";
import ListItem from "@/ui/shared/ListItem";
import { StepLayout } from "@/ui/shared/Stepper/StepLayout";
import ArrowLeftIcon from "@svg/arrow-left.svg?react";

const ViewPermitBlankPage = () => {
  const {
    handleEdit,
    isChangingStatus,
    handleChangeStatus,
    blankView,
    permitById,
  } = ViewPermitBlankVM();

  return (
    <StepLayout
      actions={
        <>
          <Button
            variant="LINK"
            className="max-w-60 w-full px-5.5 py-3.5 justify-center text-lg bg-gray-100 text-neutral-900  font-medium leading-6"
            to={(to) => to.permitBlankRegistration.baseUrl}
            icon={ArrowLeftIcon}
            disabled={isChangingStatus}
          >
            Geriyə
          </Button>

          <Button
            className="max-w-60 w-full px-5.5 py-3.5 justify-center text-lg bg-warning-100 text-warning-600  font-medium leading-6"
            onClick={handleEdit}
            disabled={isChangingStatus}
          >
            Redaktə et
          </Button>

          {blankView?.statusId !== EStatus.Confirmed && (
            <Button
              className="max-w-60 w-full px-5.5 py-3.5 justify-center text-lg bg-blue-50 text-blue-600  font-medium leading-6"
              onClick={handleChangeStatus}
              loading={isChangingStatus}
            >
              Statusunu dəyiş
            </Button>
          )}
        </>
      }
    >
      <div className="mt-8 mb-4 border border-gray-200 rounded-2xl p-6 text-lg text-slate-800 font-medium md:w-1/2 md:pr-2.5">
        <div className="flex items-center justify-between gap-3 mb-6">
          <h3 className="font-semibold text-xl">İcazə məlumatları</h3>
          {blankView?.status?.id && blankView?.status?.value && (
            <StatusCell
              status={{
                id: blankView?.status.id,
                label: blankView?.status.value,
              }}
            />
          )}
        </div>

        <div className="flex flex-col gap-2 text-sm text-slate-800">
          <div className="view-block">
            <h4>Göndərən şəxs</h4>

            <ListItem
              label="Adı, soyadı"
              classNames={{ value: "text-start" }}
              value=""
            />
            <ListItem
              label="Vəzifəsi"
              classNames={{ value: "text-start" }}
              value=""
            />
          </div>
          <div className="view-block">
            <h4>Qəbul edən şəxs</h4>

            <ListItem
              label="Adı, soyadı"
              classNames={{ value: "text-start" }}
              value=""
            />
            <ListItem
              label="Vəzifəsi"
              classNames={{ value: "text-start" }}
              value=""
            />
          </div>

          <div className="view-block">
            <ListItem
              label="Yaradılma tarixi"
              classNames={{ value: "text-start" }}
              value={blankView?.createdDate}
            />
          </div>

          <div className="view-block">
            <ListItem label="Kod" value={permitById?.code} />
            <ListItem label="Ölkə" value={permitById?.country?.value} />
            <ListItem
              label="İcazənin tipi"
              value={permitById?.permitType?.value}
            />
            <ListItem
              label="İcazənin növü"
              value={permitById?.permitCategory?.name}
            />
            <ListItem
              label="İcazə blanklarının defisitliyi"
              value={permitById?.deficiencyLevelType?.value}
            />
          </div>

          <div className="view-block">
            <ListItem label="Başlanğıc nömrə" value={blankView?.startNumber} />
            <ListItem label="Son nömrə" value={blankView?.endNumber} />
            <ListItem label="Ümumi say" value={blankView?.count} />
          </div>

          <div className="view-block">
            <ListItem
              label="Mübadilə növü"
              value={blankView?.exchangeType?.value}
            />
            <ListItem label="Mərkəzi anbar" value={blankView?.station?.value} />
          </div>

          <div className="view-block">
            <ListItem label="Təsvir" value={blankView?.description} vertical />
          </div>
        </div>
      </div>
    </StepLayout>
  );
};

export default ViewPermitBlankPage;
