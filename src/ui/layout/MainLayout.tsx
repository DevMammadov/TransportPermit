import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Header from "@/ui/containers/Header";
import Aside from "@/ui/containers/Aside";
import Spinner from "@/ui/shared/Spinner";

const MainLayout = () => {
  return (
    <main className="w-full flex h-screen">
      <Aside />
      <article className="grow flex flex-col w-full">
        <Header />
        <Suspense
          fallback={
            <div className="min-h-screen w-full flex-center absolute top-0 left-0">
              <Spinner size="lg" />
            </div>
          }
        >
          <section className="relative grow overflow-y-auto">
            <Outlet />
          </section>
        </Suspense>
      </article>
    </main>
  );
};

export default MainLayout;
