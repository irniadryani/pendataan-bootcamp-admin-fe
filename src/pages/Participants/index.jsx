import { allParticipantsFn } from "@/api/Participant";
import ParticipantTable from "./ParticipantTable";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import FilterBoxStatus from "@/components/Feature/FilterBoxStatus";
import { useLocation } from "react-router-dom";
import FilterBoxBatch from "@/components/Feature/FilterBoxBatch";

export default function Participants() {
   //Fetching all participant using react-query
  const {
    data: dataParticipants,
    refetch: refetchParticipants,
    isLoading: loadingParticipants,
  } = useQuery("allParticipants", allParticipantsFn);

  const location = useLocation(); // Accessing location object from react-router-dom

  // State variables
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);

   // Filtering participants based on search, status, and batch filters
  const filteredParticipants = dataParticipants?.filter((participant) => {
    const matchingStatus =
      selectedStatus === "" || participant.status === selectedStatus;
    const matchingBatch =
      selectedBatch === null || participant.batch_id === selectedBatch;
    const matchingName =
      search === "" ||
      participant?.nama_peserta?.toLowerCase().includes(search.toLowerCase()) ||
      participant?.email?.toLowerCase().includes(search.toLowerCase());

    const matchingStatusAndName =
      matchingStatus && matchingBatch && matchingName;

        // Logic to determine when to return true for displaying a participant
    if (selectedStatus === null && matchingBatch === null && search === "") {
      return true;
    }

    if (selectedStatus === null && matchingBatch === null && search !== "") {
      return matchingName;
    }

    if (selectedStatus !== null && matchingBatch === null && search === "") {
      return matchingStatus;
    }

    if (selectedStatus === null && matchingBatch !== null && search === "") {
      return matchingBatch;
    }

    if (selectedStatus === null && matchingBatch !== null && search !== "") {
      return matchingBatch && matchingName;
    }

    if (selectedStatus !== null && matchingBatch !== null && search === "") {
      return matchingBatch && matchingStatus;
    }

    if (selectedStatus !== null && matchingBatch !== null && search !== "") {
      return matchingStatusAndName;
    }
  });

   // Function to handle status filter change
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

    // Function to handle batch filter change
  const handleBatchChange = (batch) => {
    setSelectedBatch(batch);
  };

  console.log("status", selectedStatus);
  console.log("filter", filteredParticipants);
  

  return (
    <div>
      <div class="container mx-auto px-6 py-10 bg-[#F5F5FC] h-full items-end rounded-lg">
        <div className="flex justify-start">
          <p className="font-bold text-4xl text-black">Participant's</p>
        </div>
        <div className="flex justify-start">
          <p className="mt-3 font-bold text-4xl text-black">Profile</p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex mt-10 z-10 gap-5">
            <FilterBoxStatus onSelectStatus={handleStatusChange} />
            <FilterBoxBatch onSelectBatch={handleBatchChange} />
          </div>
          <div className="flex items-center gap-2 pl-4 max-w-[200px] mt-10 rounded-lg bg-white border border-[#06476F] hover:border-blue-500 focus:border-[#06476F]">
            <IoMdSearch fontSize="1.125 rem" color="#06476F"/>
            <input
              type="text"
              className="flex h-10 pe-4 pb-1 w-full rounded-lg outline-none text-sm"
              placeholder="Search Participant"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-6">
          <div className="border rounded-lg p-5">
            {!loadingParticipants && (
              <ParticipantTable
                refetch={refetchParticipants}
                currentPaginationTable={
                  location.state === null || location.state === undefined
                    ? null
                    : location.state.currentPaginationTable
                }
                dataParticipants={filteredParticipants}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
