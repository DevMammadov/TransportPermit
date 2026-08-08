import { NotificationPopupVM } from "@/ui/components/NotificationPopup/NotificationPopupVM";
import Button from "@/ui/shared/Button";
import BellRingingIcon from "@svg/bell-ringing.svg?react";

const NotificationPopup = () => {
  const { unreadCount } = NotificationPopupVM();

  return (
    <div className="relative">
      <span className="absolute bg-error-600 text-white rounded-full h-6 min-w-6 p-1 flex-center text-xs font-bold -right-1 -top-1 translate-y-[-20%]">
        {unreadCount}
      </span>
      <Button
        variant="OUTLINED"
        className="p-4 border-0 border-gray-200 sm:border"
        classNames={{ icon: "size-6 stroke-gray-950" }}
        icon={BellRingingIcon}
        to={(to) => to.notification.main}
        aria-label="notification bell button"
      />
    </div>
  );
};

export default NotificationPopup;
