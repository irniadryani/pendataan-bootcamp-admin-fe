import { NavLink as Link, useLocation, useNavigate } from "react-router-dom";
import WgsLogo from "@/assets/logo_wgs_fullBlack.svg";
import { LiaTimesSolid } from "react-icons/lia";
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
import { toast } from "react-toastify";
import { GoHome } from "react-icons/go";
import { HiOutlineUserGroup } from "react-icons/hi";
import { VscAccount } from "react-icons/vsc";
import { BiSolidUserDetail } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { settingFn } from "@/api/Setting";
import { useQuery } from "react-query";

 // Navigation item for dashboard
const navigation = [
  { name: "Home", href: "/", icon: <GoHome />, current: false },
  {
    name: "Batch",
    href: "/batch",
    icon: <HiOutlineUserGroup />,
    current: false,
  },
  {
    name: "Create Participant",
    href: "/createaccount",
    icon: <VscAccount />,
    current: false,
  },
  {
    name: "Participants",
    href: "/participants",
    icon: <BiSolidUserDetail />,
    current: false,
  },
  {
    name: "Setting",
    href: "/setting",
    icon: <IoMdSettings />,
    current: false,
  },
];

// Sidebar component for navigation and displaying user information
export default function Sidebar({ children }) {
  const location = useLocation(); // Getting current location using useLocation hook

   // Mapping navigation items and updating current based on current pathname
  const updatedNavigation = navigation.map((item) => {
    return {
      ...item,
      current: item.href === location.pathname,
    };
  });

 // Fetching setting data using useQuery from react-query
  const {
    data: dataSetting,
    refetch: refetchSetting,
    isLoading: loadingSetting,
    isRefetching: refetchingSetting,
  } = useQuery("setting", settingFn);

  return (
    <div className="drawer !h-dvh lg:drawer-open bg-white">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content overflow-y-auto flex flex-col overflow-x-hidden">
        {children}
      </div>
      <div className="drawer-side !h-dvh z-50">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex flex-col p-4 w-full sm:w-80 h-[100%] bg-base-200 text-base-content">
          <div className="h-32 mb-2 mt-4 px-4 flex items-center justify-between lg:justify-center">
            <div className="flex w-36 h-auto">
              <img
                src={`${import.meta.env?.VITE_IMAGE_HOST?.replace(/\/$/, "")}/${
                  dataSetting?.contents?.image_logo_admin
                }`}
                alt="logo"
                className="w-full"
              />
            </div>
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost drawer-button lg:hidden"
            >
              <LiaTimesSolid size={18} />
            </label>
          </div>

          <ul className="!block text-base font-medium menu h-[70%] overflow-y-auto gap-1 bg-base-200 w-full">
            {updatedNavigation.map((item, index) => (
              <li key={index} className="mb-2">
                <Link
                  className={
                    item.current
                      ? "active !bg-sky-900 !text-white"
                      : "!bg-transparent hover:!bg-sky-900 hover:!text-white"
                  }
                  to={item.href}
                  onClick={() =>
                    (document.getElementById("my-drawer-2").checked = false)
                  }
                >
                  <div className="flex items-center gap-4">
                    <div>{item.icon}</div>
                    {item.name}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
