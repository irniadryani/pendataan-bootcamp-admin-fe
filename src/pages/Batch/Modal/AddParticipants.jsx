import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AddParticipantTable from "@/pages/Participants/AddParticipantTable";
import { useMutation, useQuery } from "react-query";
import { allParticipantsFn } from "@/api/Participant";
import { IoMdSearch } from "react-icons/io";
import Swal from "sweetalert2";
import { addBatchParticipantsFn, getBatchParticipant } from "@/api/Batch";

export default function AddParticipants({ batchId, onClose }) {
  // Query to fetch all participants
  const { data: dataParticipants, isLoading: loadingParticipants } = useQuery(
    "allParticipants",
    allParticipantsFn
  );

   // State for search input
  const [search, setSearch] = useState("");

   // Filter participants based on batchId
  const filteredParticipants = dataParticipants?.filter(
    (participants) => participants.batch_id !== batchId
  );

  // Filter participants based on search input
  const searchParticipantsData = filteredParticipants?.filter(
    (participant) =>
      participant?.nama_peserta?.toLowerCase().includes(search.toLowerCase()) ||
      participant?.email?.toLowerCase().includes(search.toLowerCase()) || null
  );

  return (
    <dialog
      id="add_participants_modal"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <div className="flex justify-between items-center ">
          <h3 className="font-bold text-lg">Add New Participant</h3>
          <button
            className="btn btn-sm btn-circle btn-ghost"
            onClick={() => {
              onClose();
              document.getElementById("add_participants_modal").close();
            }}
          >
            ✕
          </button>
        </div>

        <div className="flex items-center gap-2 max-w-[200px] mt-10 ml-0 rounded-2xl bg-white border border-[#06476F] hover:border-blue-500 focus:border-[#06476F]">
          <IoMdSearch fontSize="1.125rem" className="ml-4" />
          <input
            type="text"
            className="flex h-10 pe-4 pb-1 w-full rounded-2xl outline-none border-solid"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="max-h-[300px]">
          {!loadingParticipants && (
            <AddParticipantTable
              dataParticipants={searchParticipantsData}
              batchId={batchId}
            />
          )}
        </div>
        <div className="w-full flex justify-end mt-2"></div>
      </div>
    </dialog>
  );
}
