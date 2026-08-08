import { TMenu } from "@/data/menu/TMenu";
// import AvatarIcon from "@svg/avatar.svg?react";
// import FileIcon from "@svg/file.svg?react";
import LogoutIcon from "@svg/logout.svg?react";

export const profileMenu: TMenu[] = [
  // {
  //   title: "Şəxsi məlumatlar",
  //   icon: AvatarIcon,
  //   link: "/profile",
  // },
  // {
  //   title: "İstifadə qaydaları",
  //   icon: FileIcon,
  //   link: "/rules-of-use",
  // },
  {
    title: "Çıxış",
    icon: LogoutIcon,
    link: "/logout",
    label: "",
  },
];
