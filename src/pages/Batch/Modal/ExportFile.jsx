import { getBatchParticipant } from "@/api/Batch";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { FormProvider, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export default function ExportFile({ kategoriBatch, deskripsiBatch }) {
   // State variables initialization
  const [excelData, setExcelData] = useState([]);
  const [mentorId, setMentorId] = useState("");
  const [description, setDescription] = useState("");
  // Retrieve batch ID from URL params
  const { id } = useParams();
  const batchId = atob(id);
  
 // Query to fetch batch participants
  const {
    data: dataBatchParticipants,
    refetch: refetchBatchParticipants,
    isLoading: loadingBatchParticipants,
  } = useQuery(
    ["Batch Participants", batchId],
    () => getBatchParticipant(batchId),
    { enabled: false }
  );
  // Function to update excelData when dataBatchParticipants changes
  useEffect(() => {
    if (dataBatchParticipants) {
      setExcelData(dataBatchParticipants);
    }
  }, [dataBatchParticipants]);

  // Generate date-related variables for certificate
  let date = new Date();
  let monthCodeCertif = String(date.getMonth() + 1).padStart(2, "0"); // JavaScript months are 0-11, so we add 1
  let yearCodeCertif = date.getFullYear();

  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let day = String(date.getDate()).padStart(2, "0");
  let monthCertificate = monthNames[date.getMonth()];
  let yearCertificate = date.getFullYear();
  let fullDate = `${day} ${monthCertificate} ${yearCertificate}`;

   // Map dataBatchParticipants to Excel format
  const dataBatchParticipantstoExcel = dataBatchParticipants?.map(
    (item, index) => ({
      id: item.id,
      Status: item.status === true ? "Aktif" : "Non-Aktif",
      "Nama Peserta": item.nama_peserta,
      Batch: item.Batch.kategori_batch,
      "Deskripsi Sertifikat": `${description}`,
      Email: item.email,
      "Nomor Telepon":
        item.nomor_handphone !== null && item.nomor_handphone !== undefined
          ? `\t${item.nomor_handphone}`
          : "-",
      Penilaian:
        item.penilaian !== null && item.penilaian !== undefined
          ? item.penilaian
              .map((nilai) => `${nilai.nama_kategori}: ${nilai.nilai}`)
              .join(", ")
          : "-",
      CV: item.cv !== null && item.cv !== undefined ? item.cv : "-",
      "Link Github":
        item.link_github !== null && item.link_github !== undefined
          ? item.link_github
          : "-",
      "Hire By":
        item.hireBy !== null && item.hireBy !== undefined ? item.hireBy : "-",
      "Alamat Rumah":
        item.alamat_rumah !== null && item.alamat_rumah !== undefined
          ? item.alamat_rumah
          : "-",
      "Nomor Sertifikat": `${mentorId}/${
        index + 1
      }/WGSID-BC/${monthCodeCertif}/${yearCodeCertif}`,
      "Tanggal Sertifikat": fullDate,
    })
  );

  // Event handler for mentor ID input change
  const handleIdInputChange = (event) => {
    setMentorId(event.target.value); 
  };
   // Event handler for description input change
  const handleDescriptionInputChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <div>
      <dialog id="export_data_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Input Id Mentor!</h3>
          <FormProvider {...useForm}>
            <form>
              <div className="flex flex-col gap-5">
                <p className="mt-2">Please input your id first</p>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs rounded-lg"
                  value={mentorId}
                  onChange={handleIdInputChange}
                />
                <p className="mt-1">Please input the description</p>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs rounded-lg"
                  value={description}
                  onChange={handleDescriptionInputChange}
                />
                <div className="flex justify-end">
                  {(!mentorId || !description) && (
                    <button
                      disabled
                      className="rounded-lg bg-[#06476F]/50 cursor-not-allowed text-white text-lg font-semibold items-right py-2 px-4"
                    >
                      Export Data
                    </button>
                  )}
                  {dataBatchParticipants && mentorId && description && (
                    <CSVLink
                      data={dataBatchParticipantstoExcel}
                      filename={`data_peserta_${kategoriBatch
                        .replace(" ", "_")
                        .toLowerCase()}`}
                      separator=";"
                      className="rounded-lg bg-[#06476F] text-white text-lg font-semibold items-right py-2 px-4 text-center"
                      onClick={() => {
                        document.getElementById("export_data_modal").close();
                        setTimeout(() => {
                          setDescription("");
                          setMentorId("");
                        }, 1000);
                      }}
                    >
                      Export Data
                    </CSVLink>
                  )}
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </dialog>
    </div>
  );
}
