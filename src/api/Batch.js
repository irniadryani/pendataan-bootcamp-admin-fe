import { Api } from '@/lib/common'

const formDataconfig = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };

export const allBatchFn = async () => {
	const response = await Api.get('batches')
	return response.data
}

export const singleBatchFn = async (id) => {
	const response = await Api.get(`batches/${id}`)
	return response.data
}

export const submitBatchFn = async (data) => {
	const response = await Api.post('batches', data, formDataconfig)
	return response.data
}

export const deleteBatchFn = async (id) => {
	const response = await Api.delete(`batches/${id}`)
	return response.data
}

export const updateBatchFn = async (id, data) => {
	const response = await Api.put(`batches/${id}`, data, formDataconfig)
	return response.data
}

export const statusBatchFn = async (id) => {
	const response = await Api.patch(`batches/${id}`)
	return response.data
}

export const getBatchParticipant = async (id) => {
	const response = await Api.get(`batches/getParticipantByBatch/${id}`)
	return response.data
}

export const addBatchParticipantsFn = async (id, data) => {
	const response = await Api.post(`batches/addParticipantsOnBatch/${id}`, data)
	return response.data
}