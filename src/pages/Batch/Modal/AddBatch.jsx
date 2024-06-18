import { submitBatchFn } from "@/api/Batch";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function AddBatch({ refetch }) {
  // State to manage modal open/close
  const [isFormClosed, setIsFormClosed] = useState(false);

  // useForm hook for handling form state and validation
  const {
    register,
    handleSubmit: submitAddBatch,
    formState: { errors },
    reset: resetAddBatch,
  } = useForm();
  
   // useMutation hook for handling batch submission
  const handleBatchResponse = useMutation({
    mutationFn: (data) => submitBatchFn(data),

    onMutate() {},
    onSuccess: (res) => {
      console.log(res);
      refetch();
      resetAddBatch();
      setIsFormClosed(true);
      Swal.fire({
        icon: 'success',
        title: 'Batch Created!',
        text: 'The batch has been successfully created.',
      });
      document.getElementById('add_batch_modal').close();
    },
    onError: (error) => {
      console.log(error);
    },
  });

   // Function to handle batch data submission
  const addBatch = (data) => {
    const batchData = new FormData();
    console.log("data", batchData);

    batchData.append("kategori_batch", data.kategori_batch);
    batchData.append("materi_batch", data.materi_batch);
    batchData.append("deskripsi_batch", data.deskripsi_batch);
    if (data.image_batch) {
      batchData.append("image_batch", data.image_batch[0]);
    }
    batchData.append("status_batch", true);

    handleBatchResponse.mutateAsync(batchData);
  };

   // Function to handle form modal closure
  const handleCloseForm = () => {
    setIsFormClosed(false);
  };

  return (
    <dialog id="add_batch_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <form method="dialog" className="flex justify-between items-center">
          {/* if there is a button in form, it will close the modal */}
          <h3 className="font-bold text-lg">Add New Batch</h3>
          <button className="btn btn-sm btn-circle btn-ghost">✕</button>
        </form>

        <form onSubmit={submitAddBatch(addBatch)}>
          <div>
            <label
              htmlFor="kategori_batch"
              className="flex font-semibold text-l mt-3"
            >
              Batch Name
            </label>
            <input
              className="input input-bordered w-full rounded-lg mt-2 justify-start"
              placeholder="Batch Name"
              {...register("kategori_batch", { required: true })}
            />
          </div>

          <div>
            <label
              htmlFor="materi_batch"
              className="flex font-semibold text-l mt-3"
            >
              Material
            </label>
            <input
              className="input input-bordered w-full rounded-lg mt-2 justify-start"
              placeholder="Batch Material"
              {...register("materi_batch", { required: true })}
            />
          </div>

          <div>
            <label
              htmlFor="deskripsi_batch"
              className="flex font-semibold text-l mt-3"
            >
              Description
            </label>
            <input
              className="input input-bordered w-full rounded-lg mt-2 justify-start"
              placeholder="Batch Description"
              {...register("deskripsi_batch", { required: true })}
            />
          </div>

          <div>
            <label
              htmlFor="image_batch"
              className="flex font-semibold text-l mt-3"
            >
              Image
            </label>
            <input
              type="file"
              accept=".png, .jpeg, .jpg"
              className="file-input file-input-bordered w-full rounded-lg mt-2 justify-start"
              placeholder="Image Batch"
              {...register("image_batch")}
            />
          </div>

          <div className="w-full flex justify-end">
            <button
              onClick={handleCloseForm}
              className="btn btn-ghost btn-xl bg-[#06476F] text-white rounded-lg mt-2"
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
