import React from 'react'
import { useMutation, useQuery } from "react-query";
import { singleBatchFn, updateBatchFn } from "@/api/Batch";
import React, { useEffect } from "react";

export default function StatusBatch() {

    const handleStatusResponse = useMutation({
        mutationFn: (data) => submitBatchFn(data),
    
        onMutate() {},
        onSuccess: (res) => {
          console.log(res);
          refetch();
          resetAddBatch();
        },
        onError: (error) => {
          console.log(error);
        },
      });
      
  return (
    <div>StatusBatch</div>
  )
}
