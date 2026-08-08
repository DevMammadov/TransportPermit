import AppRoutes from "@/app/routes";
import { DialogProvider } from "@/ui/shared/Dialog";
import ErrorBoundary from "@/ui/shared/ErrorBoundary";
import Tooltip from "@/ui/shared/Tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dayjs from "dayjs";
import "dayjs/locale/az";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MenuProvider } from "./ui/containers/Aside/MenuProvider";

dayjs.locale("az");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <QueryClientProvider client={queryClient}>
        <DialogProvider>
          <MenuProvider>
            <AppRoutes />
          </MenuProvider>
        </DialogProvider>
        <ToastContainer
          position="bottom-right"
          hideProgressBar
          autoClose={2000}
          pauseOnHover={false}
          toastClassName={"!p-0 !items-stretch rounded-md! !h-auto !min-h-14"}
        />
        <Tooltip />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
