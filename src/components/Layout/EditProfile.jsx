import { currentUserFn } from "@/api/Auth";
import { detailSinglePengajarFn, updatePengajarFn } from "@/api/Pengajar";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { IoCamera } from "react-icons/io5";

export default function EditProfile({ pengajarId, refetchPengajar }) {
  console.log("id user", pengajarId);

  const {
    register,
    handleSubmit: submitEditProfile,
    formState: { errors },
    reset: resetEditProfile,
    setValue,
  } = useForm({
    defaultValues: {
      nama_pengajar: "",
      profile_image: "",
    },
  });

  const {
    data: dataSinglePengajar,
    refetch: refetchSinglePengajar,
    isLoading: loadingSinglePengajar,
  } = useQuery(["pengajar", pengajarId], () =>
    detailSinglePengajarFn(pengajarId)
  );

  useEffect(() => {
    if (pengajarId !== null || pengajarId !== undefined) {
      refetchSinglePengajar();
    }
  }, [pengajarId, refetchSinglePengajar]);

  useEffect(() => {
    if (!loadingSinglePengajar && dataSinglePengajar) {
      resetEditProfile({
        nama_pengajar: dataSinglePengajar.nama_pengajar,
      });

      setValue("profile_image", dataSinglePengajar.url);
    }
  }, [loadingSinglePengajar, dataSinglePengajar, resetEditProfile]);

  const handleUpdateProfile = useMutation({
    mutationFn: (data) => updatePengajarFn(pengajarId, data),

    onMutate() {},
    onSuccess: async (res) => {
      console.log(res);
      await document.getElementById("edit-profile-modal").close();
      await refetchSinglePengajar();
      await refetchPengajar();
      resetEditProfile();
      await Swal.fire({
        icon: "success",
        title: "Account Changed!",
        text: "The account has been successfully changed.",
      });
    },
    onError: async (error) => {
      console.log(error);

      await document.getElementById("edit-profile-modal").close();
      resetEditProfile();
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to change account.",
      });
    },
  });

  const updateProfile = (data) => {
    const pengajarData = new FormData();
    console.log("data", pengajarData);

    pengajarData.append("nama_pengajar", data.nama_pengajar);

    if (data.profile_image[0]) {
      pengajarData.append("profile_image", data.profile_image[0]);
    }

    handleUpdateProfile.mutateAsync(pengajarData);
  };

  return (
    <dialog id="edit-profile-modal" className="modal">
      <div className="modal-box h-auto">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Edit Profile</h3>
        <FormProvider {...useForm}>
          <form onSubmit={submitEditProfile(updateProfile)}>
            <div>
              <label
                htmlFor="nama_pengajar"
                className="form-control w-full max-w-xs"
              >
                <div className="label mt-3 justify-start">
                  <span className="label-text">Change Username</span>
                </div>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs rounded-lg"
                {...register("nama_pengajar")}
              />
            </div>
            <div>
              <label htmlFor="profile_image">
                <div className="label mt-3 justify-start">
                  <span className="label-text">Change The Photos</span>
                </div>
              </label>
              <input
                type="file"
                accept=".png, .jpeg, .jpg"
                className="file-input file-input-bordered w-full max-w-xs"
                {...register("profile_image")}
              />
            </div>

            <div className="w-full flex justify-end">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  submitEditProfile(updateProfile)();
                }}
                className="btn btn-ghost btn-xl bg-[#06476F] text-white rounded-sm mt-2"
                type="submit"
              >
                Change
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </dialog>
  );
}
