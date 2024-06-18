import Profile from "@/assets/profile.jpg";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { IoCamera } from "react-icons/io5";
import { useMutation, useQuery } from "react-query";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  deleteImageParticipantsFn,
  deleteParticipantsFn,
  detailSingleParticipantsFn,
  updateParticipantFn,
  resetPasswordFn,
} from "@/api/Participant";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { settingFn, updateDefaultPasswordFn } from "@/api/Setting";

export default function EditParticipant() {
  const { id } = useParams();  // Getting participant ID from URL parameters
  const navigate = useNavigate(); // Navigation hook from react-router-dom
  //State variables
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const location = useLocation(); // Getting current location from react-router-dom
  const { currentPaginationTable } = location.state; // Extracting current pagination table from location state

  const {
    register,
    handleSubmit: submitEditParticipant,
    formState: { errors },
    reset: resetEditParticipant,
    setValue,
  } = useForm({
    defaultValues: {
      nama_peserta: "",
      email: "",
      alamat_peserta: "",
      link_github: "",
      cv: "",
      image: "",
      linkCertificate: "",
    },
  });

  // Toast configuration using Swal
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

  // Fetching single participant data on component mount
  const {
    data: dataSingleParticipant,
    refetch: refetchSingleParticipant,
    isLoading: loadingSingleParticipant,
  } = useQuery(["participant", id], () => detailSingleParticipantsFn(id));

  // Setting form values after data is fetched
  useEffect(() => {
    if (!loadingSingleParticipant && dataSingleParticipant) {
      resetEditParticipant({
        nama_peserta: dataSingleParticipant.nama_peserta || "",
        email: dataSingleParticipant.email || "",
        nomor_handphone: dataSingleParticipant.nomor_handphone || "",
        alamat_rumah: dataSingleParticipant.alamat_rumah || "",
        link_github: dataSingleParticipant.link_github || "",
        cv: dataSingleParticipant.cv || "",
        linkCertificate: dataSingleParticipant.Certificate?.url || "",
      });

      setValue("image", dataSingleParticipant.image);
    }
  }, [loadingSingleParticipant, dataSingleParticipant, resetEditParticipant]);

   // Mutation hook for updating participant data
  const handleUpdateParticipant = useMutation({
    mutationFn: (data) => updateParticipantFn(id, data),
    onMutate() {
      setIsLoading(true);
      setError(null);
    },
    onSuccess: (res) => {
      setIsLoading(false);
      refetchSingleParticipant();
      resetEditParticipant();
      Swal.fire({
        icon: "success",
        title: "Account Edited!",
        text: "The account has been successfully edited.",
      });
      navigate("/participants", {
        state: {
          currentPaginationTable: currentPaginationTable,
        },
      });
    },
    onError: (error) => {
      setIsLoading(false);
      setError(error);
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

  // Function to handle form submission
  const updateParticipant = (data) => {
    const batchData = new FormData();
    console.log("data", batchData);

    if (data.nama_peserta !== null) {
      batchData.append("nama_peserta", data.nama_peserta);
    }
    if (data.email !== null) {
      batchData.append("email", data.email);
    }
    if (data.nomor_handphone !== null) {
      batchData.append("nomor_handphone", data.nomor_handphone);
    }
    if (data.alamat_rumah !== null) {
      batchData.append("alamat_rumah", data.alamat_rumah);
    }
    if (data.link_github !== null) {
      batchData.append("link_github", data.link_github);
    }
    if (data.cv !== null) {
      batchData.append("cv", data.cv);
    }
    if (data.linkCertificate !== null) {
      batchData.append("linkCertificate", data.linkCertificate);
    }

    if (selectedFile) {
      batchData.append("image", selectedFile);
    }

    handleUpdateParticipant.mutateAsync(batchData);
  };

  // Function to handle file change
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Function to handle deletion of participant's image
  const handleDelete = async () => {
    try {
      await deleteImageParticipantsFn(id);

      refetchSingleParticipant();
    } catch (error) {
      console.error(error);
    }
  };

  // Query hook for fetching setting data
  const {
    data: dataSetting,
    refetch: refetchSetting,
    isLoading: loadingSetting,
    isRefetching: refetchingSetting,
  } = useQuery("setting", settingFn);

  // Mutation hook for resetting participant's password
  const handleResetPasswordFn = useMutation({
    mutationFn: () => resetPasswordFn(id),
    onMutate: async () => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, reset it!",
      });

      if (!result.isConfirmed) {
        throw new Error("Reset password action cancelled");
      }

      setIsLoading(true);
      setError(null);
    },
    onSuccess: () => {
      setIsLoading(false);
      Swal.fire({
        icon: "success",
        title: "Password Reset!",
        text: "The password has been reset to default.",
      });
    },
    onError: (error) => {
      setIsLoading(false);
      setError(error);
      let errorMessage;

      if (error.response && error.response.data.msg) {
        errorMessage = error.response.data.msg;
      } else {
        errorMessage = error.response.data.error;
      }

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
    },
  });

  return (
    <div>
      <div class="container mx-auto px-5 bg-[#F5F5FC] h-full rounded-lg flex flex-col gap-10">
        <div className="flex f">
          <p className="mt-10 font-bold text-4xl text-black">
            Edit Participant's Profile
          </p>
        </div>

        <FormProvider {...useForm}>
          <form onSubmit={submitEditParticipant(updateParticipant)}>
            <div className="relative">
              <div className="flex gap-5">
                <div className="relative">
                  <label htmlFor="image"></label>
                  <img
                    className="h-full w-100 object-cover object-center rounded-xl"
                    src={
                      selectedFile
                        ? URL.createObjectURL(selectedFile)
                        : `${import.meta.env?.VITE_IMAGE_HOST?.replace(
                            /\/$/,
                            ""
                          )}/${dataSingleParticipant?.url}`
                    }
                    alt="image participant"
                    {...register("image")}
                  />
                  <input
                    type="file"
                    accept=".png, .jpeg, .jpg"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="fileInput"
                    className="bg-[#06476F] rounded-full p-2 absolute bottom-0 right-3 cursor-pointer"
                  >
                    <IoCamera size={24} color="white" />
                  </label>

                  <label
                    className="bg-[#06476F] rounded-full p-2 absolute bottom-0 right-14 mr-2 cursor-pointer"
                    onClick={handleDelete}
                  >
                    <MdDelete size={24} color="white" />
                  </label>
                </div>

                <div className="flex flex-col ml-4 w-full gap-4">
                  <div className="flex items-center gap-5">
                    <label
                      htmlFor="nama_peserta"
                      className="text-[#06476F] mx-2 font-medium text-lg max-w-[150px] w-full"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered input-[#06476F] w-full rounded-xl bordered"
                      {...register("nama_peserta")}
                    />
                  </div>

                  <div className="flex items-center gap-5">
                    <label
                      htmlFor="email"
                      className="text-[#06476F] mx-2 font-medium text-lg max-w-[150px] w-full"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered input-[#06476F] w-full rounded-xl bordered"
                      {...register("email")}
                    />
                  </div>

                  <div className="flex items-center gap-5">
                    <label
                      htmlFor="nomor_handphone"
                      className="text-[#06476F] mx-2 font-medium text-lg max-w-[150px] w-full"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered input-[#06476F] w-full rounded-xl bordered"
                      {...register("nomor_handphone")}
                    />
                  </div>

                  <div className="flex items-center gap-5">
                    <label
                      htmlFor="alamat_rumah"
                      className="text-[#06476F] mx-2 font-medium text-lg max-w-[150px] w-full"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered input-[#06476F] w-full rounded-xl bordered"
                      {...register("alamat_rumah")}
                    />
                  </div>

                  <div className="flex items-center gap-5">
                    <label
                      htmlFor="link_github"
                      className="text-[#06476F] mx-2 font-medium text-lg max-w-[150px] w-full"
                    >
                      Github
                    </label>
                    <input
                      type="text"
                      placeholder="Type Here"
                      className="input input-bordered input-[#06476F] w-full rounded-xl bordered"
                      {...register("link_github")}
                    />
                  </div>

                  <div className="flex items-start gap-5">
                    <label
                      htmlFor="cv"
                      className="text-[#06476F] mx-2 font-medium text-lg max-w-[150px] w-full"
                    >
                      CV
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered input-[#06476F] w-full rounded-xl bordered"
                      {...register("cv")}
                    />
                  </div>

                  {dataSetting && dataSetting.contents && (
                    <div className="flex flex-col justify-center w-80 ml-44">
                      <p className="text-[#06476F] mx-3 font-bold text-xs">
                        Cv Link Folder
                      </p>
                      <a
                        target="_blank"
                        href={dataSetting.contents.link_drive_cv || "#"}
                        className="text-blue-600 mx-3 font-medium text-sm mt-1 text-underline mb-2"
                      >
                        {dataSetting.contents.link_drive_cv || "-"}
                      </a>
                    </div>
                  )}

                  <div className="flex items-start gap-5">
                    <label
                      htmlFor="linkCertificate"
                      className="text-[#06476F] mx-2 font-medium text-lg max-w-[150px] w-full"
                    >
                      Certificate
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered input-[#06476F] w-full rounded-xl bordered"
                      {...register("linkCertificate")}
                    />
                  </div>

                  {dataSetting && dataSetting.contents && (
                    <div className="flex flex-col justify-center w-80 ml-44">
                      <p className="text-[#06476F] mx-3 font-bold text-xs">
                        Certificate Link Folder
                      </p>
                      <a
                        href={dataSetting.contents.link_drive_certi || "#"}
                        target="_blank"
                        className="text-blue-600 mx-3 font-medium text-sm mt-1 text-underline mb-2"
                      >
                        {dataSetting.contents.link_drive_certi || "-"}
                      </a>
                    </div>
                  )}

                  <div className="flex flex-row mx-2">
                    <label className="text-[#06476F] mx-2 font-medium text-lg max-w-[150px] w-full">
                      Reset Password
                    </label>

                    <div className="flex w-full w-max-[125px]">
                    <button
                      type="button"
                      onClick={() => handleResetPasswordFn.mutateAsync()}
                      className="btn btn-ghost btn-xl bg-[#06476F] text-white rounded-sm mx-2 w-full"
                    >
                      Reset
                    </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-20 mt-20 mb-10">
                <div className="flex justify-center mt-3 ">
                  <button
                    type="submit"
                    className="btn btn-ghost btn-xl bg-[#06476F] text-white rounded-sm"
                    disabled={isLoading || error}
                  >
                    Submit
                  </button>
                </div>

                <Link
                  to="/participants"
                  state={{
                    currentPaginationTable: currentPaginationTable,
                  }}
                >
                  <div className="flex justify-center mt-3">
                    <button className="btn btn-ghost btn-xl bg-white text-[#06476F] border-[#06476F] rounded-sm">
                      Cancel
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
