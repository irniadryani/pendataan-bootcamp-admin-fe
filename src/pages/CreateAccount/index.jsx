import { allParticipantsFn, submitAccountFn } from "@/api/Participant";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

export default function CreateAccount() {
  const {
    register,
    handleSubmit: submitCreateAccount,
    formState: { errors },
    reset: resetCreateAccount,
  } = useForm();

  const { refetch: refetchParticipants } = useQuery(
    "allParticipants",
    allParticipantsFn
  );

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  const handleAccountResponse = useMutation({
    mutationFn: (data) => submitAccountFn(data),
  
    onMutate() {},
    onSuccess: (res) => {
      console.log(res);
      refetchParticipants();
      resetCreateAccount();
  
      Swal.fire({
        icon: 'success',
        title: 'Account Created!',
        text: 'The account has been successfully created.',
      });
    },
    onError: (error) => {
      console.log(error); 
      let errorMessage
      
      if (error.response && error.response.data.msg) {
        errorMessage = error.response.data.msg;
      } else {
        errorMessage = error.response.data.error
      }
      
      Toast.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
      });
    },
  });
  
  const createAccount = (data) => {
    const accountData = new FormData();
    console.log("data", accountData);

    accountData.append("nama_peserta", data.nama_peserta);
    accountData.append("email", data.email);

    handleAccountResponse.mutateAsync(accountData);
  };

  return (
    <div>
      <div class="container mx-auto p-6 bg-[#F7F8FB] flex flex-col items-center rounded-lg">
        <div className="flex justify-start w-full">
          <p className="font-bold text-4xl text-black">Create Participant Account</p>
        </div>

        <form onSubmit={submitCreateAccount(createAccount)} className="mt-8 flex justify-center w-full">
          <div className="flex flex-justify-center bg-white w-full max-w-xl rounded-xl drop-shadow-2xl">
            <div className="flex-justify-center w-full px-5">
              <label
                htmlFor="nama_peserta"
                className="form-control w-full max-w-lg mt-10 "
              >
                <div className="label">
                  <span className="label-text text-[#06476F] font-bold">
                    Name
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered max-w-2xl rounded-xl"
                  {...register("nama_peserta", { required: true })}
                />
              </label>

              <label
                htmlFor="email"
                className="form-control w-full max-w-lg mt-5 "
              >
                <div className="label">
                  <span className="label-text text-[#06476F] font-bold">
                    Email
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xl rounded-xl"
                  {...register("email", { required: true })}
                />
              </label>

              <div className="flex justify-center mb-10">
                <button
                  type="submit"
                  className="btn btn-ghost btn-xl bg-[#06476F] text-white mt-10 rounded-lg justify-center"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
