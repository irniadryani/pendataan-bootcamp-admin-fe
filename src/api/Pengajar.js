import { Api } from '@/lib/common'

const formDataconfig = {
    headers: {
      "Content-Type": "multipart/form-data"
   }
  };

  export const detailSinglePengajarFn = async (id) => {
    const response = await Api.get(`pengajars/${id}`)
    return response.data
  }

export const updatePengajarFn = async (id, data) => {
	const response = await Api.put(`pengajars/${id}`, data, formDataconfig)
	return response.data
}

export const changePasswordPengajarFn = async (id, data) => {
	const response = await Api.put(`pengajars/${id}/changePassword`, data, formDataconfig)
	return response.data
}