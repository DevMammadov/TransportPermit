import NotificationPopup from "@/ui/components/NotificationPopup";
import UserProfile from "@/ui/components/UserProfile";
import Breadcrump from "@/ui/components/Breadcrump";
import MenuIcon from "@svg/menu.svg?react";
import Button from "@/ui/shared/Button";
import { useMenu } from "@/ui/containers/Aside/MenuProvider";

const Header = () => {
  const { toggleMenu } = useMenu();

  return (
    <div className="flex lg:py-7 py-4 lg:px-8 px-4 justify-between items-center border-b border-b-gray-200">
      <div className="lg:hidden">
        <Button
          variant="LINK"
          icon={MenuIcon}
          className="hover:bg-transparent lg:hidden"
          classNames={{ icon: "h-6 w-6" }}
          onClick={() => toggleMenu()}
        />
      </div>
      <Breadcrump />
      <div className="flex gap-3 items-center">
        <NotificationPopup />
        <UserProfile className="hidden lg:block" />
      </div>
    </div>
  );
};

export default Header;
