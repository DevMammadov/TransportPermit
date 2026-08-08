import { TNoResult } from "@/ui/components/NoResult/TNoResult";
import Button from "@/ui/shared/Button";
import Spinner from "@/ui/shared/Spinner";
import Transition from "@/ui/shared/Transition";
import NoResultIcon from "@svg/no-results.svg?react";
import PlusIcn from "@svg/plus.svg?react";

const NoResult = ({
  loading,
  title,
  buttonTitle,
  showButton = true,
  to,
}: TNoResult) => {
  return (
    <Transition show as="div" className="flex-center h-full w-full">
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex-col flex-center gap-4">
          <div>
            <NoResultIcon />
          </div>
          <span className="text-2xl font-medium text-gray-700">{title}</span>
          {buttonTitle && to && showButton && (
            <Button icon={PlusIcn} to={to}>
              {buttonTitle}
            </Button>
          )}
        </div>
      )}
    </Transition>
  );
};

export default NoResult;
