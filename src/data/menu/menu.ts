import { links } from "@/app/routes/links";
import PackageSearchIcon from "@svg/package-search.svg?react";
import PlaceholderIcon from "@svg/placeholder.svg?react";
import { TMenu } from "./TMenu";

export const menu: TMenu[] = [
  {
    label: "Təchizat zənciri",
    icon: PackageSearchIcon,
    children: [
      // {
      //   label: "İcazə blankı qeydiyyatı",
      //   isIndex: true,
      //   link: "/",
      // },
      {
        label: "İcazə blankı qeydiyyatı",
        link: links.permitBlankRegistration.baseUrl,
      },
      {
        label: "İcazələrin Reyestri",
        link: links.permits.baseUrl,
      },
      {
        label: "Anbar mədaxil",
        link: links.warehouseEntrance.baseUrl,
      },
      {
        label: "Anbar məxaric",
        link: links.warehouseExit.baseUrl,
      },
      {
        label: "Zədələnmiş icazələr",
        link: links.invalidPermitBlank.baseUrl,
      },
      {
        label: "Məntəqə mədaxil",
        link: links.pointInbound.baseUrl,
      },
      {
        label: "Məntəqə Transfer",
        link: links.pointTransfer.baseUrl,
      },
    ],
  },
  {
    label: "Soraqçalar",
    icon: PlaceholderIcon,
    children: [
      {
        label: "Soragca 1",
        isIndex: true,
        link: "/1",
      },
      {
        label: "Soragca 2",
        link: "/2",
      },
    ],
  },
];
