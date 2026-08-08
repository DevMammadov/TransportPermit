import AddPermitPopup from "@/ui/modules/SupplyChain/InvalidBlank/newInvalidBlanks/steps/invalid-permits/components/add-permit-popup";
import { InvalidPermitsVM } from "@/ui/modules/SupplyChain/InvalidBlank/newInvalidBlanks/steps/invalid-permits/InvalidPermitsVM";
import Button from "@/ui/shared/Button";
import DataTable from "@/ui/shared/DataTable";
import { StepLayout } from "@/ui/shared/Stepper/StepLayout";
import ArrowLeftIcon from "@svg/arrow-left.svg?react";
import ArrowRightIcon from "@svg/arrow-right.svg?react";
import EmptyStatesIcon from "@svg/empty-states.svg?react";
import Plus from "@svg/plus.svg?react";
import { ReactNode } from "react";

const InvalidPermitsPage = () => {
  const {
    prevStep,
    control,
    onSubmit,
    ranged,
    setRanged,
    isModalOpen,
    setIsModalOpen,
    columns,
    rejectedPermitsList,
    totalCount,
    page,
    setPage,
    handleNext,
    error,
    damageTypes,
  } = InvalidPermitsVM();

  const renderAddPopup = (trigger: (openModal: () => void) => ReactNode) => (
    <AddPermitPopup
      control={control}
      onSubmit={onSubmit}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      ranged={ranged}
      setRanged={setRanged}
      renderTrigger={trigger}
      damageTypes={damageTypes}
    />
  );

  return (
    <StepLayout
      actions={
        <>
          <Button
            variant="LINK"
            className="max-w-60 w-full px-5.5 py-3.5 justify-center text-lg bg-gray-100 text-neutral-900  font-medium leading-6"
            onClick={prevStep}
            icon={ArrowLeftIcon}
          >
            Geriyə
          </Button>

          <Button
            className="max-w-60 w-full px-5 py-3.5 justify-center text-lg text-white font-medium leading-6"
            onClick={handleNext}
            form="rejected-items-form"
            icon={ArrowRightIcon}
            iconPosition="end"
          >
            Növbəti
          </Button>
        </>
      }
    >
      {totalCount > 0 ? (
        <DataTable
          columns={columns}
          data={rejectedPermitsList}
          count={totalCount}
          title="Əlavə edilmiş yararsız kvotalar"
          currentPage={page}
          onPageChange={setPage}
          className="mb-2"
          isHeightFixed={false}
          actions={renderAddPopup((openModal) => (
            <Button
              onClick={openModal}
              icon={Plus}
              iconPosition="end"
              className="text-sm py-2.5 px-4"
            >
              Əlavə et
            </Button>
          ))}
        />
      ) : (
        <div className="flex justify-center min-h-[55vh] items-center border border-gray-200 rounded-md p-3">
          <div className="flex flex-col flex-center">
            <EmptyStatesIcon />
            <p className="text-gray-400 text-lg font-semibold mt-2 max-w-55 text-center">
              Əlavə edilmiş zədələnmiş icazə yoxdur
            </p>

            {renderAddPopup((openModal) => (
              <Button
                onClick={openModal}
                icon={Plus}
                iconPosition="end"
                className="text-sm py-2.5 px-4 mt-2"
              >
                Əlavə et
              </Button>
            ))}
            {error && (
              <p className="text-sm text-error-500 font-medium mt-1">
                Mütləq əlavə olunmalıdır
              </p>
            )}
          </div>
        </div>
      )}
    </StepLayout>
  );
};

export default InvalidPermitsPage;
