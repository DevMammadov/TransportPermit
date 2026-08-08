import { links } from "@/app/routes/links";
import { TExpandedMatch } from "@/ui/components/Breadcrump/TBradcrump";
import MainLayout from "@/ui/layout/MainLayout";
import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const PermitBlankPage = lazy(
  () => import("@/ui/modules/SupplyChain/PermitBlank/PermitBlankPage"),
);

const NewPermitBlankPage = lazy(
  () =>
    import("@/ui/modules/SupplyChain/PermitBlank/newPermitBlank/NewPermitBlankPage"),
);

const ViewPermitBlankPage = lazy(
  () =>
    import("@/ui/modules/SupplyChain/PermitBlank/viewPermitBlank/ViewPermitBlankPage"),
);

const PermitsPage = lazy(
  () => import("@/ui/modules/SupplyChain/Blank/BlankPage"),
);

const InvalidBlankPage = lazy(
  () => import("@/ui/modules/SupplyChain/InvalidBlank/InvalidBlankPage"),
);

const NewInvalidBlankPage = lazy(
  () =>
    import("@/ui/modules/SupplyChain/InvalidBlank/newInvalidBlanks/NewInvalidBlanksPage"),
);

const ViewInvalidBlankPage = lazy(
  () =>
    import("@/ui/modules/SupplyChain/InvalidBlank/viewInvalidBlanks/ViewInvalidBlanksPage"),
);

const WarehouseEntrancePage = lazy(
  () =>
    import("@/ui/modules/SupplyChain/WarehouseEntrance/WarehouseEntrancePage"),
);

const WarehouseExitPage = lazy(
  () => import("@/ui/modules/SupplyChain/WarehouseExit/WarehouseExitPage"),
);

const NewWarehouseExitPage = lazy(
  () =>
    import("@/ui/modules/SupplyChain/WarehouseExit/newWarehouseExit/NewWarehouseExitPage"),
);

const PointInboundPage = lazy(
  () => import("@/ui/modules/SupplyChain/PointInbound/PointInboundPage"),
);

const PointTransferPage = lazy(
  () => import("@/ui/modules/SupplyChain/PointTransfer/PointTransferPage"),
);

const NewPointTransferPage = lazy(
  () =>
    import("@/ui/modules/SupplyChain/PointTransfer/newPointTransfer/NewPointTransferPage"),
);

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        handle: { breadcrumb: "Təchizat zənciri" },
        children: [
          {
            path: "/",
            element: <></>,
            handle: {
              breadcrumb: "Təchizat zənciri",
            },
          },
          {
            path: links.invalidPermitBlank.baseUrl,
            handle: {
              breadcrumb: "Zədələnmiş icazə blankları",
            },
            children: [
              {
                index: true,
                element: <InvalidBlankPage />,
              },
              {
                path: links.stepUrl,
                element: <NewInvalidBlankPage />,
                handle: {
                  breadcrumb: (match: TExpandedMatch) =>
                    match.params.page === "update"
                      ? "Redaktə et"
                      : "İcazə əlavə et",
                  title: (match: TExpandedMatch) =>
                    match.params.page === "update"
                      ? "Redaktə et"
                      : "Zədələnmiş icazə blankları əlavə et",
                },
              },
              {
                path: links.viewUrl,
                element: <ViewInvalidBlankPage />,
                handle: {
                  title: "İcazəyə ətraflı baxış",
                  breadcrumb: (match: TExpandedMatch) =>
                    `İcazə #${match?.params?.id}`,
                },
              },
            ],
          },
          {
            path: links.permitBlankRegistration.baseUrl,
            handle: {
              breadcrumb: "İcazə blankı məlumatların qeydiyyatı",
            },
            children: [
              {
                index: true,
                element: <PermitBlankPage />,
              },
              {
                path: links.stepUrl,
                element: <NewPermitBlankPage />,
                handle: {
                  breadcrumb: (match: TExpandedMatch) =>
                    match.params.page === "update"
                      ? "İcazə redaktə et"
                      : "İcazə əlavə et",
                  title: (match: TExpandedMatch) =>
                    match.params.page === "update"
                      ? "İcazə redaktə et"
                      : "İcazə əlavə et",
                },
              },
              {
                path: links.viewUrl,
                element: <ViewPermitBlankPage />,
                handle: {
                  title: "İcazə blankına ətraflı baxış",
                  breadcrumb: (match: TExpandedMatch) =>
                    `İcazə #${match?.params?.id}`,
                },
              },
            ],
          },
          {
            path: links.permits.baseUrl,
            element: <PermitsPage />,
            handle: {
              breadcrumb: "İcazələrin Reyestri",
            },
          },
          {
            path: links.warehouseEntrance.baseUrl,
            element: <WarehouseEntrancePage />,
            handle: {
              breadcrumb: "Anbar mədaxil",
            },
          },
          {
            path: links.warehouseExit.baseUrl,
            handle: {
              breadcrumb: "Anbar məxaric",
            },
            children: [
              {
                index: true,
                element: <WarehouseExitPage />,
              },
              {
                path: links.stepUrl,
                element: <NewWarehouseExitPage />,
                handle: {
                  breadcrumb: (match: TExpandedMatch) =>
                    match.params.page === "update"
                      ? "Redaktə et"
                      : "Məxaric et",
                  title: (match: TExpandedMatch) =>
                    match.params.page === "update"
                      ? "Redaktə et"
                      : "Məxaric et",
                },
              },
            ],
          },
          {
            path: links.pointInbound.baseUrl,
            element: <PointInboundPage />,
            handle: {
              breadcrumb: "Məntəqə mədaxil",
            },
          },
          {
            path: links.pointTransfer.baseUrl,
            handle: {
              breadcrumb: "Məntəqə Transfer",
            },
            children: [
              {
                index: true,
                element: <PointTransferPage />,
              },
              {
                path: links.stepUrl,
                element: <NewPointTransferPage />,
                handle: {
                  breadcrumb: (match: TExpandedMatch) =>
                    match.params.page === "update"
                      ? "Redaktə et"
                      : "Məxaric et",
                  title: (match: TExpandedMatch) =>
                    match.params.page === "update"
                      ? "Redaktə et"
                      : "Məxaric et",
                },
              },
            ],
          },
        ],
      },
      {
        handle: { breadcrumb: "Soraqcalar" },
        children: [
          {
            path: "/1",
            element: <div></div>,
            handle: {
              breadcrumb: "Soraqca 1",
            },
          },
          {
            path: "/2",
            element: <div></div>,
            handle: {
              breadcrumb: "Soraqca 2",
            },
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
