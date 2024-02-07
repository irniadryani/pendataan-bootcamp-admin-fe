import { Api } from '@/lib/common'

const formDataconfig = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };

export const allParticipantsFn = async () => {
	const response = await Api.get('pesertas')
	return response.data
}

export const deleteParticipantsFn = async (id) => {
	const response = await Api.delete(`pesertas/${id}`)
	return response.data
}

export const deleteImageParticipantsFn = async (id) => {
	const response = await Api.patch(`pesertas/${id}/setImageDefault`)
	return response.data
}

export const submitAccountFn = async (data) => {
	const response = await Api.post('pesertas', data, formDataconfig)
	return response.data
}

export const detailSingleParticipantsFn = async (id) => {
	const response = await Api.get(`pesertas/${id}`)
	return response.data
}

export const updateParticipantFn = async (id, data) => {
	const response = await Api.put(`pesertas/${id}`, data, formDataconfig)
	return response.data
}

export const statusParticipantFn = async (id) => {
	const response = await Api.patch(`pesertas/${id}`)
	return response.data
}

export const gradingParticipantFn = async (id, data) => {
	const response = await Api.put(`pesertas/${id}/grading`, data, formDataconfig)
	return response.data
}