import React, { useEffect, useState } from "react";
import {
  allParticipantsFn,
  detailSingleParticipantsFn,
  statusParticipantFn,
} from "@/api/Participant";
import { useMutation, useQuery } from "react-query";
import Swal from "sweetalert2";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export default function StatusParticipant({ status, id, refetch }) {
  const [isOpen, setIsOpen] = useState(false);
  const [key, setKey] = useState(0);
  const [participantIdToConfirmStatus, setparticipantIdToConfirmStatus] = useState(null);
  const [participantStatusToConfirmStatus, setparticipantStatusToConfirmStatus] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setKey((prevKey) => prevKey + 1);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const { refetch: refetchSingleParticipant } = useQuery(
    ["participant", id],
    () => detailSingleParticipantsFn(id)
  );

  const handleStatusResponse = useMutation({
    mutationFn: () => statusParticipantFn(id),
    onMutate() {},
    onSuccess: (res) => {
      console.log(res);
      refetch();
      refetchSingleParticipant();
      closeDropdown();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleConfirmStatus = async (status) => {
    try {
      const alertTitle = status ? "Active Participant" : "Nonactive Participant";
      const alertText = status
        ? "Do you want to active this Participant?"
        : "Do you want to nonactive this Participant?";
      const alertConfirmButtonText = status
        ? "Yes, active it!"
        : "Yes, nonactive it!";

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
        await handleStatusResponse.mutateAsync(participantIdToConfirmStatus, status);

        // SweetAlert for success
        Swal.fire({
          title: "Participant Status Updated!",
          text: "Your Participant status has been updated.",
          icon: "success",
        });
      }

      if (result.isDismissed || result.isDenied) {
        setparticipantIdToConfirmStatus(null);
        setparticipantStatusToConfirmStatus(null);
        setIsEditing(false);
      }
    } catch (error) {
      console.error(error);
      // SweetAlert for error
      Swal.fire({
        title: "Error",
        text: "Failed to update Participant status",
        icon: "error",
      });
    }
  };

  return (
    <details
      className="dropdown"
      key={key}
      open={isOpen}
      onClick={toggleDropdown}
    >
      <summary className="m-1 btn">
        {status === true && (
          <div className="flex gap-2 items-center">
            <div className="flex gap-2 items-center">
              <div className="rounded-full w-2 h-2 bg-green-600"></div>
              <p className="font-semibold text-sm text-green-600">Active</p>
            </div>
            <MdOutlineKeyboardArrowDown />
          </div>
        )}
        {status === false && (
          <div className="flex gap-2 items-center">
            <div className="flex gap-2 items-center">
              <div className="rounded-full w-2 h-2 bg-red-600"></div>
              <p className="font-semibold text-sm text-red-600">Non-Active</p>
            </div>
            <MdOutlineKeyboardArrowDown />
          </div>
        )}
      </summary>
      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 mt-2">
        <li onClick={() => handleConfirmStatus(!status)}>
          {status === false && (
            <div className="flex gap-2 items-center">
              <p className="font-semibold text-sm text-green-600">
                Active Participant
              </p>
            </div>
          )}
          {status === true && (
            <div className="flex gap-2 items-center">
              <p className="font-semibold text-sm text-red-600">
                Nonactive Participant
              </p>
            </div>
          )}
        </li>
      </ul>
    </details>
  );
}
