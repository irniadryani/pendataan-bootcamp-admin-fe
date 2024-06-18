import React, { useEffect } from "react";
import { allParticipantsFn } from "@/api/Participant";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import Swal from "sweetalert2";
import { addBatchParticipantsFn, getBatchParticipant } from "@/api/Batch";

export default function AddParticipantTable({ batchId, dataParticipants }) {
  //State variables
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

   // Query to fetch batch participants
  const { refetch: refetchBatchParticipants } = useQuery(
    ["Batch Participants", batchId],
    () => getBatchParticipant(batchId),
    { enabled: false }
  );

  // Effect to refetch batch participants when batchId changes
  useEffect(() => {
    if (batchId !== null || batchId !== undefined) {
      refetchBatchParticipants();
    }
  }, [refetchBatchParticipants, batchId]);

  // Handler for checkbox change
  const handleCheckboxChange = (participantId) => {
    setSelectedParticipants((prevSelected) => {
      if (prevSelected.includes(participantId)) {
        return prevSelected.filter((id) => id !== participantId);
      } else {
        return [...prevSelected, participantId];
      }
    });
  };

   // Handler for select all checkbox change
  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedParticipants(
      selectAll
        ? []
        : filteredParticipants.map((participant) => participant.peserta_id)
    );
  };

   // Mutation to add batch participants
  const handleAddBatchParticipants = useMutation({
    mutationFn: (data) => addBatchParticipantsFn(batchId, data),

    onMutate() {},
    onSuccess: (res) => {
      console.log(res);
      setSelectedParticipants([]);
      refetchBatchParticipants();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // Function to handle adding batch participants
  const addBatchParticipantsData = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to add a new participant.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add it!",
      customClass: {
        container: "z-[999]",
      },
    });

    if (result.isDenied || result.isDismissed) {
      document.getElementById("add_participants_modal").showModal();
      setSelectedParticipants([]);
    }

    if (result.isConfirmed) {
      const data = {
        peserta_ids: selectedParticipants,
      };

      handleAddBatchParticipants.mutateAsync(data).then(() => {
        Swal.fire({
          title: "Added!",
          text: "The participant has been added to the batch!",
          icon: "success",
        });
        setSelectedParticipants([]);
      });
    }
  };

   // Filtering participants not already in the batch
  const filteredParticipants = dataParticipants?.filter(
    (participants) => participants.batch_id !== batchId
  );

  // Pagination state and logic
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = filteredParticipants?.slice(firstIndex, lastIndex);
  const npage = Math.ceil(filteredParticipants?.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

    // Function to go to previous page
  const prePage = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to change current page
  const changeCPage = (id) => {
    setCurrentPage(id);
  };

  // Function to go to next page
  const nextPage = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <div class="container mx-auto px-4 bg-white h-full items-end rounded-lg">
        <div className="mt-6 max-h-[200px] overflow-y-auto">
          <table className="table bg-white flex justify-center w-full table-pin-rows table-pin-cols">
            <thead>
              <tr className="text-[#06476F] text-lg">
                <th>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAllChange}
                  />
                </th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {records?.length > 0 ? (
                records.map((participant) => (
                  <tr key={participant.id}>
                    <td>
                      <input
                        onChange={() =>
                          handleCheckboxChange(participant.peserta_id)
                        }
                        checked={selectedParticipants.includes(
                          participant.peserta_id
                        )}
                        type="checkbox"
                      />{" "}
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={`${import.meta.env?.VITE_IMAGE_HOST?.replace(
                                /\/$/,
                                ""
                              )}/${participant.url}`}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">
                            {participant.nama_peserta}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{participant.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td align="center" colSpan="4">
                    No participants found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <nav>
        <div className="flex items-center gap-4 mt-2 justify-end">
          <button
            disabled={currentPage === 1 ? true : false}
            onClick={prePage}
            className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Prev
          </button>
          {numbers.map((n) => (
            <button
              key={n}
              onClick={() => changeCPage(n)}
              className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase ${
                currentPage === n ? "bg-[#06476F] text-white" : "text-gray-900"
              } transition-all hover:bg-[#06476F] hover:text-white active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
            >
              {n}
            </button>
          ))}
          <button
            disabled={currentPage === npage ? true : false}
            onClick={nextPage}
            className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Next
          </button>
        </div>
      </nav>
      <div className="w-full flex justify-end mt-2">
        <button
          disabled={selectedParticipants.length === 0}
          className="btn btn-ghost btn-xl bg-[#06476F] text-white rounded-sm mt-4 mb-5"
          type="submit"
          onClick={() => {
            document.getElementById("add_participants_modal").close();
            addBatchParticipantsData();
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}
