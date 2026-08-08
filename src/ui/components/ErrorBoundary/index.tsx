import ErrorFallback from "@/ui/components/ErrorBoundary/ErrorFallback";
import { TErrorBoundary } from "@/ui/components/ErrorBoundary/TErrorBoundary";
import {
  ErrorBoundary as ReactErrorBoundary,
  ErrorBoundaryProps,
} from "react-error-boundary";

const ErrorBoundary = ({ children }: TErrorBoundary & ErrorBoundaryProps) => {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
