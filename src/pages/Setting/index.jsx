import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { settingFn, updateDefaultProfileFn } from "@/api/Setting";

export default function Index() {
  const {
    data: dataSetting,
    refetch: refetchSetting,
    isLoading: loadingSetting,
    isRefetching: refetchingSetting,
  } = useQuery("setting", settingFn);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetEditSetting,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      default_image_profile: "",
    },
  });

  const defaultImageProfile = watch("default_image_profile");

  useEffect(() => {
    if (!loadingSetting && dataSetting) {
      setValue(
        "default_image_profile",
        dataSetting.contents.default_profile_image
      );
    }
  }, [loadingSetting, dataSetting]);

  const handleUpdateSetting = useMutation({
    mutationFn: (data) => updateDefaultProfileFn(data),
    onSuccess: async (res) => {
      console.log(res);
      await refetchSetting();
      setValue(
        "default_image_profile",
        dataSetting.contents.default_profile_image
      );
      setSelectedFile(null);
    },
    onError: (error) => {
      console.log(error);
      let errorMessage;

      if (error.response && error.response.data.msg) {
        errorMessage = error.response.data.msg;
      } else {
        errorMessage = error.response.data.error;
      }
    },
  });

  const updateSetting = (data) => {
    const settingData = new FormData();

    if (selectedFile) {
      settingData.append("defaultProfileImage", selectedFile);
    }

    handleUpdateSetting.mutateAsync(settingData);
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleEditButtonClick = () => {
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
  };

  console.log(defaultImageProfile);

  return (
    <div className="container mx-auto p-6 bg-[#F7F8FB] flex flex-col items-left rounded-lg gap-6">
      <p className="mt-10 font-bold text-4xl text-black">Setting</p>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="card bg-base-100 shadow-xl w-full">
          <div className="card-body flex flex-col items-center gap-5">
            <h2 className="card-title font-semibold">
              Default User Dashboard Image
            </h2>
            <div className="relative">
              <div className="flex flex-col items-center md:flex-row w-52 h-52 rounded-full">
                <img
                  className="object-cover w-full h-full object-center rounded-full"
                  src={`${import.meta.env?.VITE_IMAGE_HOST?.replace(
                    /\/$/,
                    ""
                  )}/${defaultImageProfile}`}
                  alt="profile image"
                />
              </div>
            </div>
            <div className="card-actions justify-end">
              <button className="btn bg-[#06476F] text-white">Edit</button>
              <button className="btn bg-[#06476F] text-white">Save</button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl w-full">
          <div className="card-body flex items-center flex-col gap-5">
            <h2 className="card-title font-semibold">Default Profile Image</h2>
            <FormProvider {...useForm}>
              <form
                onSubmit={handleSubmit(updateSetting)}
                className="flex flex-col gap-5 items-center"
              >
                <div className="relative">
                  <div className="flex flex-col items-center w-52 h-52 rounded-full">
                    <label htmlFor="default_image_profile"></label>

                    <img
                      className="object-cover  w-full h-full object-center rounded-full"
                      src={
                        selectedFile !== null
                          ? URL.createObjectURL(selectedFile)
                          : `${import.meta.env?.VITE_IMAGE_HOST?.replace(
                              /\/$/,
                              ""
                            )}/${defaultImageProfile}`
                      }
                      alt="profile image"
                      {...register("default_image_profile")}
                    />

                    <input
                      type="file"
                      accept=".png, .jpeg, .jpg"
                      id="fileInput"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                <div className="card-actions">
                  {selectedFile && (
                    <button
                      type="button"
                      className="btn bg-[#06476F] text-white"
                      onClick={() => {
                        setValue(
                          "default_image_profile",
                          dataSetting.default_profile_image
                        );
                        setSelectedFile(null);
                      }}
                    >
                      Cancel
                    </button>
                  )}
                  {!selectedFile && (
                    <label htmlFor="fileInput">
                      <button
                        type="button"
                        onClick={handleEditButtonClick}
                        className="btn bg-[#06476F] text-white"
                      >
                        Edit
                      </button>
                    </label>
                  )}
                  <button type="submit" className="btn bg-[#06476F] text-white">
                    Save
                  </button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
