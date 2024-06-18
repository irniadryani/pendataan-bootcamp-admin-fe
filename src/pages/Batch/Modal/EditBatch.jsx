import { allBatchFn, singleBatchFn, updateBatchFn } from "@/api/Batch";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import Swal from "sweetalert2";

export default function EditBatch({ refetch, batchId }) {
  // State for tracking if form is closed
  const [isFormClosed, setIsFormClosed] = useState(false);

  // Form handling
  const {
    register,
    handleSubmit: submitEditBatch,
    formState: { errors },
    reset: resetEditBatch,
    setValue,
  } = useForm({
    defaultValues: {
      kategori_batch: "",
      materi_batch: "",
      deskripsi_batch: "",
      image_batch: "",
    },
  });

  // Query to fetch single batch data
  const {
    data: dataSingleBatch,
    refetch: refetchSingleBatch,
    isLoading: loadingSingleBatch,
  } = useQuery(["Single Batch", batchId], () => singleBatchFn(batchId), {
    enabled: false,
  });

   // Query to refetch all batches after update
  const { refetch: refetchBatch } = useQuery("allBatch", allBatchFn);

  // Function to refetch single batch data when batchId changes
  useEffect(() => {
    if (batchId !== null || batchId !== undefined) {
      refetchSingleBatch();
    }
  }, [batchId, refetchSingleBatch]);

   // Function to populate form fields with fetched data
  useEffect(() => {
    if (!loadingSingleBatch && dataSingleBatch) {
      resetEditBatch({
        kategori_batch: dataSingleBatch.kategori_batch,
        materi_batch: dataSingleBatch.materi_batch,
        deskripsi_batch: dataSingleBatch.deskripsi_batch,
      });

      setValue("image_batch", dataSingleBatch.image_batch);
    }
  }, [loadingSingleBatch, dataSingleBatch, resetEditBatch]);

   // Mutation hook for updating batch
  const handleUpdateBatch = useMutation({
    mutationFn: (data) => updateBatchFn(batchId, data),

    onMutate() {},
    onSuccess: async (res) => {
      console.log(res);
      await refetchSingleBatch();
      await refetchBatch();
      resetEditBatch();
      setIsFormClosed(true);
      document.getElementById("edit_batch_modal").close();
      await Swal.fire({
        icon: "success",
        title: "Batch Edited!",
        text: "Batch has been successfully edited.",
      });
    },
    onError: async (error) => {
      console.log(error);

      let errorMessage;

      if (error.response && error.response.data.msg) {
        errorMessage = error.response.data.msg;
      } else {
        errorMessage = error.response.data.error;
      }

      document.getElementById("edit_batch_modal").close();
      await Swal.fire({
        icon: "error",
        title: "Error editing Batch!",
        text: errorMessage,
      }).then((result) => {
        if (result.isConfirmed) {
          document.getElementById("edit_batch_modal").showModal();
        }
      });
    },
  });

   // Function to handle form submission and update
  const updateBatch = (data) => {
    const batchData = new FormData();
    console.log("data", batchData);

    batchData.append("kategori_batch", data.kategori_batch);
    batchData.append("materi_batch", data.materi_batch);
    batchData.append("deskripsi_batch", data.deskripsi_batch);

    if (data.image_batch[0]) {
      batchData.append("image_batch", data.image_batch[0]);
    }
    batchData.append("status_batch", true);

    handleUpdateBatch.mutateAsync(batchData);
  };
  
 // Function to reset isFormClosed state
  const handleCloseForm = () => {
    setIsFormClosed(false);
  };

  return (
    <dialog id="edit_batch_modal" className="modal">
      <div className="modal-box h-auto">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Edit</h3>
        <FormProvider {...useForm}>
          <form onSubmit={submitEditBatch(updateBatch)}>
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
                {...register("kategori_batch")}
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
                {...register("materi_batch")}
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
                {...register("deskripsi_batch")}
              />
            </div>

            <div>
              <label
                htmlFor="image_batch"
                className="flex font-semibold text-l mt-3"
              >
                Change Photos
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
