import { Link } from "react-router-dom";
import { SlOptionsVertical } from "react-icons/sl";
import { BsFillTrashFill } from "react-icons/bs";
import { IoPersonAddSharp } from "react-icons/io5";
import { BiSolidToggleRight } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  allBatchFn,
  submitBatchFn,
  deleteBatchFn,
  updateBatchFn,
  statusBatchFn,
} from "@/api/Batch";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AddBatch from "./Modal/AddBatch";
import EditBatch from "./Modal/EditBatch";
import AddParticipants from "./Modal/AddParticipants";
import Swal from "sweetalert2";

export default function Batch() {
  const [batchIdToDelete, setBatchIdToDelete] = useState(null);
  const [batchIdToConfirmStatus, setBatchIdToConfirmStatus] = useState(null);
  const [batchIdToAddParticipants, setBatchIdToAddParticipants] =
    useState(null);
  const [batchStatusToConfirmStatus, setBatchStatusToConfirmStatus] =
    useState();

  console.log("status", batchStatusToConfirmStatus);

  const {
    data: dataBatch,
    refetch: refetchBatch,
    isLoading: loadingBatch,
  } = useQuery("allBatch", allBatchFn);

  const [batchId, setBatchId] = useState();

  const handleDeleteBatch = useMutation({
    mutationFn: (data) => deleteBatchFn(data),

    onMutate() {},
    onSuccess: (res) => {
      console.log(res);
      refetchBatch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleStatusResponse = useMutation({
    mutationFn: (id) => statusBatchFn(id),

    onMutate() {},
    onSuccess: (res) => {
      console.log(res);
      refetchBatch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleConfirmDelete = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await handleDeleteBatch.mutateAsync(batchIdToDelete);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }

      if (result.isDismissed || result.isDenied) {
        setBatchIdToDelete(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete batch", {
        position: "top-right",
      });
    }
  };

  console.log("data batch", dataBatch);

  const handleConfirmStatus = async () => {
    try {
      const alertTitle =
        batchStatusToConfirmStatus === true
          ? "Active Batch"
          : "Nonactive Batch";
      const alertText =
        batchStatusToConfirmStatus === true
          ? "Do you want to nonactive this batch?"
          : "Do you want to active this batch?";
      const alertConfirmButtonText =
        batchStatusToConfirmStatus === true
          ? "Yes, nonactive it!"
          : "Yes, active it!";

      const result = await Swal.fire({
        title: alertTitle,
        text: alertText,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: alertConfirmButtonText,
      });

      if (result.isConfirmed) {
        await handleStatusResponse.mutateAsync(batchIdToConfirmStatus);
        Swal.fire({
          title: "Batch Status Updated!",
          text: "Your batch status has been updated.",
          icon: "success",
        });
      }

      if (result.isDismissed || result.isDenied) {
        setBatchIdToConfirmStatus(null);
        setBatchStatusToConfirmStatus(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update batch status", {
        position: "top-right",
      });
    }
  };

  const handleCloseAddBatchParticipantsModal = () => {
    setBatchIdToAddParticipants(null);
  };

  useEffect(() => {
    if (
      batchIdToConfirmStatus !== null &&
      batchStatusToConfirmStatus !== null
    ) {
      handleConfirmStatus();
    }
  }, [batchIdToConfirmStatus, batchStatusToConfirmStatus]);

  useEffect(() => {
    if (batchIdToDelete !== null) {
      handleConfirmDelete();
    }
  }, [batchIdToDelete]);

  return (
    <div>
      <div class="container mx-auto px-6 py-10 bg-[#F5F5FC] h-full items-end rounded-lg">
        <div className="flex justify-end mx-5">
          <button
            className="btn btn-ghost btn-xl bg-[#06476F] text-white"
            onClick={() =>
              document.getElementById("add_batch_modal").showModal()
            }
          >
            Add New Batch
          </button>
        </div>

        <div className="flex flex-wrap justify-center lg:justify-start mt-10 gap-10">
          {dataBatch?.map((batch) => (
            <div
              key={batch.batch_id}
              className="card card-compact w-60 bg-base-100 shadow-xl "
            >
              <figure>
                <img
                  src={`${import.meta.env?.VITE_IMAGE_HOST?.replace(
                    /\/$/,
                    ""
                  )}/${batch.url}`}
                  alt="Shoes"
                  className="h-44 w-full object-cover relative"
                />
                <div className="absolute top-2 right-2">
                  <div className="bg-white/30 rounded-full px-4 py-2 backdrop-blur-md">
                    {batch.status_batch === true && (
                      <div className="flex gap-2 items-center">
                        <div className="rounded-full w-2 h-2 bg-green-600"></div>
                        <p className="font-semibold text-sm text-green-600">
                          Active Batch
                        </p>
                      </div>
                    )}
                    {batch.status_batch === false && (
                      <div className="flex gap-2 items-center">
                        <div className="rounded-full w-2 h-2 bg-red-600"></div>
                        <p className="font-semibold text-sm text-red-600">
                          Non-Active Batch
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </figure>
              <div className="card-body">
                <div className="flex flex-row-reverse justify-between">
                  <div className="dropdown dropdown-hover dropdown-right flex justify-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="flex justify-center items-center"
                    >
                      <SlOptionsVertical size={28} color="#06476F" />
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      {batch.status_batch === true && (
                        <li>
                          <a
                            onClick={() => {
                              setBatchIdToConfirmStatus(batch.batch_id);
                              setBatchStatusToConfirmStatus(batch.status_batch);
                            }}
                            className="flex items-center cursor-pointer"
                          >
                            <BiSolidToggleRight className="mr-2" size={20} />
                            Nonactive Batch
                          </a>
                        </li>
                      )}
                      {batch.status_batch === false && (
                        <li>
                          <a
                            onClick={() => {
                              setBatchIdToConfirmStatus(batch.batch_id);
                              setBatchStatusToConfirmStatus(batch.status_batch);
                            }}
                            className="flex items-center cursor-pointer"
                          >
                            <BiSolidToggleRight className="mr-2" size={20} />
                            Active Batch
                          </a>
                        </li>
                      )}

                      <li>
                        <button
                          className=""
                          onClick={() => {
                            setBatchId(batch.batch_id);
                            document
                              .getElementById("edit_batch_modal")
                              .showModal();
                          }}
                        >
                          <div className="flex items-center">
                            <MdEdit className="mr-2" />
                            Edit
                          </div>
                        </button>
                      </li>
                      <li>
                        <button
                          className=""
                          onClick={async () => {
                            if (batch.status_batch === false) {
                              await Swal.fire({
                                title: "Batch Not Active",
                                text: "You can't add a new participant to an non-active batch!",
                                icon: "warning",
                              });
                            } else {
                              setBatchIdToAddParticipants(batch.batch_id);
                              document
                                .getElementById("add_participants_modal")
                                .showModal();
                            }
                          }}
                        >
                          <div className="flex items-center">
                            <IoPersonAddSharp className="mr-2" />
                            Add Account
                          </div>
                        </button>
                      </li>
                      <div
                        key={batch.batch_id}
                        className="card card-compact bg-base-100 shadow-xl w-full"
                      >
                        <li>
                          <a
                            onClick={() => {
                              setBatchIdToDelete(batch.batch_id);
                            }}
                            className="flex items-center cursor-pointer"
                          >
                            <BsFillTrashFill className="mr-2" />
                            Delete
                          </a>
                        </li>
                      </div>
                    </ul>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#06476F]">
                      {batch.kategori_batch}
                    </p>
                    <p className="text-sm font-bold text-black">
                      {batch.materi_batch}
                    </p>
                  </div>
                </div>
                <Link
                  to={`/batch/${btoa(batch.batch_id)}`}
                  state={{
                    kategoriBatch: batch.kategori_batch,
                    deskripsiBatch: batch.deskripsi_batch,
                  }}
                >
                  <div className="card-actions justify-end">
                    <button className="btn bg-[#06476F] w-15 text-white">
                      Check
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddBatch refetch={refetchBatch} />
      <EditBatch refetch={refetchBatch} batchId={batchId} />
      <AddParticipants
        batchId={batchIdToAddParticipants}
        onClose={handleCloseAddBatchParticipantsModal}
      />
    </div>
  );
}
