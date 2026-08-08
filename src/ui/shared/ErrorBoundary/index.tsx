import ErrorFallback from "./ErrorFallback";
import { TErrorBoundary } from "./TErrorBoundary";
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
