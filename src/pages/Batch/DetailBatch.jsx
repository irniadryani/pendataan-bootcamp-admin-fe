import { getBatchParticipant, singleBatchFn } from "@/api/Batch";
import { updateParticipantFn } from "@/api/Participant";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useMutation, useQuery } from "react-query";
import { Link, useLocation, useParams } from "react-router-dom";
import StatusParticipant from "../Participants/StatusParticipant";
import { IoMdSearch } from "react-icons/io";
import FilterBoxBatch from "@/components/Feature/FilterBoxBatch";
import FilterBoxStatus from "@/components/Feature/FilterBoxStatus";

export default function DetailBatch() {
  const { id } = useParams();
  const location = useLocation();
  const [updatedHires, setUpdatedHires] = useState({});
  const [participantId, setParticipantId] = useState();
  // const { kategoriBatch } = location.state;
  const { kategoriBatch, deskripsiBatch } = location.state || {
    kategoriBatch: "DefaultCategory",
    deskripsiBatch: null,
  };

  const batchId = atob(id);

  const {
    data: dataBatchParticipants,
    refetch: refetchBatchParticipants,
    isLoading: loadingBatchParticipants,
  } = useQuery(
    ["Batch Participants", batchId],
    () => getBatchParticipant(batchId),
    { enabled: false }
  );

  const { data: dataSingleBatch, refetch: refetchSingleBatch } = useQuery(
    ["Single Batch", batchId],
    () => singleBatchFn(batchId),
    { enabled: false }
  );

  useEffect(() => {
    if (batchId !== null || batchId !== undefined) {
      refetchBatchParticipants();
      refetchSingleBatch();
    }
  }, [refetchBatchParticipants, refetchSingleBatch, batchId]);

  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(null);

  const filteredParticipants = dataBatchParticipants?.filter((participant) => {
    const matchingStatus =
      selectedStatus === "" || participant.status === selectedStatus;
    const matchingName =
      search === "" ||
      participant?.nama_peserta?.toLowerCase().includes(search.toLowerCase());

    const matchingStatusAndName = matchingStatus && matchingName;

    if (selectedStatus === null && search === "") {
      return true;
    }

    if (selectedStatus === null && search !== "") {
      return matchingName;
    }

    if (selectedStatus !== null && search === "") {
      return matchingStatus;
    }

    if (selectedStatus !== null && search !== "") {
      return matchingStatusAndName;
    }
  });

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  console.log("status", selectedStatus);
  console.log("filter", filteredParticipants);

  return (
    <div>
      <div className="container mx-auto px-4 bg-[#F5F5FC] h-screen items-end rounded-lg">
        <div className="flex flex-col ml-10">
          <p className="mt-10 font-bold text-4xl text-black">{kategoriBatch}</p>
          <p className="font-medium text-xl text-black">{deskripsiBatch}</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex mt-10 z-50">
            <FilterBoxStatus onSelectStatus={handleStatusChange} />
          </div>
          <div className="flex items-center ps-4 gap-2 max-w-[200px] mt-10 rounded-2xl bg-white border border-[#06476F] hover:border-blue-500 focus:border-[#06476F]">
            <IoMdSearch fontSize="1.125rem" />
            <input
              type="text"
              className="flex h-10 pe-4 pb-1 w-full rounded-2xl outline-none"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="table bg-white">
            <thead className="">
              <tr className="text-center text-[#06476F] text-lg">
                <th>Name</th>
                <th>Hire</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredParticipants &&
                filteredParticipants?.map((participant) => (
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

                    <td>
                      <EditableHireField
                        className="border rounded px-2 py-1"
                        hire={
                          updatedHires[participant.id] || participant.hireBy
                        }
                        startEdit={() => setParticipantId(participant.id)}
                        startEditId={participantId}
                        participantId={participant.id}
                        refetchBatchParticipants={refetchBatchParticipants}
                      />
                    </td>

                    <td className="text-center">
                      <StatusParticipant
                        refetch={refetchBatchParticipants}
                        status={participant.status}
                        id={participant.id}
                      ></StatusParticipant>
                    </td>

                    <th>
                      <Link
                        to={`/grading/${btoa(participant.id)}`}
                        state={{
                          namaPeserta: participant.nama_peserta,
                          kategoriBatch: dataSingleBatch?.kategori_batch,
                          materiBatch: dataSingleBatch?.materi_batch,
                          batch_id: id,
                        }}
                      >
                        <button className="btn btn-ghost btn-xs bg-[#06476F] text-white text-l font-semibold h-10 w-24 items-center">
                          Grading
                        </button>
                      </Link>
                    </th>
                  </tr>
                ))}

              {filteredParticipants?.length === 0 && (
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
    </div>
  );
}

const EditableHireField = ({
  hire,
  participantId,
  refetchBatchParticipants,
  startEdit,
  startEditId,
}) => {
  const [editing, setEditing] = useState(false);
  const [editedHire, setEditedHire] = useState(hire);

  console.log("participant id", startEditId);

  const handleUpdateParticipantHireBy = useMutation({
    mutationFn: (data) => updateParticipantFn(startEditId, data),

    onMutate() {},
    onSuccess: (res) => {
      console.log(res);
      // Refresh data setelah penyimpanan berhasil
      refetchBatchParticipants();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const updateHireBy = (newHire) => {
    const data = {
      hireBy: newHire,
    };

    handleUpdateParticipantHireBy.mutateAsync(data).then(() => {
      setEditing(false);
    });
  };

  const handleEdit = () => {
    setEditing(true);
    startEdit();
  };

  const handleCancel = () => {
    setEditing(false);
    setEditedHire(hire);
  };

  return (
    <div>
      {editing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateHireBy(editedHire);
          }}
          className="relative border p-4 rounded-lg"
        >
          <input
            className="pe-6 outline-none w-full"
            type="text"
            value={editedHire}
            onChange={(e) => setEditedHire(e.target.value)}
          />
          <button type="submit" hidden></button>
          <button onClick={handleCancel}>
            <FaTimes className="absolute right-4 top-1/2 -translate-y-1/2" />
          </button>
        </form>
      ) : (
        <div>
          <button
            className="flex items-start font-semibold w-full"
            onClick={handleEdit}
          >
            {hire === null ? "-" : hire}
          </button>
        </div>
      )}
    </div>
  );
};
