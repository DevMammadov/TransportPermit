import { FallbackProps } from "react-error-boundary";
import AlertCircleIcon from "@svg/alert-circle.svg?react";
import Button from "@/ui/shared/Button";

const ErrorFallback = ({ error }: FallbackProps) => {
  console.log(error);

  return (
    <div className="h-screen w-full flex-center font-semibold text-4xl flex-col gap-4">
      <AlertCircleIcon className="stroke-red-700 h-[40px] w-[40px]" />
      <div className="text-red-700">Gözlənilməz xəta baş verdi</div>

      <Button
        onClick={() => {
          location.href = "/";
        }}
        variant="OUTLINED"
        className="py-1"
      >
        Ana səhifəyə get
      </Button>
    </div>
  );
};

export default ErrorFallback;
