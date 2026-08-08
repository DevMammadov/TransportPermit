import { getFullName } from "@/app/helpers/string";
import { getCurrentUser } from "@/app/hooks/useSession";
import noAvatar from "@/data/assets/images/no-avatar.jpg";
import { profileMenu } from "@/data/menu/profileMenu";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { TUserProfile } from "./TUserProfile";

const UserProfile = ({ img, className }: TUserProfile) => {
  const { person, organization, isCentralUser } = getCurrentUser();

  return (
    <div className={twMerge("relative", className)}>
      <Popover className="relative">
        {() => (
          <>
            <PopoverButton className="py-1.5 pl-2 pr-6 flex gap-2 border-gray-200 border rounded-md">
              <img
                className="size-8 rounded-full"
                src={img || noAvatar}
                alt="no avatar picture"
              />
              <div className="flex flex-col">
                <h2 className="text-sm text-gray-900 font-medium text-left">
                  {getFullName(person?.document)}
                </h2>
                <span className="text-xs text-gray-500 flex">
                  {person?.pin} -
                  {isCentralUser ? `Ayna` : `${organization?.tin}`}
                </span>
              </div>
            </PopoverButton>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute left-1/2 z-10 -translate-x-1/2 transform px-4 sm:px-0 w-full bg-white">
                <div className="w-3 h-3 m-auto bg-white rotate-45 transform origin-bottom-left border-black/5 border-s border-t select-none"></div>
                <ul className="overflow-hidden rounded-md shadow-md ring-1 ring-black/5 p-3">
                  {profileMenu.map(({ icon: Icon, link = "#", title }) => (
                    <li key={title}>
                      <NavLink
                        key={title}
                        to={link}
                        className={twMerge(
                          link === "/logout"
                            ? "text-danger-500"
                            : "text-gray-600",
                          "flex gap-3 p-3",
                        )}
                      >
                        <div
                          className={twMerge(
                            link === "/logout"
                              ? "[&>svg]:stroke-danger-500"
                              : "[&>svg]:stroke-gray-600",
                            "h-6 w-6 flex-center",
                          )}
                        >
                          {Icon && <Icon />}
                        </div>
                        <span>{title}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default UserProfile;
