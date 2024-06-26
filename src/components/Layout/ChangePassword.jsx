import React, { useEffect, useState } from "react";
import {
  changePasswordPengajarFn,
  detailSinglePengajarFn,
} from "@/api/Pengajar";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import Swal from "sweetalert2";

export default function ChangePassword({ pengajarId, refetchPengajar }) {
   // State variables for toggling password visibility
  const [showCurPassword, setShowCurPassword] = useState();
  const toggleCurPassword = () => setShowCurPassword((prev) => !prev);

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const [showConfPassword, setShowConfPassword] = useState(false);
  const toggleConfPassword = () => setShowConfPassword((prev) => !prev);

  // Form handling using react-hook-form
  const {
    register,
    handleSubmit: submitChangePassword,
    formState: { errors },
    reset: resetChangePassword,
    getValues,
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confPassword: "",
    },
  });

  // Query to fetch single pengajar data based on pengajarId
  const {
    data: dataSinglePengajar,
    refetch: refetchSinglePengajar,
    isLoading: loadingSinglePengajar,
  } = useQuery(["pengajar", pengajarId], () => pengajarId);

   // useEffect to refetch single pengajar data when pengajarId changes
  useEffect(() => {
    if (pengajarId !== null || pengajarId !== undefined) {
      refetchSinglePengajar();
    }
  }, [pengajarId, refetchSinglePengajar]);

   // useEffect to set form values when single pengajar data is loaded
  useEffect(() => {
    if (!loadingSinglePengajar && dataSinglePengajar) {
      resetChangePassword({
        newPassword: dataSinglePengajar.newPassword,
        confPassword: dataSinglePengajar.confPassword,
      });
    }
  }, [loadingSinglePengajar, dataSinglePengajar, resetChangePassword]);

  // useMutation for handling password change
  const handleChangePassword = useMutation({
    mutationFn: (data) => changePasswordPengajarFn(pengajarId, data),

    onMutate() {},
    onSuccess: async (res) => {
      console.log(res);
      await document.getElementById("change-password-modal").close();
      await refetchSinglePengajar();
      await refetchPengajar();
      resetChangePassword();
      await Swal.fire({
        icon: "success",
        title: "Password Changed!",
        text: "The password has been successfully changed.",
      });
    },
    onError: async (error) => {
      console.log(error);

      await document.getElementById("change-password-modal").close();
      resetChangePassword();
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to change password.",
      });
    },
  });

  // Function to handle password update
  const updatePassword = (data) => {
    const pengajarData = new FormData();
    console.log("data", pengajarData);

    pengajarData.append("currentPassword", data.currentPassword);
    pengajarData.append("newPassword", data.newPassword);
    pengajarData.append("confPassword", data.confPassword);

    handleChangePassword.mutateAsync(pengajarData);
  };

  return (
    <div>
      <dialog id="change-password-modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Create New Password</h3>
          <p className="mt-2">
            Your new password must be different from previous used password
          </p>

          <FormProvider {...useForm}>
            <form
              onSubmit={submitChangePassword(updatePassword)}
              className="flex flex-col gap-2 mt-2"
            >
              <div className="w-full max-w-2xl ">
                <div className="form-control relative flex">
                  <label className="label">
                    <span className="label-text">Current Password</span>
                  </label>
                  <div>
                    <input
                      type={showCurPassword ? "text" : "password"}
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-2xl rounded-lg pr-10"
                      {...register("currentPassword", {
                        required: "Current Password must be provided!",
                        minLength: {
                          value: 8,
                          message:
                            "Current Password must contain min 8 characters!",
                        },
                      })}
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleCurPassword();
                      }}
                      className="focus:ring-primary-500 absolute top-1/2 -translate-y-1/2 right-3 flex items-center rounded-lg p-1 focus:outline-none focus:ring mt-5"
                    >
                      {showCurPassword ? (
                        <HiEyeOff className="cursor-pointer text-xl text-gray-500 hover:text-gray-600" />
                      ) : (
                        <HiEye className="cursor-pointer text-xl text-gray-500 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.currentPassword && (
                  <p className="text-sm mt-3 text-red-600">
                    {errors.currentPassword.message}
                  </p>
                )}
              </div>

              <div>
                <div className="form-control w-full max-w-2xl relative">
                  <label className="label">
                    <span className="label-text">New Password</span>
                  </label>
                  <div>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-2xl rounded-lg pr-10"
                      {...register("newPassword", {
                        required: "New Password must be provided!",
                        minLength: {
                          value: 8,
                          message:
                            "New Password must contain min 8 characters!",
                        },
                      })}
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        togglePassword();
                      }}
                      className="focus:ring-primary-500 absolute top-1/2 -translate-y-1/2 right-3 flex items-center rounded-lg p-1 focus:outline-none focus:ring mt-5"
                    >
                      {showPassword ? (
                        <HiEyeOff className="cursor-pointer text-xl text-gray-500 hover:text-gray-600" />
                      ) : (
                        <HiEye className="cursor-pointer text-xl text-gray-500 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.newPassword && (
                  <p className="text-sm mt-3 text-red-600">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              <div>
                <div className="form-control w-full max-w-2xl relative">
                  <label className="label">
                    <span className="label-text">Confirm New Password</span>
                  </label>
                  <input
                    type={showConfPassword ? "text" : "password"}
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-2xl rounded-lg pr-10"
                    {...register("confPassword", {
                      required: "Confirm Password must be provided!",
                      minLength: {
                        value: 8,
                        message:
                          "Confirm Password must contain min 8 characters!",
                      },
                      validate: {
                        matchesPreviousPassword: (value) => {
                          const { newPassword } = getValues();
                          return (
                            newPassword === value || "Passwords should match!"
                          );
                        },
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleConfPassword();
                    }}
                    className="focus:ring-primary-500 absolute top-1/2 -translate-y-1/2 right-3 flex items-center rounded-lg p-1 focus:outline-none focus:ring mt-5"
                  >
                    {showConfPassword ? (
                      <HiEyeOff className="cursor-pointer text-xl text-gray-500 hover:text-gray-600" />
                    ) : (
                      <HiEye className="cursor-pointer text-xl text-gray-500 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {errors.confPassword && (
                  <p className="text-sm mt-3 text-red-600">
                    {errors.confPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-l bg-[#06476F] mt-5 rounded-lg text-white items-center w-42"
              >
                Change Password
              </button>
            </form>
          </FormProvider>
        </div>
      </dialog>
    </div>
  );
}
