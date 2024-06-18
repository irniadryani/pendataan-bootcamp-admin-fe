import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { allBatchFn } from "@/api/Batch";

export default function FilterBoxBatch({ onSelectBatch }) {
  //State Variables
  const [show, setShow] = useState(false); 
  const [search, setSearch] = useState(""); 
  const [selectedBatch, setSelectedBatch] = useState(null); 

  const { data: dataBatch } = useQuery("allBatch", allBatchFn); // Fetching all batches using react-query

  const clearSearch = () => {
    setSearch(""); // Clearing the search input
    setShow(false); // Closing the dropdown
    onSelectBatch(null); // Calling onSelectBatch function with null to clear selection
    setSelectedBatch(null); // Clearing the selected batch
  };

  const node = useRef(); // Ref to handle click outside component

  const handleClickOutside = (e) => {
    if (node.current.contains(e.target)) {
      return; // Checking if click is inside the component
    }
    setShow(false); // Closing dropdown if click is outside the component
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside); // Adding event listener to handle click outside component
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleaning up event listener on unmount
    };
  }, []); // Running this effect only once when component mounts

  const handleSelect = (option) => {
    setShow(false); // Closing dropdown after selecting batch
    setSelectedBatch(option); // Setting the selected batch
    onSelectBatch(option); // Calling onSelectBatch function with selected batch as argument
  };

  return (
    <div className="relative inline-block text-left" ref={node}>
      <div className="flex justify-between gap-2">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search Batch"
            className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 outline-none"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded={show ? "true" : "false"}
            onChange={(e) => setSearch(e.target.value)} // Setting search value as input changes
            value={search} // Current value of search input
            onClick={() => setShow(true)} // Showing dropdown on input click
          />
          {search && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 focus:outline-none hover:text-gray-700"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {show && (
        <div className="origin-top-right absolute left-0 mt-2 w-52 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {dataBatch
              .filter((batch) =>
                batch.kategori_batch.toLowerCase().includes(search.toLowerCase())
              )
              .map((batch, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearch(batch.kategori_batch);
                    handleSelect(batch.batch_id);
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                  role="menuitem"
                >
                  {batch.kategori_batch}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
