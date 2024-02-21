import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import {
  settingFn,
  updateDefaultBatchImageFn,
  updateDefaultImageHomeUser,
  updateDefaultLogoAdminFn,
  updateDefaultLogoUserFn,
  updateDefaultPasswordFn,
  updateDefaultProfileFn,
  updateDefaultTextHomeUser,
  updateLinkCertificateAdminFn,
  updateLinkGdriveAdminFn,
} from "@/api/Setting";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";

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
      image_home_user: "",
      text_home_user: "",
      default_image_batch: "",
      link_drive_cv: "",
      link_drive_certi: "",
      image_logo_admin: "",
      image_logo_user: "",
      default_password: "",
    },
  });

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
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
      Swal.fire({
        icon: "success",
        title: "Image Edited!",
        text: "The image has been successfully edited.",
      });
    },
    onError: (error) => {
      console.log(error);
      let errorMessage;

      if (error.response && error.response.data.msg) {
        errorMessage = error.response.data.msg;
      } else {
        errorMessage = error.response.data.error;
      }

      Toast.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
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

  //image home user

  const imageHomeUser = watch("image_home_user");

  useEffect(() => {
    if (!loadingSetting && dataSetting) {
      setValue("image_home_user", dataSetting.contents.image_home_user);
    }
  }, [loadingSetting, dataSetting]);

  const handleUpdateImageHomeFn = useMutation({
    mutationFn: (data) => updateDefaultImageHomeUser(data),
    onSuccess: async (res) => {
      console.log(res);
      await refetchSetting();
      setValue("image_home_user", dataSetting.contents.image_home_user);
      setSelectedFileHomeImageUser(null);
      Swal.fire({
        icon: "success",
        title: "Image Edited!",
        text: "The image has been successfully edited.",
      });
    },
    onError: (error) => {
      console.log(error);
      let errorMessage;

      if (error.response && error.response.data.msg) {
        errorMessage = error.response.data.msg;
      } else {
        errorMessage = error.response.data.error;
      }

      Toast.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
    },
  });

  const updateImageHomeUser = (data) => {
    const settingData = new FormData();

    if (selectedFileHomeImageuser) {
      settingData.append("imageHomeUser", selectedFileHomeImageuser);
    }

    handleUpdateImageHomeFn.mutateAsync(settingData);
  };

  const [selectedFileHomeImageuser, setSelectedFileHomeImageUser] =
    useState(null);

  const handleFileChangeHomeImageUser = (e) => {
    setSelectedFileHomeImageUser(e.target.files[0]);
  };

  const handleEditButtonClickHomeImageUser = () => {
    const fileInputHomeImageUser = document.getElementById(
      "fileInputHomeImageUser"
    );
    fileInputHomeImageUser.click();
  };

  console.log(selectedFileHomeImageuser);

  //text home user

  const textHomeUser = watch("text_home_user");

  useEffect(() => {
    if (!loadingSetting && dataSetting) {
      setValue("text_home_user", dataSetting.contents.text_home_user);
    }
  }, [loadingSetting, dataSetting]);

  const handleUpdateTextHomeFn = useMutation({
    mutationFn: (data) => updateDefaultTextHomeUser(data),
    onSuccess: async (res) => {
      console.log(res);
      await refetchSetting();
      Swal.fire({
        icon: "success",
        title: "Text Edited!",
        text: "Text has been successfully edited.",
      });
    },
    onError: (error) => {
      console.log(error);
      let errorMessage;

      if (error.response && error.response.data.msg) {
        errorMessage = error.response.data.msg;
      } else {
        errorMessage = error.response.data.error;
      }

      Toast.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
    },
  });

  const updateTextHomeUser = (data) => {
    const settingData = new FormData();

    if (data && data.text_home_user) {
      settingData.append("textHomeUser", data.text_home_user);
      handleUpdateTextHomeFn.mutateAsync(settingData);
    }
  };

  // update default batch image

  const defaultImageBatch = watch("default_image_batch");

  useEffect(() => {
    if (!loadingSetting && dataSetting) {
      setValue("default_image_batch", dataSetting.contents.default_image_batch);
    }
  }, [loadingSetting, dataSetting]);

  const handleUpdateDefaultBatchImage = useMutation({
    mutationFn: (data) => updateDefaultBatchImageFn(data),
    onSuccess: async (res) => {
      console.log(res);
      await refetchSetting();
      setValue("default_image_batch", dataSetting.contents.default_image_batch);
      setSelectedFileDefaultBatchImage(null);
      Swal.fire({
        icon: "success",
        title: "Image Edited!",
        text: "The image has been successfully edited.",
      });
    },
    onError: (error) => {
      console.log(error);
      let errorMessage;

      if (error.response && error.response.data.msg) {
        errorMessage = error.response.data.msg;
      } else {
        errorMessage = error.response.data.error;
      }

      Toast.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
    },
  });

  const updateDefaultBatchImage = (data) => {
    const settingData = new FormData();

    if (selectedFileDefaultBatchImage) {
      settingData.append("defaultImageBatch", selectedFileDefaultBatchImage);
    }

    handleUpdateDefaultBatchImage.mutateAsync(settingData);
  };

  const [selectedFileDefaultBatchImage, setSelectedFileDefaultBatchImage] =
    useState(null);

  const handleFileChangeDefaultBatchImage = (e) => {
    setSelectedFileDefaultBatchImage(e.target.files[0]);
  };

  const handleEditButtonClickDefaultBatchImage = () => {
    const fileInputDefaultBatchImage = document.getElementById(
      "fileInputDefaultBatchImage"
    );
    fileInputDefaultBatchImage.click();
  };

  //link gdrive cv

  const linkDriveCV = watch("link_drive_cv");

  useEffect(() => {
    if (!loadingSetting && dataSetting) {
      setValue("link_drive_cv", dataSetting.contents.link_drive_cv);
    }
  }, [loadingSetting, dataSetting]);

  const handleUpdateLinkGdrive = useMutation({
    mutationFn: (data) => updateLinkGdriveAdminFn(data),
    onSuccess: async (res) => {
      console.log(res);
      await refetchSetting();
      Swal.fire({
        icon: "success",
        title: "Link Edited!",
        text: "Link has been successfully edited.",
      });
    },
    onError: (error) => {
      console.log(error);
      let errorMessage;

      if (error.response && error.response.data.msg) {
        errorMessage = error.response.data.msg;
      } else {
        errorMessage = error.response.data.error;
      }

      Toast.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
    },
  });

  const updateLinkGdrive = (data) => {
    const settingData = new FormData();

    if (data && data.link_drive_cv) {
      settingData.append("linkDriveCV", data.link_drive_cv);
      handleUpdateLinkGdrive.mutateAsync(settingData);
    }
  };

  const inputRef = useRef(null); // tambahkan ref

  // link gdrive certficate

  const linkDriveCerti = watch("link_drive_certi");

  useEffect(() => {
    if (!loadingSetting && dataSetting) {
      setValue("link_drive_certi", dataSetting.contents.link_drive_certi);
    }
  }, [loadingSetting, dataSetting]);

  const handleUpdateLinkCertif = useMutation({
    mutationFn: (data) => updateLinkCertificateAdminFn(data),
    onSuccess: async (res) => {
      console.log(res);
      await refetchSetting();
      Swal.fire({
        icon: "success",
        title: "Link Edited!",
        text: "Link has been successfully edited.",
      });
    },
    onError: (error) => {
      console.log(error);
      let errorMessage;

      if (error.response && error.response.data.msg) {
        errorMessage = error.response.data.msg;
      } else {
        errorMessage = error.response.data.error;
      }

      Toast.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
    },
  });

  const updateLinkCertif = (data) => {
    const settingData = new FormData();

    if (data && data.link_drive_certi) {
      settingData.append("linkDriveCerti", data.link_drive_certi);
      handleUpdateLinkCertif.mutateAsync(settingData);
    }
  };

  // logo admin

  const adminLogo = watch("image_logo_admin");

  useEffect(() => {
    if (!loadingSetting && dataSetting) {
      setValue("image_logo_admin", dataSetting.contents.image_logo_admin);
    }
  }, [loadingSetting, dataSetting]);

  const handleUpdateLogoAdmin = useMutation({
    mutationFn: (data) => updateDefaultLogoAdminFn(data),
    onSuccess: async (res) => {
      console.log(res);
      await refetchSetting();
      setValue("image_logo_admin", dataSetting.contents.image_logo_admin);
      setSelectedFileLogoAdmin(null);
      Swal.fire({
        icon: "success",
        title: "Image Edited!",
        text: "The image has been successfully edited.",
      });
    },
    onError: (error) => {
      console.log(error);
      let errorMessage;

      if (error.response && error.response.data.msg) {
        errorMessage = error.response.data.msg;
      } else {
        errorMessage = error.response.data.error;
      }

      Toast.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
    },
  });

  const updateImageLogoAdmin = (data) => {
    const settingData = new FormData();

    if (selectedFileLogoAdmin) {
      settingData.append("adminLogo", selectedFileLogoAdmin);
    }

    handleUpdateLogoAdmin.mutateAsync(settingData);
  };

  const [selectedFileLogoAdmin, setSelectedFileLogoAdmin] = useState(null);

  const handleFileChangeLogoAdmin = (e) => {
    setSelectedFileLogoAdmin(e.target.files[0]);
  };

  const handleEditButtonClickLogoAdmin = () => {
    const fileInputLogoAdmin = document.getElementById("fileInputLogoAdmin");
    fileInputLogoAdmin.click();
  };

  console.log(adminLogo);

  // logo user

  const userLogo = watch("image_logo_user");

  useEffect(() => {
    if (!loadingSetting && dataSetting) {
      setValue("image_logo_user", dataSetting.contents.image_logo_user);
    }
  }, [loadingSetting, dataSetting]);

  const handleUpdateLogoUser = useMutation({
    mutationFn: (data) => updateDefaultLogoUserFn(data),
    onSuccess: async (res) => {
      console.log(res);
      await refetchSetting();
      setValue("image_logo_user", dataSetting.contents.image_logo_user);
      setSelectedFileLogoUser(null);
      Swal.fire({
        icon: "success",
        title: "Image Edited!",
        text: "The image has been successfully edited.",
      });
    },
    onError: (error) => {
      console.log(error);
      let errorMessage;

      if (error.response && error.response.data.msg) {
        errorMessage = error.response.data.msg;
      } else {
        errorMessage = error.response.data.error;
      }

      Toast.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
    },
  });

  const updateSettingLogoUser = (data) => {
    const settingData = new FormData();

    if (selectedFileLogoUser) {
      settingData.append("userLogo", selectedFileLogoUser);
    }

    handleUpdateLogoUser.mutateAsync(settingData);
  };

  const [selectedFileLogoUser, setSelectedFileLogoUser] = useState(null);

  const handleFileChangeLogoUser = (e) => {
    setSelectedFileLogoUser(e.target.files[0]);
  };

  const handleEditButtonClickLogoUser = () => {
    const fileInputLogoUser = document.getElementById("fileInputLogoUser");
    fileInputLogoUser.click();
  };

  console.log(userLogo);

  //default password

  const defaultPassword = watch("default_password");

  const [showDefPassword, setShowDefPassword] = useState(false);
  const toggleDefPassword = () => setShowDefPassword((prev) => !prev);

  useEffect(() => {
    if (!loadingSetting && dataSetting) {
      setValue("default_password", dataSetting.contents.default_password);
    }
  }, [loadingSetting, dataSetting]);

  const handleUpdateDefaultPassword = useMutation({
    mutationFn: (data) => updateDefaultPasswordFn(data),
    onSuccess: async (res) => {
      console.log(res);
      await refetchSetting();
      Swal.fire({
        icon: "success",
        title: "Default Password Edited!",
        text: "Default Password has been successfully edited.",
      });
    },
    onError: (error) => {
      console.log(error);
      let errorMessage;

      if (error.response && error.response.data.msg) {
        errorMessage = error.response.data.msg;
      } else {
        errorMessage = error.response.data.error;
      }

      Toast.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
    },
  });

  const updateDefaultPassword = (data) => {
    const settingData = new FormData();

    if (data && data.default_password) {
      settingData.append("defaultPassword", data.default_password);
      handleUpdateDefaultPassword.mutateAsync(settingData);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-[#F7F8FB] flex flex-col items-left rounded-lg gap-6">
      <p className="mt-10 font-bold text-4xl text-black">Setting</p>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="card bg-base-100 shadow-xl w-full">
          <div className="card-body flex items-center flex-col gap-5">
            <h2 className="card-title font-semibold text-center h-14">
              User Profile Image
            </h2>
            <FormProvider {...useForm}>
              <form
                onSubmit={handleSubmit(updateSetting)}
                className="flex flex-col gap-5 items-center"
              >
                <div className="relative flex-grow">
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
                  {selectedFile && (
                    <button
                      type="submit"
                      className="btn bg-[#06476F] text-white"
                    >
                      Save
                    </button>
                  )}
                </div>
              </form>
            </FormProvider>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl w-full">
          <div className="card-body flex items-center flex-col gap-5">
            <h2 className="card-title font-semibold text-center h-14">
              Default User Dashboard Image
            </h2>
            <FormProvider {...useForm}>
              <form
                onSubmit={handleSubmit(updateImageHomeUser)}
                className="flex flex-col gap-5 items-center"
              >
                <div className="relative flex-grow">
                  <div className="flex flex-col items-center w-52 h-52 rounded-full">
                    <label htmlFor="default_image_profile"></label>

                    <img
                      className="object-cover  w-full h-full object-center rounded-full"
                      src={
                        selectedFileHomeImageuser !== null
                          ? URL.createObjectURL(selectedFileHomeImageuser)
                          : `${import.meta.env?.VITE_IMAGE_HOST?.replace(
                              /\/$/,
                              ""
                            )}/${imageHomeUser}`
                      }
                      alt="home user image"
                      {...register("image_home_user")}
                    />

                    <input
                      type="file"
                      accept=".png, .jpeg, .jpg"
                      id="fileInputHomeImageUser"
                      style={{ display: "none" }}
                      onChange={handleFileChangeHomeImageUser}
                    />
                  </div>
                </div>
                <div className="card-actions">
                  {selectedFileHomeImageuser && (
                    <button
                      type="button"
                      className="btn bg-[#06476F] text-white"
                      onClick={() => {
                        setSelectedFileHomeImageUser(null);
                      }}
                    >
                      Cancel
                    </button>
                  )}
                  {!selectedFileHomeImageuser && (
                    <label htmlFor="fileInputHomeImageUser">
                      <button
                        type="button"
                        onClick={handleEditButtonClickHomeImageUser}
                        className="btn bg-[#06476F] text-white"
                      >
                        Edit
                      </button>
                    </label>
                  )}
                  {selectedFileHomeImageuser && (
                    <button
                      type="submit"
                      className="btn bg-[#06476F] text-white"
                    >
                      Save
                    </button>
                  )}
                </div>
              </form>
            </FormProvider>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl w-full">
          <div className="card-body flex items-center flex-col gap-5">
            <h2 className="card-title font-semibold h-14 align-top items-start">
              Batch Image
            </h2>
            <FormProvider {...useForm}>
              <form
                onSubmit={handleSubmit(updateDefaultBatchImage)}
                className="flex flex-col gap-5 items-center"
              >
                <div className="relative flex-grow">
                  <div className="flex flex-col items-center w-52 h-52 rounded-full">
                    <label htmlFor="default_image_batch"></label>

                    <img
                      className="object-cover  w-full h-full object-center rounded-full"
                      src={
                        selectedFileDefaultBatchImage !== null
                          ? URL.createObjectURL(selectedFileDefaultBatchImage)
                          : `${import.meta.env?.VITE_IMAGE_HOST?.replace(
                              /\/$/,
                              ""
                            )}/${defaultImageBatch}`
                      }
                      alt="default batch image"
                      {...register("default_image_batch")}
                    />

                    <input
                      type="file"
                      accept=".png, .jpeg, .jpg"
                      id="fileInputDefaultBatchImage"
                      style={{ display: "none" }}
                      onChange={handleFileChangeDefaultBatchImage}
                    />
                  </div>
                </div>
                <div className="card-actions">
                  {selectedFileDefaultBatchImage && (
                    <button
                      type="button"
                      className="btn bg-[#06476F] text-white"
                      onClick={() => {
                        setSelectedFileDefaultBatchImage(null);
                      }}
                    >
                      Cancel
                    </button>
                  )}
                  {!selectedFileDefaultBatchImage && (
                    <label htmlFor="fileInputDefaultBatchImage">
                      <button
                        type="button"
                        onClick={handleEditButtonClickDefaultBatchImage}
                        className="btn bg-[#06476F] text-white"
                      >
                        Edit
                      </button>
                    </label>
                  )}
                  {selectedFileDefaultBatchImage && (
                    <button
                      type="submit"
                      className="btn bg-[#06476F] text-white"
                    >
                      Save
                    </button>
                  )}
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
      {/* logo admin  dan user */}
      <div className="flex flex-col md:flex-row gap-5">
        <div className="card bg-base-100 shadow-xl w-full">
          <div className="card-body flex items-center flex-col gap-5">
            <h2 className="card-title font-semibold h-14 align-top items-start">
              Logo Admin
            </h2>
            <FormProvider {...useForm}>
              <form
                onSubmit={handleSubmit(updateImageLogoAdmin)}
                className="flex flex-col gap-5 items-center"
              >
                <div className="relative flex-grow">
                  <div className="flex flex-col items-center w-52 h-52 rounded-full">
                    <label htmlFor="image_logo_admin"></label>

                    <img
                      className="object-cover  w-full h-full object-center rounded-full"
                      src={
                        selectedFileLogoAdmin !== null
                          ? URL.createObjectURL(selectedFileLogoAdmin)
                          : `${import.meta.env?.VITE_IMAGE_HOST?.replace(
                              /\/$/,
                              ""
                            )}/${adminLogo}`
                      }
                      alt="default batch image"
                      {...register("image_logo_admin")}
                    />

                    <input
                      type="file"
                      accept=".png, .jpeg, .jpg"
                      id="fileInputLogoAdmin"
                      style={{ display: "none" }}
                      onChange={handleFileChangeLogoAdmin}
                    />
                  </div>
                </div>
                <div className="card-actions">
                  {selectedFileLogoAdmin && (
                    <button
                      type="button"
                      className="btn bg-[#06476F] text-white"
                      onClick={() => {
                        setSelectedFileLogoAdmin(null);
                      }}
                    >
                      Cancel
                    </button>
                  )}
                  {!selectedFileLogoAdmin && (
                    <label htmlFor="fileInputLogoAdmin">
                      <button
                        type="button"
                        onClick={handleEditButtonClickLogoAdmin}
                        className="btn bg-[#06476F] text-white"
                      >
                        Edit
                      </button>
                    </label>
                  )}
                  {selectedFileLogoAdmin && (
                    <button
                      type="submit"
                      className="btn bg-[#06476F] text-white"
                    >
                      Save
                    </button>
                  )}
                </div>
              </form>
            </FormProvider>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl w-full">
          <div className="card-body flex items-center flex-col gap-5">
            <h2 className="card-title font-semibold h-14 align-top items-start">
              Logo User
            </h2>
            <FormProvider {...useForm}>
              <form
                onSubmit={handleSubmit(updateSettingLogoUser)}
                className="flex flex-col gap-5 items-center"
              >
                <div className="relative flex-grow">
                  <div className="flex flex-col items-center w-52 h-52 rounded-full">
                    <label htmlFor="image_logo_user"></label>

                    <img
                      className="object-cover  w-full h-full object-center rounded-full"
                      src={
                        selectedFileLogoUser !== null
                          ? URL.createObjectURL(selectedFileLogoUser)
                          : `${import.meta.env?.VITE_IMAGE_HOST?.replace(
                              /\/$/,
                              ""
                            )}/${userLogo}`
                      }
                      alt="default batch image"
                      {...register("image_logo_user")}
                    />

                    <input
                      type="file"
                      accept=".png, .jpeg, .jpg"
                      id="fileInputLogoUser"
                      style={{ display: "none" }}
                      onChange={handleFileChangeLogoUser}
                    />
                  </div>
                </div>
                <div className="card-actions">
                  {selectedFileLogoUser && (
                    <button
                      type="button"
                      className="btn bg-[#06476F] text-white"
                      onClick={() => {
                        setSelectedFileLogoUser(null);
                      }}
                    >
                      Cancel
                    </button>
                  )}
                  {!selectedFileLogoUser && (
                    <label htmlFor="fileInputLogoUser">
                      <button
                        type="button"
                        onClick={handleEditButtonClickLogoUser}
                        className="btn bg-[#06476F] text-white"
                      >
                        Edit
                      </button>
                    </label>
                  )}
                  {selectedFileLogoUser && (
                    <button
                      type="submit"
                      className="btn bg-[#06476F] text-white"
                    >
                      Save
                    </button>
                  )}
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
      <FormProvider {...useForm}>
        <form onSubmit={handleSubmit(updateTextHomeUser)}>
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex flex-col w-full max-w-2xl">
              <label
                htmlFor="text_home_user"
                className="form-control w-full max-w-2xl"
              >
                <div className="label">
                  <span className="label-text font-semibold">
                    Text Home User
                  </span>
                </div>
              </label>
              <textarea
                type="text"
                placeholder="Type here"
                className="textarea textarea-bordered rounded-lg py-3"
                {...register("text_home_user")}
              />
            </div>
            <div className="flex items-end">
              <div className="card-actions">
                <button type="submit" className="btn bg-[#06476F] text-white">
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
      <FormProvider {...useForm}>
        <form onSubmit={handleSubmit(updateLinkGdrive)}>
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex flex-col w-full max-w-2xl">
              <label
                htmlFor="link_drive_cv"
                className="form-control w-full max-w-2xl"
              >
                <div className="label">
                  <span className="label-text font-semibold">
                    Cv Link Folder
                  </span>
                </div>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered rounded-lg py-3"
                {...register("link_drive_cv")}
              />
            </div>
            <div className="flex items-end">
              {dataSetting &&
                dataSetting.contents.link_drive_cv !== null &&
                dataSetting.contents.link_drive_cv !== undefined && (
                  <div className="card-actions">
                    <Link
                      target="_blank"
                      type="button"
                      to={dataSetting.contents.link_drive_cv}
                      className="btn bg-[#06476F] text-white"
                    >
                      Open
                    </Link>
                  </div>
                )}
              <div className="card-actions">
                <button type="submit" className="btn bg-[#06476F] text-white">
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
      <FormProvider {...useForm}>
        <form onSubmit={handleSubmit(updateLinkCertif)}>
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex flex-col w-full max-w-2xl">
              <label
                htmlFor="link_drive_certi"
                className="form-control w-full max-w-2xl"
              >
                <div className="label">
                  <span className="label-text font-semibold">
                    Certificate Link Folder
                  </span>
                </div>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered rounded-lg py-3"
                {...register("link_drive_certi")}
              />
            </div>
            <div className="flex items-end">
              {dataSetting &&
                dataSetting.contents.link_drive_certi !== null &&
                dataSetting.contents.link_drive_certi !== undefined && (
                  <div className="card-actions">
                    <Link
                      target="_blank"
                      type="button"
                      to={dataSetting.contents.link_drive_certi}
                      className="btn bg-[#06476F] text-white"
                    >
                      Open
                    </Link>
                  </div>
                )}
              <div className="card-actions">
                <button type="submit" className="btn bg-[#06476F] text-white">
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
      <FormProvider {...useForm}>
        <form onSubmit={handleSubmit(updateDefaultPassword)}>
          <div className="flex flex-col md:flex-row gap-5">
            <div className="w-full max-w-2xl">
              <div className="form-control w-full max-w-2xl relative flex">
                <label
                  htmlFor="default_password"
                  className="form-control w-full max-w-2xl"
                >
                  <div className="label">
                    <span className="label-text font-semibold">
                      Default Password User Account
                    </span>
                  </div>
                </label>
                <div>
                  <input
                    type={showDefPassword ? "text" : "password"}
                    placeholder="Type here"
                    className="input input-bordered rounded-lg py-3 w-full" // Menambahkan kelas w-full di sini
                    {...register("default_password", {
                      required: "Default Password must be provided!",
                    })}
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleDefPassword();
                    }}
                    className="focus:ring-primary-500 absolute top-1/2 -translate-y-1/2 right-3 flex items-center rounded-lg p-1 focus:outline-none focus:ring mt-5"
                  >
                    {showDefPassword ? (
                      <HiEyeOff className="cursor-pointer text-xl text-gray-500 hover:text-gray-600" />
                    ) : (
                      <HiEye className="cursor-pointer text-xl text-gray-500 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
              {errors.default_password && (
                <p className="text-sm mt-3 text-red-600">
                  {errors.default_password.message}
                </p>
              )}
            </div>

            <div
              className={`flex ${
                errors.default_password ? "items-center" : "items-end"
              }  mt-0 lg:mt-1`}
            >
              <div className="card-actions">
                <button type="submit" className="btn bg-[#06476F] text-white">
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
