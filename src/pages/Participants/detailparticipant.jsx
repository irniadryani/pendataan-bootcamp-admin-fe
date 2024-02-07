import Profile from "@/assets/profile.jpg";
import { Link, useParams } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import { useQuery } from "react-query";
import { detailSingleParticipantsFn } from "@/api/Participant";
import { MdDelete } from "react-icons/md";
import { FaCopy } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
import { Tooltip } from "react-tooltip";

export default function DetailParticipant() {
  const { id } = useParams();

  const [copied, setCopied] = useState(false);

  const {
    data: dataSingleParticipant,
    refetch: refetchSingleParticipant,
    isLoading: loadingSingleParticipant,
  } = useQuery(["participant", id], () => detailSingleParticipantsFn(id));

  return (
    <div>
      <div class="container px-4 bg-[#F5F5FC] h-screen rounded-lg">
        <div className="flex ml-10">
          <p className="mt-10 font-bold text-4xl text-black">
            Detail Participant's
          </p>
        </div>
        <div className="flex ml-10">
          <p className="mt-2 font-bold text-4xl text-black">Profile</p>
        </div>
        {!loadingSingleParticipant && (
          <div className="relative">
            <div className="flex flex-col items-center md:flex-row max-w-3xl">
              <img
                className="h-auto w-60 object-cover object-center mt-10 ml-10 mr-5 rounded-lg"
                src={`${import.meta.env?.VITE_IMAGE_HOST?.replace(/\/$/, "")}/${
                  dataSingleParticipant.url
                }`}
                alt="nature image"
              />

              <div className="flex flex-col justify-start mx-auto mt-10 w-full">
                <p className="text-[#06476F] mx-3 font-bold text-xl justify-start">
                  Name
                </p>
                <p className="text-black mx-3 font-bold text-sm mt-1 mb-2">
                  {dataSingleParticipant.nama_peserta || "-"}
                </p>

                <p className="text-[#06476F] mx-3 font-bold text-xl justify-start">
                  Email
                </p>
                <p className="text-black mx-3 font-medium text-sm mt-1 mb-2">
                  {dataSingleParticipant.email || "-"}
                </p>

                <p className="text-[#06476F] mx-3 font-bold text-xl justify-start">
                  Phone Number
                </p>
                <p className="text-black mx-3 font-medium text-sm mt-1 mb-2">
                  {dataSingleParticipant.nomor_handphone || "-"}
                </p>

                <p className="text-[#06476F] mx-3 font-bold text-xl justify-start">
                  Address
                </p>
                <p className="text-black mx-3 font-medium text-sm mt-1 mb-2 ">
                  {dataSingleParticipant.alamat_rumah || "-"}
                </p>

                <p className="text-[#06476F] mx-3 font-bold text-xl justify-start">
                  Github
                </p>
                <div className="flex items-center">
                  <a
                    href={dataSingleParticipant.link_github || "#"}
                    className="text-blue-600 mx-3 font-medium text-sm mt-1 text-underline mb-2"
                  >
                    {dataSingleParticipant.link_github || "-"}
                  </a>
                  <div onMouseOut={() => setCopied(false)}>
                    <CopyToClipboard
                      text={dataSingleParticipant.link_github || "-"}
                      onCopy={() => {
                        setCopied(true);
                      }}
                    >
                      <button
                        className="tooltip tooltip-secondary"
                        data-tip={
                          copied ? "Copied to Clipboard!" : "Copy to Clipboard"
                        }
                      >
                        <FaCopy className="flex my-auto" color="#06476F" />
                      </button>
                    </CopyToClipboard>
                  </div>
                  <Tooltip />
                </div>

                <p className="text-[#06476F] mx-3 font-bold text-xl justify-start">
                  CV
                </p>
                <div className="flex items-center">
                  <a
                    href={dataSingleParticipant.cv || "#"}
                    className="text-blue-600 mx-3 font-medium text-sm mt-1 text-underline mb-2"
                  >
                    {dataSingleParticipant.cv || "-"}
                  </a>
                  <div onMouseOut={() => setCopied(false)}>
                    <CopyToClipboard
                      text={dataSingleParticipant.cv || "-"}
                      onCopy={() => {
                        setCopied(true);
                      }}
                    >
                      <button
                        className="tooltip tooltip-secondary"
                        data-tip={
                          copied ? "Copied to Clipboard!" : "Copy to Clipboard"
                        }
                      >
                        <FaCopy className="flex my-auto" color="#06476F" />
                      </button>
                    </CopyToClipboard>
                  </div>
                  <Tooltip />
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
