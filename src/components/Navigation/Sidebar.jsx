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

export default function Sidebar({ children }) {
  const location = useLocation();

  const updatedNavigation = navigation.map((item) => {
    return {
      ...item,
      current: item.href === location.pathname,
    };
  });

  console.log(updatedNavigation);

  console.log(location.pathname);

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
          <div className="h-[10%] mb-2 mt-4 px-4 flex items-center justify-between lg:justify-center">
            <img
              src={`${import.meta.env?.VITE_IMAGE_HOST?.replace(/\/$/, "")}/${
                dataSetting?.contents?.image_logo_admin
              }`}
              alt="Shoes"
              className="w-20"
            />
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

          {/* <div className='divider h-[5%]'></div>
						<div className='flex h-[15%] items-center justify-between'>
							<div className='flex items-center gap-3'>
								<div className='rounded-full shadow-sm'>
									<img
										className='rounded-full w-16'
										src={dummyAvatarImg}
										alt=''
									/>
								</div>
								<div>
									<p className='text-lg font-semibold capitalize'>
										
									</p>
									<p className=''>
										
									</p>
								</div>
							</div>
							<Button
								className='tooltip tooltip-secondary h-fit'
								variant='solid'
								color='transparent'
								data-tip='Logout'
								onClick={() =>
									document
										.getElementById('confirm-logout-modal')
										.showModal()
								}
							>
								<BiLogOut size={24} color='#E74C3C' />
							</Button>
						</div> */}
        </div>
      </div>
      {/* <dialog id='confirm-logout-modal' className='modal'>
				<div className='modal-box'>
					<h3 className='font-bold text-lg text-[#E74C3C]'>Logout</h3>
					<p className='py-4'>Are you sure you want to logout?</p>
					<div className='modal-action'>
						<form method='dialog'>
							<Button className='btn !rounded-lg'>Close</Button>
							<Button
								className='btn !rounded-lg text-[#E74C3C]'
							>
								Logout
							</Button>
						</form>
					</div>
				</div>
			</dialog> */}
    </div>
  );
}
