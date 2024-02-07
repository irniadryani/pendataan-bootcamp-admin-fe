import Profile from "@/assets/profile.jpg";
import { Link, useLocation, useParams } from "react-router-dom";
import { IoCamera } from "react-icons/io5";
import { useMutation, useQuery } from "react-query";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  deleteImageParticipantsFn,
  deleteParticipantsFn,
  detailSingleParticipantsFn,
  updateParticipantFn,
} from "@/api/Participant";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

export default function EditParticipant() {
  const { id } = useParams();

  const location = useLocation();

  const { currentPaginationTable } = location.state;

  console.log("single id", id);
  console.log("curent pagination", currentPaginationTable);


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

  // const {
  //   data: dataIdCurrentUser,
  //   refetch: refetchCurrentUserData,
  //   isLoading,
  //   isError,
  // } = useQuery(["currentUserData", id], () => currenUserDataFn(id));

  const {
    data: dataSingleParticipant,
    refetch: refetchSingleParticipant,
    isLoading: loadingSingleParticipant,
  } = useQuery(["participant", id], () => detailSingleParticipantsFn(id));

  console.log("single participant", dataSingleParticipant);

  useEffect(() => {
    if (!loadingSingleParticipant && dataSingleParticipant) {
      resetEditParticipant({
        nama_peserta: dataSingleParticipant.nama_peserta,
        email: dataSingleParticipant.email,
        nomor_handphone: dataSingleParticipant.nomor_handphone,
        alamat_rumah: dataSingleParticipant.alamat_rumah,
        link_github: dataSingleParticipant.link_github,
        cv: dataSingleParticipant.cv,
      });

      setValue("image", dataSingleParticipant.image);
    }
  }, [loadingSingleParticipant, dataSingleParticipant, resetEditParticipant]);

  const handleUpdateParticipant = useMutation({
    mutationFn: (data) => updateParticipantFn(id, data),

    onMutate() {},
    onSuccess: (res) => {
      console.log(res);
      refetchSingleParticipant();
      resetEditParticipant();
      Swal.fire({
        icon: "success",
        title: "Account Edited!",
        text: "The account has been successfully edited.",
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

  const updateParticipant = (data) => {
    const batchData = new FormData();
    console.log("data", batchData);

    batchData.append("nama_peserta", data.nama_peserta);
    batchData.append("email", data.email);
    batchData.append("nomor_handphone", data.nomor_handphone);
    batchData.append("alamat_rumah", data.alamat_rumah);
    batchData.append("link_github", data.link_github);
    batchData.append("cv", data.cv);

    if (selectedFile) {
      batchData.append("image", selectedFile);
    }

    handleUpdateParticipant.mutateAsync(batchData);
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleDelete = async () => {
    try {
      // Ganti 'deleteParticipantFn' dengan fungsi yang sesuai untuk menghapus peserta
      await deleteImageParticipantsFn(id);
      // Setelah peserta berhasil dihapus, Anda dapat memperbarui data atau mengarahkan pengguna ke halaman lain
      refetchSingleParticipant();
    } catch (error) {
      console.error(error);
      // Tampilkan pesan kesalahan jika ada
    }
  };

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
                    className="h-full w-80 object-cover object-center rounded-xl"
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
                      placeholder="Type here"
                      className="input input-bordered input-[#06476F] w-full rounded-xl bordered"
                      {...register("link_github")}
                    />
                  </div>

                  <div className="flex items-center gap-5">
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
                </div>
              </div>

              <div className="flex justify-center gap-20 mt-20 mb-10">
                <div className="flex justify-center mt-3 ">
                  <button
                    type="submit"
                    className="btn btn-ghost btn-xl bg-[#06476F] text-white rounded-sm"
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
