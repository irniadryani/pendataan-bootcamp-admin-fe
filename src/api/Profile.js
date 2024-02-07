import { Api } from '@/lib/common'

export const updateProfileFn = async (id, data) => {
	const response = await Api.put(`pesertas/${id}`, data, formDataconfig)
	return response.data
}