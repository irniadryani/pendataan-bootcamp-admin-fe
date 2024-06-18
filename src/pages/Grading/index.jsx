import { useMutation, useQuery } from "react-query";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getBatchParticipant } from "@/api/Batch";
import { useEffect, useState } from "react";
import { IoIosRemove } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import {
  detailSingleParticipantsFn,
  gradingParticipantFn,
} from "@/api/Participant";
import Swal from "sweetalert2";
import { IoReorderFourOutline } from "react-icons/io5";

export default function Grading() {
  const { id } = useParams();  // Extracting participant ID from URL parameters
  const location = useLocation(); // Accessing location object from react-router-dom for state
  const { namaPeserta, kategoriBatch, materiBatch, batch_id } = location.state; // Destructuring state variables from location
  const participantId = atob(id); // Decoding participant ID from base64
  const navigate = useNavigate(); // Navigation function from react-router-dom

  // Query to fetch single participant details
  const {
    data: dataSingleParticipant,
    refetch: refetchSingleParticipant,
    isLoading: loadingSingleParticipant,
  } = useQuery(["participant", participantId], () =>
    detailSingleParticipantsFn(participantId)
  );

   // Function to refetch participant details when participantId changes
  useEffect(() => {
    if (participantId !== null || participantId !== undefined) {
      refetchSingleParticipant();
    }
  }, [refetchSingleParticipant, participantId]);

  // Function to populate input fields with existing grading data
  useEffect(() => {
    if (
      !loadingSingleParticipant &&
      dataSingleParticipant &&
      Array.isArray(dataSingleParticipant.penilaian) &&
      dataSingleParticipant.penilaian.length !== 0
    ) {
      setInputFields(
        dataSingleParticipant.penilaian.map((participant) => ({
          nama_kategori: participant.nama_kategori,
          nilai: participant.nilai,
        }))
      );
    }
  }, [loadingSingleParticipant, dataSingleParticipant]);

  // Function to populate notes textarea with existing notes data
  useEffect(() => {
    if (
      !loadingSingleParticipant &&
      dataSingleParticipant &&
      dataSingleParticipant.notes !== null &&
      dataSingleParticipant.notes !== undefined
    ) {
      setNotes(dataSingleParticipant.notes);
    }
  }, [loadingSingleParticipant, dataSingleParticipant]);

   // State for input fields (grading categories and values)
  const [inputFields, setInputFields] = useState([
    { nama_kategori: "", nilai: "" },
  ]);

   // State for notes input
  const [notes, setNotes] = useState();

   // Function to handle change in input fields
  const handleChangeInput = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
  };

  // Function to add a new grading category and value field
  const handleAddFields = () => {
    setInputFields([...inputFields, { nama_kategori: "", nilai: "" }]);
  };

   // Function to remove a grading category and value field
  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  // Mutation to update grading data for the participant
  const handleUpdateGrading = useMutation({
    mutationFn: (data) => gradingParticipantFn(participantId, data),

    onMutate() {},
    onSuccess: async (res) => {
      console.log(res);
      await refetchSingleParticipant();

      await Swal.fire({
        icon: "success",
        title: "Grading Participant!",
        text: "The account has been successfully grade.",
      });
      navigate(-1);
    },
    onError: async (error) => {
      console.log(error);

      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to grade participant.",
      });
    },
  });

  // Function to handle form submission for grading
  const handleSubmitGrading = () => {
    const gradingData = new FormData();

    // Constructing grading data object
    const penilaiansArray = inputFields.map((field) => ({
      nama_kategori: field.nama_kategori,
      nilai: Number(field.nilai),
    }));

     // Convert penilaiansArray to string and append to FormData
    const penilaiansString = penilaiansArray
      .map((penilaian) => JSON.stringify(penilaian))
      .join(",");

    gradingData.append("penilaian", penilaiansString);

    // Append notes to FormData if it exists
    if (notes !== undefined && notes !== null && notes !== "") {
      gradingData.append("notes", notes);
    }

    handleUpdateGrading.mutateAsync(gradingData);
  };

  // Function to handle drag start for reordering grading categories
  const dragStart = (e, index) => {
    e.dataTransfer.setData("draggedItemIndex", index);
  };

   // Function to handle drop for reordering grading categories
  const drop = (e, index) => {
    e.preventDefault();
    const draggedItemIndex = e.dataTransfer.getData("draggedItemIndex");
    const items = [...inputFields];
    const draggedItem = items[draggedItemIndex];
    items.splice(draggedItemIndex, 1);
    items.splice(index, 0, draggedItem);
    setInputFields(items);
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-4 bg-[#F5F5FC] h-full items-end rounded-lg">
        <div className="flex flex-col mt-6">
          <p className="text-[#06476F] mx-5 font-bold text-2xl mt-6">
            {namaPeserta}
          </p>
          <p className="text-[#06476F] mx-5 font-bold text-xl mt-2">
            {kategoriBatch}
          </p>
          <p className="text-[#06476F] mx-5 font-bold text-xl mt-2">
            {materiBatch}
          </p>
        </div>

        <div className="card w-full bg-base-100 shadow-xl mt-10 ">
          <div className="card-body">
            <div className="flex justify-between ml-8">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSubmitGrading();
                }}
                className="flex flex-col gap-5"
              >
                {inputFields.map((inputFields, index) => (
                  <div className="flex gap-5">
                    <button
                      key={index}
                      draggable
                      onDragStart={(e) => dragStart(e, index)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => drop(e, index)}
                    >
                      <IoReorderFourOutline />
                    </button>
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => drop(e, index)}
                      className="flex items-center gap-4"
                    >
                      <div>{index + 1}</div>
                      <input
                        type="text"
                        name="nama_kategori"
                        placeholder="Aspect"
                        required
                        value={inputFields.nama_kategori || ""}
                        onChange={(event) => handleChangeInput(index, event)}
                        className="input input-bordered w-full max-w-xs rounded-lg"
                      />
                      <select
                        value={inputFields.nilai || ""}
                        name="nilai"
                        onChange={(event) => handleChangeInput(index, event)}
                        className="select select-bordered w-full max-w-xs flex justify-end ml-2 rounded-lg"
                      >
                        <option disabled selected>
                          Select 1-10
                        </option>
                        {[...Array(11)].map((_, index) => (
                          <option key={index + 1}>{index}</option>
                        ))}
                      </select>
                      <div>
                        {index === 0 && (
                          <div className="flex">
                            <button
                              type="button"
                              onClick={() => handleAddFields()}
                            >
                              <IoMdAdd className="mr-2 items-start" size={24} />
                            </button>
                            <div className="w-6"></div>
                          </div>
                        )}
                        {index !== 0 && (
                          <div className="flex">
                            <button
                              type="button"
                              disabled={index === 0}
                              onClick={() => handleRemoveFields(index)}
                            >
                              <IoIosRemove
                                className="mr-2 items-start"
                                size={24}
                              />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleAddFields()}
                            >
                              <IoMdAdd className="items-start" size={24} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text ">Notes</span>
                  </div>
                  <textarea
                    type="text"
                    name="notes"
                    value={notes || ""}
                    placeholder="Type here"
                    onChange={(e) => setNotes(e.target.value)}
                    className="input input-bordered input-lg w-full mt-2 h-40 max-w-3xl rounded-lg"
                  />
                </label>

                <div className="flex justify-end items-center gap-10">
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="btn btn-ghost btn-xl bg-[#06476F] text-white rounded-sm"
                    >
                      Submit
                    </button>
                  </div>

                  <Link
                    to={`/batch/${batch_id}`}
                    state={{
                      kategoriBatch: kategoriBatch,
                    }}
                  >
                    <div className="flex justify-center">
                      <button className="btn btn-ghost btn-xl bg-white text-[#06476F] border-[#06476F] rounded-sm">
                        Cancel
                      </button>
                    </div>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
