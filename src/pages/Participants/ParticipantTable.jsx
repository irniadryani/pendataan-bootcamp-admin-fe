import { Link } from "react-router-dom";
import { FaInfo, FaInfoCircle } from "react-icons/fa";
import { VscEdit } from "react-icons/vsc";
import { VscTrash } from "react-icons/vsc";
import { allParticipantsFn, deleteParticipantsFn } from "@/api/Participant";
import { useState } from "react";
import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import StatusParticipant from "./StatusParticipant";

export default function ParticipantTable({
  dataParticipants,
  refetch,
  currentPaginationTable,
}) {
  const [currentPage, setCurrentPage] = useState(currentPaginationTable); // State variable for current page of pagination

  // Query to fetch all participants
  const { refetch: refetchParticipants, isLoading: loadingParticipants } =
    useQuery("allParticipants", allParticipantsFn);

  // Effect to set current page based on props
  useEffect(() => {
    if (currentPaginationTable !== undefined) {
      setCurrentPage(currentPaginationTable);
    } else {
      setCurrentPage(1);
    }
  }, [currentPaginationTable]);

   // Mutation to delete a participant
  const handleDeleteParticipants = useMutation({
    mutationFn: (data) => deleteParticipantsFn(data),
    onMutate() {},
    onSuccess: (res) => {
      console.log(res);
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // Function to confirm deletion of a participant
  const handleConfirmDelete = async (idPeserta) => {
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
        await handleDeleteParticipants.mutateAsync(idPeserta);
        Swal.fire({
          title: "Deleted!",
          text: "Participant has been deleted.",
          icon: "success",
        });
      }

    } catch (error) {
      console.error(error);
      toast.error("Failed to delete participant", {
        position: "top-right",
      });
    }
  };

  // Constants for pagination calculation
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = dataParticipants?.slice(firstIndex, lastIndex);
  const npage = Math.ceil(dataParticipants?.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

   // Function to move to previous page
  const prePage = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to change current page
  const changeCPage = (id) => {
    setCurrentPage(id);
  };

   // Function to move to next page
  const nextPage = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  };

   // Function to reset current page when pagination changes
  useEffect(() => {
    if (
      currentPaginationTable === undefined ||
      currentPaginationTable === null
    ) {
      setCurrentPage(1);
    }
  }, [currentPaginationTable]);

  return (
    <div>
      <div className="container mx-auto bg-[#F5F5FC] h-full items-end rounded-lg overflow-x-auto">
        <div className="mt-6">
          <table className="table bg-white flex justify-center w-full overflow-x-auto">
            <thead>
              <tr className="text-[#06476F] text-lg text-center">
                <th>Name</th>
                <th>Email</th>
                <th>Batch</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {records?.length > 0 ? (
                records.map((participant) => (
                  <tr key={participant.id} className="even:bg-[#E5E0FF]">
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
                    <td className="text-center">
                      {participant.Batch?.kategori_batch}
                    </td>
                    <td className="text-center">
                      <StatusParticipant
                        refetch={refetchParticipants}
                        status={participant.status}
                        id={participant.id}
                      />
                    </td>
                    <th className="flex gap-5 items-center">
                      <div className="flex justify-center gap-4 ml-5">
                        <Link to={`/detail-participant/${participant.id}`}>
                          <div className="bg-[#06476F] text-white rounded-full p-2">
                            <FaInfo fontSize="1.125rem " />
                          </div>
                        </Link>
                        <Link
                          to={`/edit-participant/${participant.id}`}
                          state={{
                            currentPaginationTable: currentPage,
                          }}
                        >
                          <div className="bg-[#06476F] text-white rounded-full p-2  ">
                            <VscEdit fontSize="1.125rem" />
                          </div>
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            handleConfirmDelete(participant.id);
                          }}
                          className="bg-[#06476F] text-white rounded-full p-2  "
                        >
                          <VscTrash fontSize="1.125rem" />
                        </button>
                      </div>
                    </th>
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
      <nav className="mt-5">
        <div className="flex items-center gap-4 mt-2 justify-center lg:justify-end">
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
    </div>
  );
}
