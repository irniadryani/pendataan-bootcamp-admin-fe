import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../Navigation/Sidebar";
import { MdEdit } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import useStore from "@/store";
import { Button } from "../Button";
import { toast } from "react-toastify";
import { currentUserFn } from "@/api/Auth";
import { useQuery } from "react-query";
import { allParticipantsFn } from "@/api/Participant";
import EditProfile from "@/components/Layout/EditProfile";
import { IoKey } from "react-icons/io5";
import ChangePassword from "./ChangePassword";
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";

export default function AuthorizeLayout(props) {
  const { content } = props;

  const {
    data: dataCurrentUser,
    refetch: refetchPengajar,
    isLoading: loadingParticipants,
  } = useQuery("authUser", currentUserFn);

  const store = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    store.setUserToken(null);
    navigate("/login");
    toast.success("You successfully logged out");
    navigate(from);
  };

  return (
    <main>
      <Sidebar>
        <div className="w-full">
          <div className="flex justify-between items-center z-40 sticky top-0 bg-white/80 backdrop-blur-xl">
            <div className="lg:hidden navbar navbar-transition bg-base">
              <div className="">
                <label
                  htmlFor="my-drawer-2"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost drawer-button lg:hidden"
                >
                  <HiOutlineBars3CenterLeft size={24} />
                </label>
              </div>
            </div>

            <div className="p-2 w-full flex justify-end gap-2 items-center">
              <div className="text-end">
                <p className="text-sm font-bold">{dataCurrentUser?.nama}</p>
                <p className="text-xs font-semibold">
                  {dataCurrentUser?.email}
                </p>
              </div>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="m-2">
                  <div className="rounded-full w-10 h-10 cursor-pointer">
                    <img
                      src={`${import.meta.env?.VITE_IMAGE_HOST?.replace(
                        /\/$/,
                        ""
                      )}/${dataCurrentUser?.pengajar?.url}`}
                      alt="Avatar"
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-2"
                >
                  <li>
                    <button
                      className=""
                      onClick={() => {
                        document
                          .getElementById("edit-profile-modal")
                          .showModal();
                      }}
                    >
                      <div className="flex items-center">
                        <MdEdit className="mr-2" color="black" />
                        Edit
                      </div>
                    </button>
                  </li>
                  <li>
                    <button
                      className=""
                      onClick={() => {
                        document
                          .getElementById("change-password-modal")
                          .showModal();
                      }}
                    >
                      <div className="flex items-center">
                        <IoKey className="mr-2" color="black" />
                        Change Password
                      </div>
                    </button>
                  </li>
                  <li>
                    <button
                      className=""
                      onClick={() =>
                        document
                          .getElementById("confirm-logout-modal")
                          .showModal()
                      }
                    >
                      <div className="flex items-center text-red-600">
                        <MdLogout className="mr-2" color="red" />
                        Logout
                      </div>
                    </button>
                  </li>
                </ul>
              </div>
              <dialog id="confirm-logout-modal" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg text-[#E74C3C]">Logout</h3>
                  <p className="py-4">Are you sure you want to logout?</p>
                  <div className="modal-action">
                    <form method="dialog">
                      <Button className="btn !rounded-lg">Close</Button>
                      <Button
                        onClick={() => handleLogout()}
                        className="btn !rounded-lg text-[#E74C3C]"
                      >
                        Logout
                      </Button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
          <EditProfile
            refetchPengajar={refetchPengajar}
            pengajarId={dataCurrentUser?.pengajar?.id}
          />
          <ChangePassword
            refetchPengajar={refetchPengajar}
            pengajarId={dataCurrentUser?.pengajar?.id}
          />
          <div className="p-4">{content ?? <Outlet />}</div>
        </div>
      </Sidebar>
    </main>
  );
}
